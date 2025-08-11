const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// vehicle detail -> licence -> Rc -> 
const CabDriverSchema = new Schema({
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
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  platform: {
    type: String,
    required: true,
  }, // e.g., Uber, Rapido
  phoneNumber: {
    type: Number,
    required: true,
    unique : true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  assignedAds: [{ type: mongoose.Schema.Types.ObjectId, ref: "AdRequest" }],
  earnings: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "cab-driver", // 👈 Role assignment
    enum: ["cab-driver"],  // Optional but ensures consistency
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const CabDriver = model("Cab-Driver", CabDriverSchema);
module.exports = CabDriver;
