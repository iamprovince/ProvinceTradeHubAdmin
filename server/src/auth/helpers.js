import dotenv from 'dotenv';
dotenv.config()
import JWT from 'jsonwebtoken'
// ** Helper for reauthenticating admin access token
async function generateAccessToken(admin) {
    return JWT.sign(admin, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '72h' })
}
const mail = async (details) => {
    const { email, subject, message, header } = details; // `email` can be a single string or an array of addresses
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: {
                name: "Province TradeHub",
                address: process.env.MAILER_USERNAME,
            },
            to: Array.isArray(email) ? email.join(', ') : email,
            subject: subject,
            html: generateEmailHTML({ message, header }),
        });

        return {
            success: true,
            accepted: info.accepted, // List of email addresses that accepted the message
            rejected: info.rejected, // List of email addresses that rejected the message
            response: info.response, // Response from the server
            messageId: info.messageId, // Message ID for tracking
        };
    } catch (error) {
        return {
            success: false,
            error: error.message, // Provide the error message
        };
    }
};
function generateEmailHTML(details) {
    const { message, header } = details
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 20px;
                    color: #007BFF;
                }
                .content {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .footer {
                    font-size: 14px;
                    text-align: center;
                    color: #777;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">${header}</div>
                <div class="content">${message}</div>
                <div class="footer">
                    &copy; ${new Date().getFullYear()} Province TradeHub. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;
}
export { generateAccessToken, mail }