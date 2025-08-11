const Admin = require("../models/adminModel");
const AdRequest = require("../models/adRequestModel");
const CabDriver = require("../models/cabDriverModel");
const generateToken = require("../lib/utils");
const bcrypt = require("bcryptjs");

const adminSignup = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message : "All Field Required!!"});
        }
        if(password.length < 6){
            return res.status(400).json({message : "Password Length Must Be Atleast 6!!"});
        }

        const admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({message : "This Admin Already Exists!!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newAdmin = new Admin({
            name : name,
            email : email,
            password : hashPassword
        });

        if(newAdmin){
            await newAdmin.save();
            generateToken(newAdmin._id,newAdmin.role,res);

            res.status(200).json({
                _id : newAdmin._id,
                name : newAdmin.name,
                email : newAdmin.email
            });
        }
        else{
            return res.status(400).json({message : "Invalid Admin Data!!"})
        }

    } catch (error) {
        console.log("Error in Admin SignUp Controller : "+error.message);
        res.status(500).json({message : "Internal Server Error."})
    }
};

const adminLogin = async (req,res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message : "All Field Required!!"});
        }
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message : "Invalid Credentials!!"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,admin.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid Credentials!!"});
        }

        generateToken(admin._id,admin.role,res);
        res.status(200).json({
            _id : admin._id,
            name : admin.name,
            email : admin.email
        });

    } catch (error) {
        console.log("Error in Admin Login Controller : "+error.message);
        res.status(500).json({message : "Internal Server Error!!"});
    }
};

const adminLogout = async (req,res) => {
    try{
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({message : "Logged Out Successfully."});
    }
    catch(error){
        console.log("Error in Admin LogOut : "+error.message);
        res.status(500).json({message : "Internal Server Error!!"});
    }
}

const adminCheckAuth = (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json({
      role: "admin",
      _id: req.user._id,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {adminSignup, adminLogin, adminLogout, adminCheckAuth};