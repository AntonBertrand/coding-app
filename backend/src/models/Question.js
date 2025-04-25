const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // This prevents MongoDB from creating _id for each option

const questionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  options: {
    type: [optionSchema],
    required: true,
  },
  correctOptionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
