import { connect } from "@/dbConfig/db";
import Question from "@/models/addQuestionSchema";

// Connect to the database
connect();

export default async function handler(req, res) {
    if (req.method === "GET") { 
        try {
            const questions = await Question.find();
            return res.status(200).json({ success: true, data: questions });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}