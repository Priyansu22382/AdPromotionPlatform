const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, name, role) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,     // your Gmail address
      pass: process.env.EMAIL_PASS,     // App Password (not regular Gmail password)
    },
  });

  const mailOptions = {
    from: `"AdPromotion Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🎉 Welcome to AdPromotion Platform",
    html: `
      <h2>Hi ${name},</h2>
      <p>Thanks for signing up as a <strong>${role}</strong>!</p>
      <p>We’re excited to have you on board 🚀</p>
      <p>— AdPromotion Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendWelcomeEmail
