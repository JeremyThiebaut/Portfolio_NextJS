const Airtable = require("airtable");
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

const Api = async (data, filter) => {
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  const response = await base(data)
    .select(filter)
    .all()
    .catch((e) => {
      console.log(e);
    });

  const records = await response.map((record) => {
    return {
      id: record.id,
      ...record.fields,
    };
  });
  return records;
};

export default Api;
