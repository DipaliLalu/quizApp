import mongoose from "mongoose";

const addQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide a question"],
    unique: true,
  },
  options: {
    type: [String], 
    validate: {
      validator: (arr) => arr.length === 4, 
      message: "Options must include exactly 4 items.",
    },
    required: [true, "Please provide options"],
  },
  correctAnswer: {
    type: String,
    required: [true, "Please provide a correct answer"],
  },
});

// Export the model
const Question = mongoose.models.Question || mongoose.model("Question", addQuestionSchema);
export default Question;
