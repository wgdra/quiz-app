const classSchema = require("../models/classSchema");

// GET ALL
async function getClass(req, res) {
  try {
    const result = await classSchema.find();

    if (!result) {
      return res.status(400).json({ msg: "Không lấy được dữ liệu...!" });
    }
    return res
      .status(200)
      .json({ status: true, data: result, msg: "Get Data Susses...!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Lỗi không lấy được dữ liệu người dùng...!" });
  }
}

// GET ONE
async function getOneClass(req, res) {
  try {
    const class_id = req.params.id;
    console.log("class id", class_id);
    const result = await classSchema.find({ class_id: class_id });

    if (!result) {
      return res.status(400).json({ msg: "Không lấy được dữ liệu...!" });
    }
    return res
      .status(200)
      .json({ status: true, data: result, msg: "Get Data Susses...!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Lỗi không lấy được dữ liệu người dùng...!" });
  }
}

// POST
async function createClass(req, res) {
  try {
    const dataReq = req.body;

    const result = await classSchema.insertMany({
      class_id: dataReq.class_id,
      class_name: dataReq.class_name,
    });

    if (!result) {
      res.status(400).json({ msg: "Thêm mới lớp không thành công...!" });
    }
    res
      .status(200)
      .json({ status: true, data: result, msg: "Thêm mới thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi thêm mới lớp...!" });
  }
}

// UPDATE ONE
async function updateClass(req, res) {
  try {
    const id = req.params.id;
    const dataReq = req.body;

    const result = await classSchema.findOneAndUpdate({ _id: id }, dataReq, {
      new: true,
    });

    if (!result) {
      console.log("aaaaa");
      return res.status(400).json({ msg: "Chỉnh sửa không thành công!" });
    }
    return res
      .status(200)
      .json({ status: true, data: "", msg: "Chỉnh sửa thành công!" });
  } catch (error) {
    res.status(500).json({ msg: "Lỗi chỉnh sửa lớp...!" });
  }
}

// DELETE ONE
async function deleteClass(req, res) {
  try {
    const id = req.params.id;
    const result = await classSchema.findOneAndDelete({ _id: id });

    if (!result) {
      return res.status(400).json({ msg: "Xóa không thành công!" });
    }
    return res
      .status(200)
      .json({ status: true, data: result, msg: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi xóa lớp...!" });
  }
}

module.exports = {
  getClass,
  getOneClass,
  createClass,
  updateClass,
  deleteClass,
};
