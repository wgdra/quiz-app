const { StatusCodes } = require("http-status-codes");

const checkUserRole = async (req, res, next) => {
  const role = req.user.role;

  if (role !== 0) {
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: "Bạn không có quyền xử lý dữ liệu !" });
  }

  if (role === 0) {
    next();
  }
};

module.exports = checkUserRole;
