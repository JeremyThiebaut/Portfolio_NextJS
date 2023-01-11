import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Project.module.scss";

const Project = ({ project }) => {
  console.log(project[0].picture[0].url);
  return (
    <div className={styles.project}>
      <p className={styles.project__title}>Galeries des projets</p>
      <div className={styles.project__projects}>
        {project.map((prod) => (
          <Link key={prod.id} href={`/${prod.title}`}>
            <div>
              <Image
              className={styles.project__picture}
                src={prod.picture[0].url}
                alt={`image du site ${prod.title}`}
                width={500}
                height={500}
                priority
              />
              <span>{prod.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Project;
