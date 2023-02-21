import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import styles from "../styles/Mention.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Api from "../lib/getData";

const Mention = ({ siret, mention, slider, profil }) => {
  return (
    <div className={styles.mention}>
      <Navbar logo={profil.logo[0]} logoUrl={profil.logoUrl} />
      <Image
        src={slider[2].pictureUrl}
        alt={"picture background of mention"}
        width={slider[2].picture[0].width}
        height={slider[2].picture[0].height}
        priority
      />
      <div
        className={styles.mention__container}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(mention)),
        }}
      />
      <Footer siret={siret} />
    </div>
  );
};

export default Mention;

export const getStaticProps = async () => {
  const profil = await Api("Profil", { filterByFormula: `id = 1` });
  const slider = await Api("Carousel", {});

  return {
    props: {
      profil: profil[0],
      mention: profil[0].legalNotice,
      slider,
      siret: profil[0].siret,
    },
    revalidate: 1,
  };
};
