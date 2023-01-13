// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
const Airtable = require("airtable");

export default async function handler(req, res) {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );
  const id = req.body.id;

  const response = await base("Profil")
    .select({ filterByFormula: `{id} = ${id}` })
    .firstPage()
    .catch((e) => {
      console.log(e);
    });

  const profil = response.map((record) => {
    return {
      id: record.id,
      ...record.fields,
    };
  });

  res.status(200).json({ profil });
}
