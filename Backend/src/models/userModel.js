const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "company", // 👈 Role added for users (companies)
    enum: ["company"],
  },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "AdRequest" }],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = model("User", userSchema);
module.exports = User;
