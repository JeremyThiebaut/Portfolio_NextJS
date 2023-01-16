import Link from "next/link";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/OnProject.module.scss";
import Image from "next/image";

const OneProject = ({ project }) => {
  console.log(project);
  return (
    <>
      <Navbar />
      <div className={styles.oneProject}>
        <div className={styles.oneProject__title}>
          <h1>{project.title}</h1>
          <Link href={project.url} target="_blank">
            {project.url}
          </Link>
        </div>
        <div className={styles.oneProject__firstSection}>
          {/* {project.SkilTitle.map((element) => (
            <a href="/">{element}</a>
          ))} */}
          <Image
            src={project.picture[0].url}
            alt={project.picture[0].filename}
            width={100}
            height={50}
          />
          {project.description}
        </div>
      </div>
      <Footer />
    </>
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
