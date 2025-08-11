const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
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
  role: {
    type: String,
    default: "admin", // 👈 This assigns the role
    enum: ["admin"],  // Optional: restrict to only allowed roles
  }
});

const Admin = model("Admin", adminSchema);
module.exports = Admin;
