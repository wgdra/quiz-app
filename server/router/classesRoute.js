const express = require("express");
const classController = require("../controllers/classesController");

const router = express.Router();

// Class
router.route("/").get(classController.getClass);
router.route("/").post(classController.createClass);
router.route("/:id").get(classController.getOneClass);
router.route("/update/:id").put(classController.updateClass);
router.route("/delete/:id").delete(classController.deleteClass);

module.exports = router;
