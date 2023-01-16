import axios from "axios";
import DOMPurify from "dompurify";
import { marked } from "marked";
import styles from "../styles/Mention.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

const Mention = ({ mention, slider }) => {
  return (
    <>
      <div className={styles.mention}>
        <Navbar />
        <Image
          src={slider[2].picture[0].url}
          alt={"picture background of mention"}
          width={slider[2].picture[0].width}
          height={slider[2].picture[0].height}
          priority
        />
        <div className={styles.mention__container}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(marked(mention)),
            }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Mention;

export const getStaticProps = async () => {
  const myProfil = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/profil`,
    data: { id: 1 },
  });

  const sliders = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/slider`
  );
  const { slider } = await sliders.json();
  return {
    props: {
      mention: myProfil.data.profil[0].legalNotice,
      slider,
    },
  };
};
