import { connect } from "@/dbConfig/db";
import User from "@/models/userSchema";

// Connect to the database
connect();
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { token } = req.body;
            const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
            if (!user) {
                return res.status(400).json({ error: "Invalid token" });
            }
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save();
            return res.status(200).json({ message: "email verify successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}