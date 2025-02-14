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
                email: user.email,
                role:user.isAdmin
            }
            const token = JsonWebToken.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' })
            res.setHeader(
                "Set-Cookie",
                `token=${token}; HttpOnly; Path=/; Max-Age=3600;` // Expires in 1 hour
            );
            
            const redirectUrl = user.isAdmin ? "/admin" : "/"; 
            const response = res.json({
                message: "login success",
                success: true,
                redirectUrl
            })


            return response
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}