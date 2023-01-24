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
  const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  const response = await base("Profil")
    .select({ filterByFormula: `id = 1` })
    .firstPage()
    .catch((e) => {
      console.log(e);
    });

  const profil = response.map((record) => {
    return {
      id: record.id,
      ...record.fields,
    };
  });

  const secondBase = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  const secondResponse = await secondBase("Carousel")
    .select({})
    .firstPage()
    .catch((e) => {
      console.log(e);
    });

  const slider = secondResponse.map((record) => {
    return {
      id: record.id,
      ...record.fields,
    };
  });

  return {
    props: {
      mention: profil[0].legalNotice,
      slider,
    },
  };
};
