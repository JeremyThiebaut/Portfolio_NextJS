// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const id = req.body.id;
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Profil?filterByFormula=ID=${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  );
  const { records } = await response.json();

  const profil = records.map((record) => {
    return {
      id: record.id,
      ...record.fields,
    };
  });

  res.status(200).json({ profil });
}
