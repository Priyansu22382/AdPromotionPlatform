const AdRequest = require("../models/adRequestModel");
const CabDriver = require("../models/cabDriverModel");
const cloudinary = require("../lib/cloudinary");
const Ad = require("../models/adRequestModel");
const createAdRequest = async (req, res) => {
  const {
    adTitle,
    adImage,
    durationInDays,
    totalVehicles,
    pricePerVehicle,
    totalAmount,
    description,
    startDate, // ✅ Expect from frontend or set default
  } = req.body;

  try {
    if (
      !adTitle ||
      !adImage ||
      !durationInDays ||
      !totalVehicles ||
      !pricePerVehicle ||
      !totalAmount ||
      !description
    ) {
      return res.status(400).json({ message: "All Fields Required!!" });
    }

    const checkTitle = await AdRequest.findOne({ adTitle });
    if (checkTitle) {
      return res.status(400).json({ message: "This Ad Already Exists!!" });
    }

    const uploadResult = await cloudinary.uploader.upload(adImage, {
      folder: `ads/${req.user._id}`,
    });

    const newAdRequest = new AdRequest({
      company: req.user._id,
      adTitle,
      adImage: uploadResult.secure_url,
      durationInDays,
      totalVehicles,
      pricePerVehicle,
      totalAmount,
      description,
      startDate: startDate || new Date(), // ✅ fallback to today if not provided
    });

    const saved = await newAdRequest.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log("Error in AdRequest Controller : " + error.message);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};


const getCompanyAds = async (req, res) => {
  try {
    const ads = await AdRequest.find({ company: req.user._id })
      .populate("company", "companyName email")
      .populate("assignedDrivers", "name vehicleNumber platform isAvailable"); // 👈 populate drivers

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ads." });
  }
};


const updateAdRequest = async (req, res) => {
  try {
    const ad = await AdRequest.findById(req.params.id);

    if (!ad || ad.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (ad.status !== "Pending") {
      return res.status(400).json({ message: "Can't update ad once approved/rejected." });
    }

    const updatedAd = await AdRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedAd);
  } catch (error) {
    res.status(500).json({ message: "Error updating ad." });
  }
};
const deleteAdRequest = async (req, res) => {
  try {
    const adId = req.params.id;

    const ad = await AdRequest.findById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    // Only admins OR company who created it can delete
    if (
      req.user.role === "admin" ||
      (req.user.role === "company" && ad.company.toString() === req.user._id.toString())
    ) {
      await AdRequest.findByIdAndDelete(adId);
      return res.status(200).json({ message: "Ad deleted successfully" });
    } else {
      return res.status(403).json({ message: "Not authorized to delete this ad" });
    }
  } catch (err) {
    console.error("Error in deleteAdRequest:", err);
    return res.status(500).json({ message: "Server error deleting ad" });
  }
};

const getAllAds = async (req, res) => {
  try {
    const ads = await AdRequest.find().populate("company").populate("assignedDrivers", "name vehicleNumber platform email");
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all ads." });
  }
};


const rejectAd = async (req, res) => {
  try {
    const ad = await AdRequest.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    ad.status = "Rejected";
    await ad.save();
    res.status(200).json({ message: "Ad Rejected Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting ad." });
  }
};

const approveAd = async (req, res) => {
  try {
    const ad = await AdRequest.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    if (ad.status !== "Pending") {
      return res.status(400).json({ message: "Ad is already processed." });
    }

    ad.status = "Approved";
    await ad.save();
    res.status(200).json({ message: "Ad Approved Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error approving ad." });
  }
};
const approveAdAndAssignDrivers = async (req, res) => {
  const { adId } = req.body;

  if (!adId) {
    return res.status(400).json({ message: "Ad ID is required" });
  }

  try {
    const ad = await AdRequest.findById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    if (ad.status !== "Pending") {
      return res.status(400).json({ message: "Ad is already processed" });
    }

    // ✅ Get only available drivers
    const availableDrivers = await CabDriver.find({ isAvailable: true }).limit(ad.totalVehicles);

    if (availableDrivers.length < ad.totalVehicles) {
      return res.status(400).json({ message: `Only ${availableDrivers.length} available drivers found. ${ad.totalVehicles} required.` });
    }

    // Assign ad to each selected driver
    await Promise.all(
      availableDrivers.map(driver => {
        driver.assignedAds.push(ad._id);
        driver.isAvailable = false;
        driver.earnings += ad.pricePerVehicle;
        return driver.save();
      })
    );

    // Update the AdRequest with assigned driver IDs
    ad.status = "Approved";
    ad.assignedDrivers = availableDrivers.map(driver => driver._id);
    await ad.save();

    res.status(200).json({
      message: `Ad approved and assigned to ${availableDrivers.length} drivers.`,
      assignedDrivers: availableDrivers.map(d => ({
        id: d._id,
        name: d.name,
        email: d.email,
        vehicleNumber: d.vehicleNumber,
        platform: d.platform,
        earnings:d.earnings
      })),
    });
  } catch (error) {
    console.error("Approve and assign error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getSingleAd = async (req, res) => {
  try {
    const ad = await AdRequest.findById(req.params.id);

    if (!ad || ad.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized or Ad not found" });
    }

    res.status(200).json(ad);
  } catch (error) {
    console.log("Error fetching single ad:", error.message);
    res.status(500).json({ message: "Error fetching ad." });
  }
};


const getAssignedAdsForDriver = async (req, res) => {
  try {
    const cabDriverId = req.user._id;
    const ads = await AdRequest.find({ assignedDrivers: cabDriverId })
      .populate("company", "companyName email");

    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch assigned ads." });
  }
};

const checkAndUpdateAdStatus = async () => {
  const ads = await Ad.find({ status: 'Assigned' });
  const today = new Date();

  for (let ad of ads) {
    const endDate = new Date(ad.startDate);
    endDate.setDate(endDate.getDate() + ad.durationInDays);

    if (today >= endDate) {
      ad.status = 'Completed';
      await ad.save();
    }
  }
};

module.exports = {createAdRequest, getCompanyAds, updateAdRequest, deleteAdRequest, getAllAds, rejectAd, approveAd, approveAdAndAssignDrivers,getSingleAd, getAssignedAdsForDriver,checkAndUpdateAdStatus}