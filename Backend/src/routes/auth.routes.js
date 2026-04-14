const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware")

const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get("/get-me", identifyUser, authController.getMe);

module.exports = router;