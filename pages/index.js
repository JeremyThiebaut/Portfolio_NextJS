import Head from "next/head";
import "../styles/Home.module.scss";
import Description from "../components/Description";
import Project from "../components/Project";
import Document from "../components/Document";
import Footer from "../components/Footer";
import Slider from "../components/Slider";
import Navbar from "../components/Navbar";
import Api from "../lib/getData";

export default function Home({ profil, project, document, slider }) {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Bienvenue sur le site de JTDev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider slider={slider} profil={profil} />
      <Navbar logo={profil.logo[0]} logoUrl={profil.logoUrl} />
      <Description profil={profil} />
      <Project project={project} />
      <Document document={document} />
      <Footer siret={profil.siret} />
    </>
  );
}

export const getStaticProps = async () => {
  const profil = await Api("Profil", { filterByFormula: `id = 1` });
  const project = await Api("Project", {});
  const document = await Api("Document", {});
  const slider = await Api("Carousel", {});
  return {
    props: {
      profil: profil[0],
      project,
      document,
      slider,
    },
    revalidate: 1,
  };
};
