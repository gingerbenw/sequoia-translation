import Head from "next/head";
import styles from "../styles/Home.module.css";
import { MarkdownFieldPlugin, InlineWysiwyg } from "react-tinacms-editor";
import { usePlugins } from "tinacms";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";
import ReactMarkdown from 'react-markdown'

import {
  InlineText,
  InlineForm,
  InlineTextarea,
} from "react-tinacms-inline";
import { usePlugin } from "tinacms";
import { useGithubJsonForm } from "react-tinacms-github";

export default function Home({ file }) {
  const formOptions = {
    label: "Home Page",
    fields: [
      { name: "title", component: "text" },
      { name: "hero", component: "textarea" },
      { name: "about", component: "textarea" },
      {
        name: "markdownContent",
        label: "content",
        component: "markdown",
      },
    ],
  };

  usePlugins([MarkdownFieldPlugin]);

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
          <header>
            <h1 className={styles.title}>
              <InlineText name="title" />
            </h1>
            <div />
          </header>

          <div className={styles.hero}>
            <InlineTextarea name="hero" />
          </div>

          <div>
            <h2>Services</h2>
            <InlineTextarea name="about" />
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <InlineWysiwyg name="content" >
                <ReactMarkdown source={data.content} />
              </InlineWysiwyg>
            </div>
            <div className={styles.col}>
              <h3>Translation</h3>
              <InlineTextarea name="translation" />
            </div>
            <div className={styles.col}>
              <h3>Proofreading</h3>
              <InlineTextarea name="proofreading" />
            </div>
          </div>
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
