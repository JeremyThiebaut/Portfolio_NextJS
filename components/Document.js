import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Document.module.scss";

const Document = ({ document }) => {
  const converter = (size) => {
    if (size >= 1073741824) {
      return Math.rount((size / 1073741824) * 100) / 100 + " Go";
    } else if (size >= 1048576) {
      return Math.round((size / 1048576) * 100) / 100 + " Mo";
    } else if (size >= 1024) {
      return Math.round((size / 1024) * 100) / 100 + " Ko";
    } else {
      return size + " o";
    }
  };

  return (
    <div className={styles.document}>
      <h2 className={styles.document__title}>Mes documents</h2>
      <div className={styles.document__container}>
        {document.map((element) => (
          <Link
            target="_blank"
            key={element.id}
            href={element.link[0].url}
            className={styles.document__link}
          >
            <span>{element.description}</span>
            <hr />
            <Image
              className={styles.document__picture}
              src={element.picture[0].url}
              alt={`image du site ${element.title}`}
              width={500}
              height={500}
              priority
            />
            <hr />
            <span>{converter(element.link[0].size)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Document;
