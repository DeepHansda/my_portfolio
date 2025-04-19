const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises; // use promise version of fs
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const mailService = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const htmlPath = path.join(__dirname, "../templates/mail.html");
    const html = await fs.readFile(htmlPath, "utf-8");

    const template = handlebars.compile(html);
    const htmlToSend = template({ fullName: data.fullName });

    const mailOptions = {
      from: `Deep Hansda <${process.env.MAIL_USERNAME}>`,
      to: data.email,
      subject: "Message From Deep Hansda",
      html: htmlToSend,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Mail sent:", result);
    return result;
  } catch (err) {
    console.error("Mail error:", err);
    throw err; // allow error to be caught by calling function
  }
};

module.exports = { mailService };
