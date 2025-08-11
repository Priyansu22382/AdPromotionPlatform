const express = require("express");
const {
  createAdRequest,
  getCompanyAds,
  updateAdRequest,
  deleteAdRequest,
  getAllAds,
  rejectAd,
  approveAd, 
  approveAdAndAssignDrivers,
  getSingleAd,
  getAssignedAdsForDriver
} = require("../controllers/adRequestController");

const authMiddleware = require("../middlewares/authMiddlewares");
const { isCompany, isAdmin, isCabDriver } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Company Routes
router.post("/createAd", authMiddleware, isCompany, createAdRequest);
router.get("/getCompanyAd", authMiddleware, isCompany, getCompanyAds);
router.put("/:id", authMiddleware, isCompany, updateAdRequest);
router.delete("/:id", authMiddleware, isCompany, deleteAdRequest);
router.get("/company/ad/:id", authMiddleware, isCompany, getSingleAd);

// Admin Routes
router.get("/admin/allAds", authMiddleware, isAdmin, getAllAds);
router.put("/admin/reject/:id", authMiddleware, isAdmin, rejectAd);
router.put("/admin/approve/:id", authMiddleware, isAdmin, approveAd); // optional
router.put("/admin/approve-assign", authMiddleware, isAdmin, approveAdAndAssignDrivers);


router.get("/cabdriver/assigned-ads", authMiddleware, isCabDriver, getAssignedAdsForDriver);

module.exports = router;
