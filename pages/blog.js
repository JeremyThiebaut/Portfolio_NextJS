const blog = ({ posts }) => {
  return (
    <>
      <h1>result</h1>
      {posts?.map((p) => (
        <h5 key={p.id}>{p.title}</h5>
      ))}
      <hr />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
};

export default blog;

export const getStaticProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`
  );

  const { posts } = await response.json();
  return {
    props: {
      posts,
    },
  };
};
