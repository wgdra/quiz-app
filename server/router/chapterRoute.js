const express = require("express");
const chapterController = require("../controllers/chapterController");
const chapterValidation = require("../validations/chapterValidation");

const router = express.Router();

// Chapter
router.route("/").get(chapterController.getChapter);
router.route("/:id").get(chapterController.getOneChapter);
router
  .route("/")
  .post(chapterValidation.createChapter, chapterController.createChapter);
router
  .route("/update/:id")
  .put(chapterValidation.updateChapter, chapterController.updateChapter);
router.route("/delete/:id").delete(chapterController.deleteChapter);

module.exports = router;
