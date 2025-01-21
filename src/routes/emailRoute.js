import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/sendEmail", (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ketankhamkar588@gmail.com",
        pass: "bafn ntmv kqxr fwan ",
      },
    });
    const mailOptions = {
      from: "ketankhamkar588@gmail.com",
      to: email,
      subject: "Test email from nodemailer",
      html: "<h1>Welcome</h1><br><h2>Welcome</h2><br><p>That was easy!</p>",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
      } else {
        console.log("Email sent:" + info.response);
        res.status(200).json({ message: "Email sent successfully", info });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
