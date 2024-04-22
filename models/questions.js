const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    questionIntro: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionsSchema);

module.exports = Question;
