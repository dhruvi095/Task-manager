const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dhruvisangadiya@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'qfwkdqtxfklhomil'
    }
});

const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();



    const info = await transporter.sendMail({
        from: '"Fred Foo 👻"<elliot.thompson@ethereal.email>',
        to: "elliot.thompson@ethereal.email",
        subject: "Test Email",
        text: "This is a test email sent from Node.js!",
    });
    res.json({ message: "Email sent", info: info });
}

module.exports = { sendMail , transporter}