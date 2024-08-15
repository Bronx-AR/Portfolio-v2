export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message, subject } = req.body;
        const to = process.env.NEXT_PUBLIC_MAIL_TO_ADDRESS;
        const body = `From: ${name}<br>E-Mail: ${email}<br>Message:<br>${message}`;

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_MAIL_HOST,
            port: process.env.NEXT_PUBLIC_MAIL_PORT,
            secure: process.env.NEXT_PUBLIC_MAIL_USE_TLS,
            auth: {
                user: process.env.NEXT_PUBLIC_MAIL_USERNAME,
                pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
            }
        });

        try {
            await transporter.sendMail({
                from: email,
                to,
                subject: `New Message from Website: ${subject}`,
                html: body,
            });
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).end();
    }
}
