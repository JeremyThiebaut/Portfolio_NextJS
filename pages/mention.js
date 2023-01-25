import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import styles from "../styles/Mention.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
const Airtable = require("airtable");
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

const Mention = ({ mention, slider }) => {
  return (
    <div className={styles.mention}>
      <Navbar />
      <Image
        src={slider[2].picture[0].thumbnails.full.url}
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

  const profil = await Api("Profil", { filterByFormula: `id = 1` });
  const slider = await Api("Carousel", {});

  return {
    props: {
      mention: profil[0].legalNotice,
      slider,
    },
    revalidate: 60,
  };
};
