const mongoose = require("mongoose");

const schema = mongoose.Schema;

const subjectSchema = new schema({
  class_id: { type: Number },
  subject_id: { type: Number },
  subject_name: { type: String },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("subject", subjectSchema);
