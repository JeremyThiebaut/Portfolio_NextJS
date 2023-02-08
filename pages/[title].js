import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/OnProject.module.scss";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import Api from "../lib/getData";

const OneProject = ({ project, profil, picture }) => {
  const listPictures = [];
  return (
    <>
      <Navbar logo={profil.logo[0]} logoUrl={profil.logoUrl} />
      <div className={styles.oneProject}>
        <div className={styles.oneProject__title}>
          <h1>{project.title}</h1>
          <Link href={project.url} target="_blank">
            {project.url}
          </Link>
        </div>
        <div className={styles.oneProject__info}>
          {project.picture.map((element, index) => {
            if (index === 0) {
              return (
                <div key={element.id} className={styles.oneProject__section}>
                  <Image
                    src={picture[index]}
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
                  <div className={styles.oneProject__allSection}>
                    <p>
                      Pour la réalisation de ce projet je me suis servie de ses
                      technos:
                    </p>
                    {project.SkilTitle.map((spe, index) => (
                      <div key={index} className={styles.oneProject__skil}>
                        <p>{spe}</p>
                        <Image
                          src={project.pictureUrl[index]}
                          alt={project.SkilPicture[index].filename}
                          width={project.SkilPicture[index].width}
                          height={project.SkilPicture[index].height}
                          priority
                        />
                      </div>
                    ))}
                  </div>
                  <Image
                    src={picture[index]}
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
        </div>
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
                src={list.thumbnails.full.url}
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
  const project = await Api("Project", {});

  const paths = await project.map((p) => ({
    params: { title: p.title.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const project = await Api("Project", {
    filterByFormula: `title = "${params.title}"`,
  });
  const profil = await Api("Profil", {
    filterByFormula: `id = 1`,
  });

  return {
    props: {
      project: project[0],
      profil: profil[0],
      picture: project[0].picuresProjectUrl,
    },
    revalidate: 1,
  };
};
