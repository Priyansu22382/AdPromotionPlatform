const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");

const AdRequestSchema = new Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adTitle: {
    type : String,
    required : true,
  },
  adImage: {
    type : String,
    required : true,
  }, // file path or cloud URL
  durationInDays: {
    type : Number,
    required : true,
  },
  totalVehicles: {
    type : Number,
    required : true,
  },
  pricePerVehicle: {
    type : Number,
    required : true,
  },
  totalAmount: {
    type : Number,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  startDate: {
  type: Date,
  required: true,
  },
  durationInDays: {
  type: Number,
  required: true,
  },
  status: {
  type: String,
  enum: ['Pending', 'Approved', 'Rejected', 'Assigned', 'Completed'],
  default: 'Pending',
  },
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Completed"], default: "Pending" },
  assignedDrivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cab-Driver" }],
  createdAt: { type: Date, default: Date.now }
});

const AdRequest = model("AdRequest", AdRequestSchema);
module.exports = AdRequest;
