import mongoose from "mongoose";
const addQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please provide a question'],
        unique: true,
    },
    option1: {
        type: String,
        required: [true, 'Please provide an option1'],
    },
    option2: {
        type: String,
        required: [true, 'Please provide a option2'],
    },
    option3: {
        type: String,
        required: [true, 'Please provide a option3'],
    },
    option4: {
        type: String,
        required: [true, 'Please provide a option4'],
    },
    correctAnswer: {
        type: String,
        required: [true, 'Please provide a correctAnswer'],
    },

})
const Question = mongoose.models.question || mongoose.model("question", addQuestionSchema)
export default Question;