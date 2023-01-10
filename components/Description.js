import styles from "../styles/Description.module.scss";
import Image from "next/image";

const Description = ({ profil }) => {
  const picture = profil.picture[0].url;
  return (
    <div className={styles.description}>
      <p className={styles.description__text}>{profil.description}</p>
      <Image
        className={styles.description__picture}
        src={picture}
        alt="Image de profil"
        width={500}
        height={500}
        priority
      />
    </div>
  );
};

export default Description;