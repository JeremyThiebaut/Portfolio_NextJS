import Link from "next/link";

const Post = (post) => {
  return (
    <>
      <h1>Post</h1>
      <pre>{JSON.stringify(post.post.title, null, 2)}</pre>
      <Link href={"/blog"}>Retour</Link>
      <hr />
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
  const { posts } = await response.json();
  const post = posts.find((p) => p.id.toString() === params.id);
  console.log(post);
  return {
    props: {
      post,
    },
  };
};
