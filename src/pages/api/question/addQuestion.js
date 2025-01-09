import { connect } from "@/dbConfig/db";
import Question from "@/models/addQuestionSchema";

// Connect to the database
connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {question,option1,option2,option3,option4,correctAnswer} = req.body;

      const existingQuestion = await Question.findOne({ question });
      if (existingQuestion) {
        return res.status(400).json({ error: "question already exists" });
      }

      const newQuestion = new Question({
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer
      });
      const savedQuestion = await newQuestion.save(); // Await the save call

      // Respond with success
      return res.status(201).json({
        message: "Question registration successful",
        success: true,
        question: savedQuestion,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
