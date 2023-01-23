import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import styles from "../styles/Mention.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const Mention = ({ mention, slider }) => {
  console.log(marked(mention));
  return (
    <div className={styles.mention}>
      <Navbar />
      <Image
        src={slider[2].picture[0].url}
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
      <Footer />
    </div>
  );
};

export default Mention;

export const getStaticProps = async () => {
  const myProfil = await axios({
    method: "get",
    url: `/api/profil`,
    data: { id: 1 },
  });

  const sliders = await fetch(
    `/api/slider`
  );
  const { slider } = await sliders.json();
  return {
    props: {
      mention: myProfil.data.profil[0].legalNotice,
      slider,
    },
  };
};
