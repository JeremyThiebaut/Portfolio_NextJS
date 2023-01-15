// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
const Airtable = require("airtable");

export default async function handler(req, res) {
  if (req.body.title) {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
      AIRTABLE_BASE_ID
    );

    const response = await base("Project")
      .select({ filterByFormula: `title = "${req.body.title}"` })
      .firstPage()
      .catch((e) => {
        console.log(e);
      });

    const project = response.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });

    res.status(200).json({ project });
  } else {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
      AIRTABLE_BASE_ID
    );

    const response = await base("Project")
      .select({})
      .firstPage()
      .catch((e) => {
        console.log(e);
      });

    const project = response.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });

    res.status(200).json({ project });
  }
}
