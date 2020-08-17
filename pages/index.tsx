import Head from "next/head";
import styles from "../styles/Home.module.css";
import { MarkdownFieldPlugin } from "react-tinacms-editor";
import { usePlugins } from "tinacms";
import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";

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
    ],
  };

  usePlugins([MarkdownFieldPlugin]);

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);

  return (
    <div >
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <InlineForm form={form}>
          {/* TODO: Convert to header component */}
          <header>
            <h1 className={styles.title}>
              <InlineText name="title" />
            </h1>
            <div />
          </header>

          {/* TODO: Convert to hero component */}
          <div className={styles.hero}>
            <InlineTextarea name="hero" />
          </div>

          <div className={styles.about}>
            <h2>
              <InlineText name="aboutTitle" />
            </h2>
            <InlineTextarea name="aboutText" />
          </div>

          {/* TODO: Convert to BLOCKS */}
          <div className={styles.container}>

          <div className={styles.row}>
            <div className={styles.col}>
              <h3>
                <InlineText name="blockOneTitle" />
              </h3>
              <InlineTextarea name="blockOneText" />
            </div>
            <div className={styles.col}>
              <h3>
                <InlineText name="blockTwoTitle" />
              </h3>
              <InlineTextarea name="blockTwoText" />
            </div>
            <div className={styles.col}>
              <h3>
                <InlineText name="blockThreeTitle" />
              </h3>
              <InlineTextarea name="blockThreeText" />
            </div>
          </div>
          </div>

        </InlineForm>
      </main>
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
