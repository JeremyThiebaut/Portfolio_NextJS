import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Project.module.scss";

const Project = ({ project }) => {
  console.log(project[0].picture[0].thumbnails);
  return (
    <div className={styles.project} id="project">
      <p className={styles.project__title}>Galeries des projets</p>
      <div className={styles.project__container}>
        <div className={styles.project__projects}>
          {project.map((prod) => (
            <Link
              className={styles.project__project}
              key={prod.id}
              href={`/${prod.title}`}
            >
              <Image
                className={styles.project__picture}
                src={prod.picture[0].url}
                alt={`image du site ${prod.title}`}
                width={prod.picture[0].width}
                height={prod.picture[0].height}
                priority
              />
              <span className={styles.project__description}>{prod.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
