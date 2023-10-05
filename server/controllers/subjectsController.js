const subjectSchema = require("../models/subjectSchema");

// GET ALL
async function getSubject(req, res) {
  try {
    const result = await subjectSchema.find();

    if (!result) {
      return res.status(400).json({ msg: "Không lấy được dữ liệu...!" });
    }
    return res
      .status(200)
      .json({ status: true, data: result, msg: "Get Data Susses...!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi không lấy được dữ liệu...!" });
  }
}

// GET ONE
async function getOneSubject(req, res) {
  try {
    const class_id = req.params.id;
    const result = await subjectSchema.find({ class_id: class_id });

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
async function createSubject(req, res) {
  try {
    const dataReq = req.body;

    const result = await subjectSchema.insertMany({
      class_id: dataReq.class_id,
      subject_id: dataReq.subject_id,
      subject_name: dataReq.subject_name,
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
async function updateSubject(req, res) {
  try {
    const id = req.params.id;
    const dataReq = req.body;

    const result = await subjectSchema.findOneAndUpdate({ _id: id }, dataReq, {
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
async function deleteSubject(req, res) {
  try {
    const id = req.params.id;
    const result = await subjectSchema.findOneAndDelete({ _id: id });

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
  getSubject,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
