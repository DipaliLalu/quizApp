import { connect } from "@/dbConfig/db";

// Connect to the database
connect();

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            res.setHeader(
                "Set-Cookie",
                `token=; HttpOnly; Max-Age=0;`
            );

            return res.status(200).json({ message: "Logout successfully", status: true });
        }catch(error){
            return res.status(500).json({ error: error.message });
        }
    }
}