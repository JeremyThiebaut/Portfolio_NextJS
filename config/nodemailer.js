import nodemailer from "nodemailer";

const email = process.env.GMAIL;
const pass = process.env.GPASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },

  //   host: "telchak.o2switch.net",
  //   port: 993,
  //   secure: true,
  //   auth: {
  //     user: email,
  //     pass: pass,
  //   },
});

export const mailOptions = {
  to: email,
};
