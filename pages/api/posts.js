// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.body.title) {
    const title = req.body.title;
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Project?filterByFormula=title%3D%22${title}%22`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );
    const { records } = await response.json();

    const post = records.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });

    res.status(200).json({ post });
  } else {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Project`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );
    const { records } = await response.json();

    const posts = records.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });

    res.status(200).json({ posts });
  }
}
