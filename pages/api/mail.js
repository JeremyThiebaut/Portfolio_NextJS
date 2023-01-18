// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
const Airtable = require("airtable");
import { mailOptions, transporter } from "../../config/nodemailer";

const handler = async (req, res) => {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    if (
      !data.firstName ||
      !data.lastName ||
      !data.mail ||
      !data.phone ||
      !data.message
    ) {
      return res.status(400).json({ message: "Bad request" });
    }
    try {
      await base("Mail")
        .create([
          {
            fields: {
              firstname: data.firstName,
              lastname: data.lastName,
              email: data.mail,
              phone: data.phone,
              description: data.message,
            },
          },
        ])
        .then((send) => {
          console.log("Save mail success.");
        })
        .catch((e) => {
          console.log("Save mail failed.");
          return res.status(400).json({ message: e.message });
        });

      const newMessage = data.message.split("\n").join("<br/>");

      await transporter.sendMail({
        ...mailOptions,
        to: `"${data.firstName} ${data.lastName}" <${data.mail}>'`,
        subject: "Email du site",
        html: `<h1>Message envoyé depuis la page Contact de jtdev.fr</h1>
        <p><b>Nom, Prénom : </b>${data.firstName} ${data.lastName}<br>
        <b>Email : </b>${data.mail}<br>
        <b>Numéro : </b>${data.phone}<br>
        <b>Message : </b><br/>${newMessage}</p>`,
      });

      console.log("Send mail success.");
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log("Send mail failed.");
      return res.status(401).end();
    }
  } else {
    res.status(200).json({ message: "Hello" });
  }
};

export default handler;
