import Link from "next/link";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/OnProject.module.scss";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const OneProject = ({ project }) => {
  const listPictures = [];

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
        {project.picture.map((element, index) => {
          if (index === 0) {
            return (
              <div key={element.id} className={styles.oneProject__section}>
                <Image
                  src={element.url}
                  alt={element.filename}
                  width={element.width}
                  height={element.height}
                  priority
                />
                <div
                  className={styles.oneProject__description}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked(project.description)),
                  }}
                />
              </div>
            );
          } else if (index === 1) {
            return (
              <div key={element.id} className={styles.oneProject__section}>
                <div className={styles}>
                  <p>
                    Pour la réalisation de ce projet je me suis servie de ses
                    technos:
                  </p>
                  {project.SkilTitle.map((spe, index) => (
                    <div key={index} className={styles.oneProject__skil}>
                      <p>{spe}</p>
                      <Image
                        src={project.SkilPicture[index].url}
                        alt={project.SkilPicture[index].filename}
                        width={project.SkilPicture[index].width}
                        height={project.SkilPicture[index].height}
                        priority
                      />
                    </div>
                  ))}
                </div>
                <Image
                  src={element.url}
                  alt={element.filename}
                  width={element.width}
                  height={element.height}
                  priority
                />
              </div>
            );
          } else if (index > 2 || index <= 5) {
            listPictures.push(element);
          }
        })}
        <Link
          href={project.url}
          target="_blank"
          className={styles.oneProject__link}
        >
          {project.url}
        </Link>
        {listPictures.length !== 0 && (
          <div className={styles.oneProject__listPicture}>
            {listPictures.map((list) => (
              <Image
                key={list.id}
                src={list.url}
                alt={list.filename}
                width={list.width}
                height={list.height}
                priority
              />
            ))}
          </div>
        )}
        <Footer />
      </div>
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
