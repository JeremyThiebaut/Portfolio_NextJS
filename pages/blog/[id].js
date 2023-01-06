import Link from "next/link";

const Post = (post) => {
  return (
    <>
      <h1>Post</h1>
      <Link href={"/blog"}>Retour</Link>
      <hr />
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`
  );
  const { posts } = await response.json();
  const paths = posts.map((p) => ({ params: { id: p.id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`
  );

  const { post } = await response.json();
  return {
    props: {
      post,
    },
  };
};
