const express = require("express");
const userController = require("../controllers/usersController");

const router = express.Router();

// User
router.route("/").get(userController.getUser);
router.route("/").post(userController.createUser);
router.route("/update/:id").put(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);

module.exports = router;
