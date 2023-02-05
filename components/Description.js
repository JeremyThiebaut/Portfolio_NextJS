import styles from "../styles/Description.module.scss";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const Description = ({ profil }) => {
  return (
    <div className={styles.description} id="description">
      <div
        className={styles.description__text}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(profil.description)),
        }}
      />
      <Image
        className={styles.description__picture}
        src={profil.pictureUrl}
        alt="Image de profil"
        width={500}
        height={500}
        priority
      />
    </div>
  );
};

export default Description;
