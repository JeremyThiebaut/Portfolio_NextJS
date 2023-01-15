import Link from "next/link";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/OnProject.module.scss";

const OneProject = ({ project }) => {
  return (
    <div className={styles.oneProject}>
      <Navbar />
      <div className={styles.oneProject__container}>
        <h1>Article</h1>
        <pre>{project.title}</pre>
      </div>
      <Link href={"/#project"}>retour</Link>
      <Footer />
    </div>
  );
};

export default OneProject;

export const getStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/project`
  );
  const { project } = await response.json();
  const paths = project.map((p) => ({ params: { title: p.title.toString() } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const project = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/project`,
    data: params,
  });
  return {
    props: {
      project: project.data.project[0],
    },
  };
};
