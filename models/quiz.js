const mongoose = require("mongoose");

const time = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const quizSchema = new mongoose.Schema(
  {
    question_text: {
        type: String,
        trim: true,
        required: true
    },
    option_a: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    },
    option_b: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    }, 
    option_c: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    }, 
    option_d: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    },
    correct_option: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    }
  },
  time
);

module.exports = mongoose.model("Quiz", quizSchema);
