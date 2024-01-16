const express = require("express");
const classController = require("../controllers/classesController");
const classValidation = require("../validations/classValidation");
const checkUserRole = require("../middlewares/roleHandle");

const router = express.Router();

router.use(checkUserRole);
// Class
router.route("/").get(classController.getClass);
router.route("/:id").get(classController.getOneClass);
router
  .route("/")
  .post(classValidation.createClass, classController.createClass);
router
  .route("/update/:id")
  .put(classValidation.updateClass, classController.updateClass);
router.route("/delete/:id").delete(classController.deleteClass);

module.exports = router;
