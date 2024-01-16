const express = require("express");
const theoryController = require("../controllers/theoryController");
const theoryValidation = require("../validations/theoryValidation");
const checkUserRole = require("../middlewares/roleHandle");

const router = express.Router();

router.use(checkUserRole);

router.route("/").get(theoryController.getTheory);
router.route("/:id").get(theoryController.getOneTheory);
router
  .route("/")
  .post(theoryValidation.createTheory, theoryController.createTheory);
router
  .route("/update/:id")
  .put(theoryValidation.updateTheory, theoryController.updateTheory);
router.route("/delete/:id").delete(theoryController.deleteTheory);
router.route("/lesson/create/:id").put(theoryController.createLessonFromTheory);
router.route("/lesson/update/:id").put(theoryController.updateLessonFromTheory);
router
  .route("/lesson/delete/:id")
  .patch(theoryController.deleteLessonFromTheory);

module.exports = router;
