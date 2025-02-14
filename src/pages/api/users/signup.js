import { connect } from "@/dbConfig/db";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

// Connect to the database
connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save(); // Await the save call

      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

      // Respond with success
      return res.status(201).json({
        message: "User registration successful",
        success: true,
        user: savedUser,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.find(); // Fetch all users
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Unable to fetch users" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}


// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { username, email, password } = req.body;
//         try {
//             const payload = { username, email, password }
//             // await mongoose.connect(connect());
//             let user = new User(payload);
//             const result = await user.save();
//             return res.status(200).json({ result })
//         } catch (error) {
//             console.log(error);
//         }
//     } else if (req.method === 'GET') {
//         let data;
//         try {

//             data = await User.find();
//             // console.log(data);
//             return res.status(200).json({ result: data })
//         } catch (error) {
//             console.log(error);
//         }
//         // res.status(200).json({ message: 'ok' });
//     }
//     else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }
