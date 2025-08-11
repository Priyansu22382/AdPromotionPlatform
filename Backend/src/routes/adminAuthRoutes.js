const express = require("express");
const { adminLogin, adminSignup, adminLogout, adminCheckAuth } = require("../controllers/adminAuthController");
const authMiddleware = require("../middlewares/authMiddlewares");
const { isAdmin } = require("../middlewares/roleMiddleware");
const CabDriver = require("../models/cabDriverModel");
const { deleteAdRequest } = require("../controllers/adRequestController");

const router = express.Router();

router.post("/admin/login", adminLogin);
router.post("/admin/signup", adminSignup);
router.post("/admin/logout", adminLogout);
router.get("/admin/check-Auth", authMiddleware, isAdmin, adminCheckAuth);
router.delete("/admin/delete-ad/:id", authMiddleware, isAdmin, deleteAdRequest);


router.get("/admin/cab-driver/all", authMiddleware, isAdmin, async (req, res) => {
  try {
    const drivers = await CabDriver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cab drivers" });
  }
});



module.exports = router;
