const express = require("express");
const subjectController = require("../controllers/subjectsController");
const subjectValidation = require("../validations/subjectValidation");
const checkUserRole = require("../middlewares/roleHandle");

const router = express.Router();

router.use(checkUserRole);

// Subject
router.route("/").get(subjectController.getSubject);
router
  .route("/")
  .post(subjectValidation.createSubject, subjectController.createSubject);
router.route("/:id").get(subjectController.getOneSubject);
router
  .route("/update/:id")
  .put(subjectValidation.updateSubject, subjectController.updateSubject);
router.route("/delete/:id").delete(subjectController.deleteSubject);

module.exports = router;
