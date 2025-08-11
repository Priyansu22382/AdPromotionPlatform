const express = require("express");
const { userCheckAuth, userSignup, userLogin, userLogout } = require("../controllers/userAuthController");
const authMiddleware = require("../middlewares/authMiddlewares");
const { isCompany } = require("../middlewares/roleMiddleware");
const router = express.Router();

router.post("/company/login", userLogin);
router.post("/company/signup", userSignup);
router.post("/company/logout", userLogout);
router.get("/company/check-Auth", authMiddleware, isCompany, userCheckAuth);
router.put("/company/edit-ad/:id", authMiddleware, isCompany, )


module.exports = router;
