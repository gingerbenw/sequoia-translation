/* eslint-disable react/prop-types */
import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import Head from 'next/head';
import React from 'react';
import { useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';
import { useCMS, usePlugin } from 'tinacms';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
// import Image from '../components/ImageBlock';
import { toMarkdownString } from '../lib/toMarkdownString';
import styles from '../styles/Home.module.scss';
import useFieldName from '../lib/useFieldName';

export default function Home(props) {
  const cms = useCMS();
  const { getFieldName } = useFieldName();

  const formOptions = {
    id: 'home',
    label: 'Home page',
    fields: [
      { name: 'title', label: 'Site Title', component: 'text' },
      {
        name: 'heroImage',
        label: 'Hero Image',
        component: 'image',
        uploadDir: () => '/public/',
        parse: (filename) => `../${filename}`,
        previewSrc: (data) => `/${data.heroImage}`
      },
      {
        name: getFieldName('nameLabel'),
        label: 'Contact Form Name Label',
        component: 'text'
      },
      {
        name: getFieldName('emailLabel'),
        label: 'Contact Form Email Label',
        component: 'text'
      },
      {
        name: getFieldName('messageLabel'),
        label: 'Contact Form Message Label',
        component: 'text'
      },
      {
        name: getFieldName('submitLabel'),
        label: 'Submit Button Label',
        component: 'text'
      },
      {
        name: getFieldName('thanksMessage'),
        label: 'Contact Form Thanks Message',
        component: 'text'
      },
      {
        name: 'davidPicture',
        label: 'David Picture',
        component: 'image',
        uploadDir: () => '/public/',
        parse: (filename) => `../${filename}`,
        previewSrc: (data) => `/${data.davidPicture}`
      },
      {
        name: 'misakoPicture',
        label: 'Misako Picture',
        component: 'image',
        uploadDir: () => '/public/',
        parse: (filename) => `../${filename}`,
        previewSrc: (data) => `/${data.misakoPicture}`
      },
      {
        name: 'image_block_1',
        label: 'Image Block 1',
        component: 'image',
        uploadDir: () => '/public/',
        parse: (filename) => `../${filename}`,
        previewSrc: (data) => `/${data.image_block_1}`
      },
      {
        name: 'image_block_2',
        label: 'Image Block 2',
        component: 'image',
        uploadDir: () => '/public/',
        parse: (filename) => `../${filename}`,
        previewSrc: (data) => `/${data.image_block_2}`
      }
    ],
    onSubmit(data) {
      return cms.api.git
        .writeToDisk({
          fileRelativePath: props.fileRelativePath,
          content: toMarkdownString(data)
        })
        .then(() => {
          return cms.api.git.commit({
            files: [props.fileRelativePath],
            message: `Commit from Tina: Update ${data.fileRelativePath}`
          });
        });
    }
  };

  // Registers a JSON Tina Form
  const [data, form] = useGithubJsonForm(props.file, formOptions);
  usePlugin(form);

  return (
    <div>
      <Head>
        <title>{data.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <InlineForm form={form}>
        <main className={styles.main}>
          <Header {...data} />
          <Hero {...data} />

          <section className={styles.about} id={getFieldName('servicesTitle')}>
            <div className={styles.about_intro}>
              <h2>
                <InlineText name={getFieldName('servicesTitle')} />
              </h2>
              <InlineTextarea name={getFieldName('servicesText')} />
            </div>

            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <h3>
                    <InlineText name={getFieldName('blockOneTitle')} />
                  </h3>
                  <InlineTextarea name={getFieldName('blockOneText')} />
                </div>
                <div className={styles.col}>
                  <h3>
                    <InlineText name={getFieldName('blockTwoTitle')} />
                  </h3>
                  <InlineTextarea name={getFieldName('blockTwoText')} />
                </div>
                <div className={styles.col}>
                  <h3>
                    <InlineText name={getFieldName('blockThreeTitle')} />
                  </h3>
                  <InlineTextarea name={getFieldName('blockThreeText')} />
                </div>
              </div>
            </div>
          </section>

          <div className={styles.image_break}>
            <img src={data.image_block_1} />
          </div>

          <section className={styles.about} id={getFieldName('aboutTitle')}>
            <div className={styles.about_intro}>
              <h2>
                <InlineText name={getFieldName('aboutTitle')} />
              </h2>
              <InlineTextarea name={getFieldName('aboutText')} />
            </div>

            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.bio}>
                    <img src={data.davidPicture} className={styles.portrait} />
                    <div>
                      <h3>
                        <InlineText name={getFieldName('blockFourTitle')} />
                      </h3>
                      <InlineTextarea name={getFieldName('blockFourText')} />
                    </div>
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.bio}>
                    <img src={data.misakoPicture} className={styles.portrait} />
                    <div>
                      <h3>
                        <InlineText name={getFieldName('blockFiveTitle')} />
                      </h3>
                      <InlineTextarea name={getFieldName('blockFiveText')} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.image_break}>
            <img src={data.image_block_2} />
          </div>

          <section className={styles.about} id={getFieldName('contactTitle')}>
            <div className={styles.about_intro}>
              <h2>
                <InlineText name={getFieldName('contactTitle')} />
              </h2>
              <InlineTextarea name={getFieldName('contactText')} />
            </div>

            <div className={styles.container}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </InlineForm>
    </div>
  );
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData
}) {
  if (preview) {
    return getGithubPreviewProps({
      // @ts-ignore:
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson
    });
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default
      }
    }
  };
};
