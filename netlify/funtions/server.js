require("dotenv").config(); // <-- IMPORTANT (sabse upar hi rakho)

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// POST route to send email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check ENV loaded or not
  console.log("EMAIL_USER =", process.env.EMAIL_USER);
  console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error sending email",
      details: error.message,
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
