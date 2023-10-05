const express = require("express");
const subjectController = require("../controllers/subjectsController");

const router = express.Router();

// Subject
router.route("/").get(subjectController.getSubject);
router.route("/").post(subjectController.createSubject);
router.route("/:id").get(subjectController.getOneSubject);
router.route("/update/:id").put(subjectController.updateSubject);
router.route("/delete/:id").delete(subjectController.deleteSubject);

module.exports = router;
