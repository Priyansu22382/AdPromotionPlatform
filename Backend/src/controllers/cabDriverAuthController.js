const generateToken = require("../lib/utils");
const CabDriver = require("../models/cabDriverModel");
const cloudinary = require("../lib/cloudinary");
const sendWelcomeEmail = require("../lib/sendEmail");
const bcrypt = require("bcryptjs");

const cabDriverSignup = async (req,res) => {
    const {name, email, password, vehicleNumber, platform, phoneNumber} = req.body;
    try {
        if(!name || !email || !password || !vehicleNumber || !platform || !phoneNumber){
            return res.status(400).json({message : "All Field Required!!"});
        }
        if(password.length < 6){
            return res.status(400).json({message : "Password Length Must Be Atleast 6."});
        }
        const cabdriveruser = await CabDriver.findOne({email});
        if(cabdriveruser){
            return res.status(400).json({message : "This Cab Driver Already Exists!!"});
        }
        const isVehicleNumberAlreadyRegister = await CabDriver.findOne({vehicleNumber});
        if(isVehicleNumberAlreadyRegister){
            return res.status(400).json({message : "This Vehicle Number Already Register!!"});
        }
        const isPhoneNumberAlreadyRegister = await CabDriver.findOne({phoneNumber});
        if(isPhoneNumberAlreadyRegister){
            return res.status(400).json({message : "This Phone Number Already Register!!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newCabDriver = new CabDriver({
            name : name,
            email : email,
            password : hashPassword,
            vehicleNumber : vehicleNumber,
            platform : platform,
            phoneNumber : phoneNumber
        });

        if(newCabDriver){
            await newCabDriver.save();
            await sendWelcomeEmail(newCabDriver.email, newCabDriver.name, "Cab Driver");
            generateToken(newCabDriver._id,newCabDriver.role,res);


            res.status(200).json({
                name : newCabDriver.name,
                email : newCabDriver.email,
                vehicleNumber : newCabDriver.vehicleNumber,
                platform : newCabDriver.platform,
                phoneNumber : newCabDriver.phoneNumber
            });
        }
        else{
            return res.status(400).json({message : "Invalid Cab-Driver Data!!"})
        }
    } catch (error) {
        console.log("Error in Cab-Driver SignUp Controller : "+error.message);
        res.status(500).json({message : "Internal Server Error."})
    }
};


const cabDriverLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required!!" });
    }

    // 2. Find cab driver
    const cabDriver = await CabDriver.findOne({ email });
    if (!cabDriver) {
      return res.status(400).json({ message: "Invalid Credentials!!" });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, cabDriver.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials!!" });
    }

    // 4. Generate JWT token with role = "cabdriver"
    generateToken(cabDriver._id, cabDriver.role, res);

    // 5. Send response
    res.status(200).json({
      _id: cabDriver._id,
      name: cabDriver.name,
      email: cabDriver.email,
      vehicleNumber: cabDriver.vehicleNumber,
      platform: cabDriver.platform,
      phoneNumber: cabDriver.phoneNumber,
      earnings: cabDriver.earnings,
    });
  } catch (error) {
    console.error("Error in CabDriver Login:", error.message);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};


const cabDriverLogout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the JWT cookie
    res.status(200).json({ message: "Cab Driver Logged Out Successfully." });
  } catch (error) {
    console.error("Error in CabDriver Logout:", error.message);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const cabDriverCheckAuth = (req,res) => {
    try {
    if (req.user.role !== "cab-driver") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const getAllCabDrivers = async (req, res) => {
  try {
    const drivers = await CabDriver.find().select("-password"); // exclude password

    res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching cab drivers:", error.message);
    res.status(500).json({ message: "Failed to fetch cab drivers" });
  }
};
module.exports = {cabDriverSignup, cabDriverLogin, cabDriverLogout, cabDriverCheckAuth,getAllCabDrivers}