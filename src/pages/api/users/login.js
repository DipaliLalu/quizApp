import { connect } from "@/dbConfig/db";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";

// Connect to the database
connect();

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ error: "User does not exists" });
            }

            const validPassword = await bcryptjs.compare(password, user.password)

            if (!validPassword) {
                return res.status(400).json({ error: "password doesn't match" });
            }
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            }
            const token = JsonWebToken.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })
            res.setHeader("Set-Cookie", `token=${token}; HttpOnly;`);
            const response = res.json({
                message: "login success",
                success: true
            })


            return response
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}