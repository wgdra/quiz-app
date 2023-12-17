const { StatusCodes } = require("http-status-codes");
const dataService = require("../Service/dataService");

// Get Data

async function getAllData(req, res, next) {
  try {
    const result = await dataService.getAllData();

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllData };
