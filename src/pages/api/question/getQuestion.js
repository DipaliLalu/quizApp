import { connect } from "@/dbConfig/db";
import Question from "@/models/addQuestionSchema";

export default async function handler(req, res) {
    await connect();
    try {
        
        if (req.method === "GET") {
            const questions = await Question.find();
            if (!questions.length) {
                return res.status(200).json({ success: true, message: "No questions found", data: [] });
            }
            return res.status(200).json({ success: true, data: questions });
        } else {
            return res.status(405).json({ success: false, error: "Method Not Allowed" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
