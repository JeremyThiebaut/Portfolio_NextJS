import Link from "next/link";
import axios from "axios";

const Post = (post) => {
  return (
    <>
      <h1>Post</h1>
      <pre>{JSON.stringify(post.post[0].title, null, 2)}</pre>
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
  const paths = posts.map((p) => ({ params: { title: p.title.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const post = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`,
    data: params,
  });
  return {
    props: {
      post: post.data.post,
    },
  };
};
