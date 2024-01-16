const express = require("express");
const quizController = require("../controllers/quizController");
const quizValidation = require("../validations/quizValidation");
const checkUserRole = require("../middlewares/roleHandle");

const router = express.Router();

router.use(checkUserRole);

router.route("/").get(quizController.getQuiz);
router.route("/:id").get(quizController.getOneQuiz);
router.route("/").post(quizValidation.createQuiz, quizController.createQuiz);
router
  .route("/update/:id")
  .put(quizValidation.updateQuiz, quizController.updateQuiz);
router.route("/delete/:id").delete(quizController.deleteQuiz);
router.route("/question/create/:id").put(quizController.createQuestionFromQuiz);
router.route("/question/update/:id").put(quizController.updateQuestionFromQuiz);
router
  .route("/question/delete/:id")
  .patch(quizController.deleteQuestionFromQuiz);

module.exports = router;
