import Head from "next/head";
import { Inter } from "@next/font/google";
import "../styles/Home.module.scss";
import Description from "../components/Description";
import axios from "axios";
import Project from "../components/Project";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ profil, project }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Description profil={profil} />
      <Project project={project} />
    </>
  );
}

export const getStaticProps = async () => {
  const myProfil = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/profil`,
    data: { id: 1 },
  });

  const myProject = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/project`,
  });

  return {
    props: {
      profil: myProfil.data.profil[0],
      project: myProject.data.project,
    },
  };
};
