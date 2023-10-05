const mongoose = require("mongoose");

const schema = mongoose.Schema;

const classSchema = new schema({
  class_id: { type: Number },
  class_name: { type: String },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("class", classSchema);
