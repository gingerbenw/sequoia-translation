/* eslint-disable react/prop-types */
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import Head from 'next/head';
import React from 'react';
import { useGithubJsonForm } from 'react-tinacms-github';
import {
	InlineForm,
	InlineText,
	InlineTextarea
} from 'react-tinacms-inline';
import { useCMS, usePlugin } from 'tinacms';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { toMarkdownString } from '../lib/toMarkdownString';
import styles from '../styles/Home.module.scss';

const language = 'en';

export default function Home (props) {
	const cms = useCMS();

	const formOptions = {
		label: 'Home page',
		fields: [
			{ name: 'title', component: 'text' },
			{
				name: 'heroImage',
				label: 'Hero image',
				component: 'image',
				uploadDir: () => '/public/',
				parse: filename => `../${filename}`,
				previewSrc: data => `/${data.heroImage}`
			},
			{ name: 'Name label', component: 'text' },
			{ name: 'Email label', component: 'text' },
			{ name: 'Message label', component: 'text' },
			{ name: 'Submit label', component: 'text' },
			{ name: 'thanksMessage', component: 'text' }
		],
		onSubmit (data) {
			return cms.api.git.writeToDisk({
				fileRelativePath: props.fileRelativePath,
				content: toMarkdownString(data)
			}).then(() => {
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

					<section className={styles.about} id={data.aboutTitle}>

						<div className={styles.about_intro}>
							<h2>
								<InlineText name="aboutTitle" />
							</h2>
							<InlineTextarea name="aboutText" />
						</div>

						<div className={styles.container}>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.bio}>
										<img src="misako.jpg" className={styles.portrait} />
										<div>
											<h3>
												<InlineText name="blockFourTitle" />
											</h3>
											<InlineTextarea name="blockFourText" />
										</div>
									</div>
								</div>
								<div className={styles.col}>
									<div className={styles.bio}>
										<img src="misako.jpg" className={styles.portrait} />
										<div>
											<h3>
												<InlineText name="blockFiveTitle" />
											</h3>
											<InlineTextarea name="blockFiveText" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className={styles.about} id={data.contactTitle}>
						<div className={styles.about_intro}>
							<h2>
								<InlineText name="contactTitle" />
							</h2>
							<InlineTextarea name="contactText" />
						</div>

						<ContactForm />
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
export const getStaticProps = async function ({
	preview,
	previewData
}) {
	if (preview) {
		return getGithubPreviewProps({
			...previewData,
			fileRelativePath: `content/home.${language}.json`,
			parse: parseJson
		});
	}
	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: `content/home.${language}.json`,
				data: (await import(`../content/home.${language}.json`)).default
			}
		}
	};
};
