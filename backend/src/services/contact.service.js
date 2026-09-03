const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const path = require("path");

let compiledTemplate = null;

const getTemplate = async () => {
  if (!compiledTemplate) {
    const htmlPath = path.join(__dirname, "../templates/mail.html");
    const html = await fs.readFile(htmlPath, "utf-8");
    compiledTemplate = handlebars.compile(html);
  }
  return compiledTemplate;
};

const createTransporter = () => {
  if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    console.warn("Mail warning: MAIL_USERNAME or MAIL_PASSWORD not configured.");
    return null;
  }
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
};

const transporter = createTransporter();

/**
 * Sends an auto-reply to the visitor and an alert notification to the portfolio owner.
 */
const mailService = async (data) => {
  if (!transporter) {
    console.warn("Transporter not initialized. Skipping email delivery.");
    return null;
  }

  const template = await getTemplate();
  const htmlToSend = template({ fullName: data.fullName });

  // 1. Auto-reply acknowledgment to the visitor
  const visitorMailOptions = {
    from: `Deep Hansda <${process.env.MAIL_USERNAME}>`,
    to: data.email,
    subject: "Thank you for reaching out - Deep Hansda",
    html: htmlToSend,
  };

  // 2. Alert notification to portfolio owner
  const adminMailOptions = {
    from: `Portfolio Contact Form <${process.env.MAIL_USERNAME}>`,
    to: process.env.MAIL_USERNAME,
    subject: `New Portfolio Message from ${data.fullName}`,
    text: `You received a new contact submission:\n\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.contactNumber || "N/A"}\n\nMessage:\n${data.message}`,
  };

  try {
    const [visitorResult, adminResult] = await Promise.all([
      transporter.sendMail(visitorMailOptions),
      transporter.sendMail(adminMailOptions),
    ]);
    return { visitorResult, adminResult };
  } catch (err) {
    console.error("MailService Error:", err.message);
    throw err;
  }
};

module.exports = { mailService };
