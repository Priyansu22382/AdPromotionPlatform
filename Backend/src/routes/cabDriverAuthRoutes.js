const express = require("express");
const { cabDriverLogin, cabDriverSignup, cabDriverLogout, cabDriverCheckAuth } = require("../controllers/cabDriverAuthController");
const authMiddleware = require("../middlewares/authMiddlewares");
const { isCabDriver } = require("../middlewares/roleMiddleware");
const { getAllCabDrivers } = require("../controllers/cabDriverAuthController");
const { isAdmin } = require("../middlewares/roleMiddleware");
const CabDriver = require("../models/cabDriverModel");
const router = express.Router();

router.post("/cab-driver/login", cabDriverLogin);
router.post("/cab-driver/signup", cabDriverSignup);
router.post("/cab-driver/logout", cabDriverLogout);
router.get("/cab-driver/check-Auth", authMiddleware, isCabDriver, cabDriverCheckAuth);

router.get("/all", authMiddleware, isAdmin, getAllCabDrivers);

// PATCH /auth/cab-driver/toggle-availability
router.patch('/cab-driver/toggle-availability', authMiddleware, async (req, res) => {
  const driver = await CabDriver.findById(req.user.id);
  driver.isAvailable = !driver.isAvailable;
  await driver.save();
  res.json({ isAvailable: driver.isAvailable });
});
module.exports = router;
