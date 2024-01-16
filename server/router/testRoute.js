const express = require("express");
const testController = require("../controllers/testController");
const testValidation = require("../validations/testValidation");
const checkUserRole = require("../middlewares/roleHandle");

const router = express.Router();

router.use(checkUserRole);

router.route("/").get(testController.getTest);
router.route("/:id").get(testController.getOneTest);
router.route("/").post(testValidation.createTest, testController.createTest);
router
  .route("/update/:id")
  .put(testValidation.updateTest, testController.updateTest);
router.route("/delete/:id").delete(testController.deleteTest);

module.exports = router;
