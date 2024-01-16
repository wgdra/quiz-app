const express = require("express");
const userValidation = require("../validations/userValidation");
const userController = require("../controllers/usersController");

const router = express.Router();

// User
router.route("/").get(userController.getUser);
router.route("/:id").get(userController.getOneUser);
router.route("/").post(userValidation.createUser, userController.createUser);
router
  .route("/update/:id")
  .put(userValidation.updateUser, userController.updateUser);
router.route("/changepassword/:id").put(userController.changePassword);
router.route("/delete/:id").delete(userController.deleteUser);

module.exports = router;
