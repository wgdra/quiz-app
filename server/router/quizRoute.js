const express = require("express");
const quizController = require("../controllers/quizController");
const quizValidation = require("../validations/quizValidation");

const router = express.Router();

router.route("/").get(quizController.getQuiz);
router.route("/:id").get(quizController.getOneQuiz);
router.route("/").post(quizValidation.createQuiz, quizController.createQuiz);
router
  .route("/update/:id")
  .put(quizValidation.updateQuiz, quizController.updateQuiz);
router.route("/delete/:id").delete(quizController.deleteQuiz);
router
  .route("/question/delete/:id")
  .patch(quizController.deleteQuestionFromQuiz);

module.exports = router;
