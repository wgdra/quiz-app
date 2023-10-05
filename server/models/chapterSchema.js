const mongoose = require("mongoose");

const schema = mongoose.Schema;

const chapterSchema = new schema({
  chapter_id: { type: Number },
  class_id: { type: Number },
  subject_id: { type: Number },
  chapter_name: { type: String },
  quiz: [
    {
      quiz_id: { type: Number },
      quiz_name: { type: String },
      questions: [
        {
          question_id: { type: Number },
          options: [
            {
              option_id: { type: Number },
              option: { type: String },
            },
          ],
          answer: { type: Number },
        },
      ],
    },
  ],
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("chapter", chapterSchema);
