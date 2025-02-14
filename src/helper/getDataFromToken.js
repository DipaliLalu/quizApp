import jwt from 'jsonwebtoken'
import cookie from "cookie";

export const getDataFromToken = (req) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || "");
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({ error: "Token not found" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;
       
    } catch (error) {
        throw new Error(error.message);
    }
}