import Head from "next/head";
import styles from "../styles/Home.module.css";

import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";

import {
  InlineForm,
  InlineTextField,
  InlineBlocks,
} from "react-tinacms-inline";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";
import { heroBlock } from "../components/Hero";

import { imagesBlock } from "../components/Images";
import { paragraphBlock } from "../components/Paragraph";

export default function Home({ file }) {
  const formOptions = {
    label: "Home Page",
    fields: [{ name: "title", component: "text" }],
  };

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <InlineForm form={form}>
          <h1 className={styles.title}>
            <InlineTextField name="title" />
          </h1>

          <InlineBlocks name="blocks" blocks={HOME_BLOCKS} />
        </InlineForm>
      </main>

      <footer className={styles.footer}>
        <a
          // href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

const HOME_BLOCKS = { heroBlock, imagesBlock, paragraphBlock };

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
    },
  };
};
