import styles from "../styles/Description.module.scss";
import Image from "next/image";

const Description = ({ profil }) => {
  const picture = profil.picture[0].url;
  return (
    <>
      <div className={styles.description}>
        <p>{profil.description}</p>
      </div>
      <Image
        src={picture}
        alt="Image de profil"
        width={500}
        height={500}
        priority
      />
    </>
  );
};

export default Description;
