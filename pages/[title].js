import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/OnProject.module.scss";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
const Airtable = require("airtable");
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

const OneProject = ({ project, logo }) => {
  const listPictures = [];

  return (
    <>
      <Navbar logo={logo} />
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
                  src={element.thumbnails.large.url}
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
                        src={project.SkilPicture[index].thumbnails.large.url}
                        alt={project.SkilPicture[index].filename}
                        width={project.SkilPicture[index].width}
                        height={project.SkilPicture[index].height}
                        priority
                      />
                    </div>
                  ))}
                </div>
                <Image
                  src={element.thumbnails.full.url}
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
  const Api = async (data, filter) => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
      AIRTABLE_BASE_ID
    );

    const response = await base(data)
      .select(filter)
      .firstPage()
      .catch((e) => {
        console.log(e);
      });

    const records = response.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });
    return records;
  };

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
  const Api = async (data, filter) => {
    const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
      AIRTABLE_BASE_ID
    );

    const response = await base(data)
      .select(filter)
      .firstPage()
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

  const project = await Api("Project", {
    filterByFormula: `title = "${params.title}"`,
  });
  const profil = await Api("Profil", {
    filterByFormula: `id = 1`,
  });

  return {
    props: {
      project: project[0],
      logo: profil[0].logo[0],
    },
    revalidate: 60,
  };
};
