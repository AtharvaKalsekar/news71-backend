import nodemailer from 'nodemailer';

export const sendOtp = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "News 71 <no-reply@news71.com>",
    to: email,
    subject: "Email verification",
    text: `Your OTP is ${otp}`,
  });
  return info;
};
