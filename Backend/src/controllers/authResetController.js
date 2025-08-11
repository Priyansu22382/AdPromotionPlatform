const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const CabDriver = require("../models/cabDriverModel");
const sendEmail = require("../lib/sendEmail"); // use nodemailer setup

const forgotPassword = async (req, res) => {
  const { email, role } = req.body;
  const Model = role === "cab-driver" ? CabDriver : User;
  const user = await Model.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetURL = `http://localhost:5173/reset-password/${token}?role=${role}`;
  const message = `Hi ${user.name},\n\nReset your password using the link: ${resetURL}`;

  await sendEmail(user.email, "Password Reset", message);
  res.status(200).json({ message: "Reset email sent" });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, role } = req.body;

  const Model = role === "cab-driver" ? CabDriver : User;
  const user = await Model.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) return res.status(400).json({ message: "Token invalid or expired" });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword,salt);
  user.password = hashPassword; // hash if needed
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
};

module.exports = {forgotPassword, resetPassword};
