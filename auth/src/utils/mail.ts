import { IMail } from "./../interfaces/mail.interface";
import nodemailer from "nodemailer";

const sendEmail = async (mailData: IMail) => {
  const { to, subject, text } = mailData;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      pool: true,
      secure: true,
      auth: {
        user: "fullstacksern@gmail.com",
        pass: "veqgbwwdrswyunwl",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "fullstacksern@gmail.com",
      to: to,
      subject: subject,
      html: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

export default sendEmail;
