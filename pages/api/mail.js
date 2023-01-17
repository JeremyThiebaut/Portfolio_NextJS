// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
const Airtable = require("airtable");

export default async function handler(req, res) {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );
  const data = JSON.parse(req.body);

  const response = await base("Mail")
    .create([
      {
        fields: {
          firstname: data.firstName,
          lastname: data.lasrName,
          email: data.mail,
          phone: data.phone,
          description: data.message,
        },
      },
    ])
    .then((send) => {
      console.log("Send mail success.");
      res.status(200).end();
    })
    .catch((e) => {
      console.log("Send mail failed.");
      res.status(401).end();
    });
}
