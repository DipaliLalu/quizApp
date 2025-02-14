import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"
import User from '@/models/userSchema'

export const sendEmail = async ({ email, emailType, userId }) => {
    try {

        const hasedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hasedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hasedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "04c0efa5c47b46",
                pass: "d8f9eb56a7b533"
            }
        });
        const mailOptions = {
            from: 'dvlalu7@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/auth/verifyemail?token=${hasedToken}">Here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"}<p>copy & paste the link below your browser <br> ${process.env.DOMAIN}/auth/verifyemail?token=${hasedToken}</p></p>`, // html body
        }
        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error) {
        throw new Error(error.message)
    }
}