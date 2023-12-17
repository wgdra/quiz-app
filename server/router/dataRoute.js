const express = require("express");
const dataController = require("../controllers/dataController");

const router = express.Router();

// Data
router.route("/").get(dataController.getAllData);

module.exports = router;
