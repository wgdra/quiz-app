const express = require("express");
const userValidation = require("../validations/userValidation");
const authController = require("../controllers/authController");

const router = express.Router();

// Auth
router
  .route("/login")
  .post(userValidation.createUser, authController.loginUser);
router
  .route("/signup")
  .post(userValidation.createUser, authController.signupUser);

module.exports = router;
