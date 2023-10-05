const userSchema = require("../models/userSchema");
const { StatusCodes } = require("http-status-codes");
const validation = require("../validations/userValidation");

// GET ALL
async function getUser(req, res, next) {
  try {
    const result = await userSchema.find();

    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Không lấy được dữ liệu...!" });
    }
    res
      .status(StatusCodes.OK)
      .json({ status: true, data: result, message: "Get Data Susses...!" });
  } catch (error) {
    next(error);
  }
}

// CREATE
async function createUser(req, res, next) {
  try {
    const reqBody = req.body;

    const result = await validation.validateAsync(reqBody, {
      abortEarly: false,
    });

    console.log("result", result);
    // const result = await userSchema.insertMany({
    //   user_name: dataReq.user_name,
    //   password: dataReq.password,
    //   full_name: dataReq.full_name,
    //   role: dataReq.role,
    //   email: dataReq.email,
    // });
    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Lỗi thêm mới người dùng...!" });
    }
    res
      .status(StatusCodes.CREATED)
      .json({ status: true, data: result, message: "Thêm mới thành công!" });
  } catch (error) {
    next(error);
  }
}

// UPDATE ONE
async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const dataReq = req.body;

    const result = await userSchema.findOneAndUpdate({ _id: id }, dataReq, {
      new: true,
    });

    if (!result) {
      return res.status(400).json({ msg: "Lỗi Request!" });
    }
    return res
      .status(200)
      .json({ status: true, data: result, msg: "Chỉnh sửa thành công!" });
  } catch (error) {
    res.status(500).json({ msg: "Lỗi chỉnh sửa người dùng...!" });
  }
}

// DELETE ONE
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const result = await userSchema.findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(400).json({ msg: "Lỗi Request!" });
    }
    return res
      .status(200)
      .json({ status: true, data: result, msg: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi xóa người dùng...!" });
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
