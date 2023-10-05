const { StatusCodes } = require("http-status-codes");

const errorHandling = (err, req, res, next) => {
  if (!err.status) err.status = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    status: err.status,
    message: err.message || StatusCodes[err.status],
    // stack: err.stack,
  };

  res.status(responseError.status).json(responseError);
};

module.exports = errorHandling;
