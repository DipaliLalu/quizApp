import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userSchema";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const userId = await getDataFromToken(req);

            const user =await User.findOne({ _id: userId }).select("-password");

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json({ message: "User Found", data: user });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}