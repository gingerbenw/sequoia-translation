import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import Head from 'next/head';
import React from 'react';
import { useGithubJsonForm } from 'react-tinacms-github';
import {
	InlineForm,
	InlineImage,
	InlineText,
	InlineTextarea,
} from 'react-tinacms-inline';
import { useCMS, usePlugin } from 'tinacms';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import styles from '../styles/Home.module.scss';
import * as yaml from 'js-yaml';

function toMarkdownString(formValues) {
	return (
		'---\n' +
      yaml.dump(formValues.frontmatter) +
      '---\n' +
      (formValues.markdownBody || '')
	);
}

export default function Home(props) {
	const cms = useCMS();

	const formOptions = {
		label: 'Home page',
		fields: [
			{ name: 'title', component: 'text' },
			{
				name: 'heroImage', 
				label: 'Hero image', 
				component: 'image',
				uploadDir: () => {
					return '/public/';
				},
				parse: filename => `../${filename}`,
				previewSrc: data => `/${data.heroImage}`,
			},
			{ name: 'Name label', component: 'text' },
			{ name: 'Email label', component: 'text' },
			{ name: 'Message label', component: 'text' },
			{ name: 'Submit label', component: 'text' },
			{ name: 'thanksMessage', component: 'text' },
		],
		onSubmit(data) {
			return cms.api.git.writeToDisk({
				fileRelativePath: props.fileRelativePath,
				content: toMarkdownString(data),
			}).then(() => {
				return cms.api.git.commit({
					files: [props.fileRelativePath],
					message: `Commit from Tina: Update ${data.fileRelativePath}`,
				});
			});
		},
	};

	// Registers a JSON Tina Form
	const [data, form] = useGithubJsonForm(props.file, formOptions);
	usePlugin(form);

	return (
		<div >
			<Head>
				<title>{data.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<InlineForm form={form} >
				<main className={styles.main}>
					<Header {...data} />
					<Hero {...data} />
	
					<section className={styles.about} id={data.servicesTitle}>

						<div className={styles.about_intro}>
							<h2>
								<InlineText name="servicesTitle" />
							</h2>
							<InlineTextarea name="servicesText" />
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
					</section>

					<div className={styles.image_break} />

					<section className={styles.about}  id={data.aboutTitle}>

						<div className={styles.about_intro}>
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
										<InlineText name="blockFourTitle" />
									</h3>
									<InlineTextarea name="blockFourText" />
								</div>
								<div className={styles.col}>
									<h3>
										<InlineText name="blockFiveTitle" />
									</h3>
									<InlineTextarea name="blockFiveText" />
								</div>
								<div className={styles.col}>
									<h3>
										<InlineText name="blockSixTitle" />
									</h3>
									<InlineTextarea name="blockSixText" />
								</div>
							</div>
						</div>
					</section>

					<div className={styles.image_break} />

					<section className={styles.about} id={data.contactTitle}>
						<div className={styles.about_intro}>
							<h2>
								<InlineText name="contactTitle" />
							</h2>
							<InlineTextarea name="contactText" />
						</div>

						<ContactForm />
					</section>

					{/* TODO: Get current date for copyright */}
					<footer className={styles.footer}>
						<span className={styles.footer_text}>
							&copy; 2020 {data.title}
						</span>
					</footer>

					<Footer />

				</main>
			</InlineForm>
		</div>
	);
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({
	preview,
	previewData,
	params,
}) {	
	if (preview) {
		return getGithubPreviewProps({
			...previewData,
			fileRelativePath: `content/home.${params.languageCode}.json`,
			parse: parseJson,
		});
	}

	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: `content/home.${params.languageCode}.json`,
				data: (await import(`../content/home.${params.languageCode}.json`)).default,
			},
		},
	};
};

export async function getStaticPaths() {
	return {
		fallback: true,
		paths: [
			{ params: { languageCode: 'en' } },
			{ params: { languageCode: 'jp' } }
		],
	};
}
  