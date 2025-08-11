const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/utils");
const sendWelcomeEmail = require("../lib/sendEmail");
const userSignup = async (req,res) => {
    try {
        const {name, email, password, companyName } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message : "All Fields Are Required!!"});
        }

        if(password.length < 6){
            return res.status(400).json({message : "Password Length Must Be Atleast 6!!"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "User Already Exist!!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name : name,
            email : email,
            password : hashPassword,
            companyName : companyName,
        });

        if(newUser){
            await newUser.save();
            await sendWelcomeEmail(newUser.email, newUser.name, "User");
            generateToken(newUser._id,newUser.role, res);

            res.status(201).json({
                _id : newUser._id,
                name : newUser.name,
                email : newUser.email,
                companyName : newUser.companyName
            });
        }
        else{
            return res.status(400).json({message : "Invalid User Data!!"})
        }
    } catch (error) {
        console.log("Error in User SignUp Controller : "+error.message);
        res.status(500).json({message : "Internal Server Error!!"});
    }
};


const userLogin = async (req,res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message : "Empty Credentials!!"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Invalid Credentials!!"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message : "Invalid Credentials!!"});
        }
        const userId = user._id
        generateToken(userId,user.role, res);
        res.status(200).json({
            _id : userId,
            name : user.name,
            email : user.email
        });
    } catch (error) {
        console.log("Error in User Login Controller : "+error.message);
        res.status(500).json({message : "Internal Server Error!!"});
    }
};

const userLogout = async (req,res) => {
    try{
        res.cookie("jwt","",{maxAge : 0});
        res.status(200).json({message : "Logged Out Successfully."});
    }
    catch(error){
        console.log("Error in User LogOut : "+error.message);
        res.status(500).json({message : "Internal Server Error!!"});
    }
};

const userCheckAuth = async (req,res) => {
    try {
       res.status(200).json(req.user); 
    } catch (error) {
        console.log("Error in Check User Authentication : "+error.message);
        res.status(500).json({message : "Internal Server Error!!"});
    }
}

module.exports = {userSignup, userLogin, userLogout, userCheckAuth};
