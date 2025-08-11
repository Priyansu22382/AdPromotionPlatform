const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const CabDriver = require("../models/cabDriverModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded; // ✅ matches updated token payload

    let user;

    if (role === "admin") {
      user = await Admin.findById(id).select("-password");
    } else if (role === "cab-driver") {
      user = await CabDriver.findById(id).select("-password");
    } else if (role === "company") {
      user = await User.findById(id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    req.user = user;
    req.user.role = role;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = authMiddleware;
