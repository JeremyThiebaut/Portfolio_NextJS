const Api = async (endpoint, filter = {}, method = "GET") => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST") {
    options.body = JSON.stringify(filter);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    options
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export default Api;
