import { GetStaticProps } from 'next';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import Head from 'next/head';
import React from 'react';
import { useGithubJsonForm, useGithubToolbarPlugins } from 'react-tinacms-github';
import {
	InlineBlocks,
	InlineForm,
	InlineText,
	InlineTextarea,
} from 'react-tinacms-inline';
import { usePlugin } from 'tinacms';
import ContactForm from '../components/ContactForm';
import Header from '../components/Header';
import Hero from '../components/Hero';
import { sectionBlock } from '../components/Section';
import styles from '../styles/Home.module.scss';

const PAGE_BLOCKS = {
	section: sectionBlock
};

export default function Home({ file }) {
	const formOptions = {
		label: 'Home page',
		fields: [
			{ name: 'title', component: 'text' },
			{ name: 'thanksMessage', component: 'text' },
		],
	};

	// Registers a JSON Tina Form
	const [data, form] = useGithubJsonForm(file, formOptions);
	usePlugin(form);

	return (
		<div >
			<Head>
				<title>{data.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<InlineForm form={form} >
				<main className={styles.main}>
					<Header />
					<Hero />

					<InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
	
					<section className={styles.about}>

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

					<section className={styles.about}>

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

					<section className={styles.about}>
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
	previewData,
}) {
	if (preview) {
		return getGithubPreviewProps({
			...previewData,
			fileRelativePath: 'content/home.json',
			parse: parseJson,
		});
	}
	return {
		props: {
			sourceProvider: null,
			error: null,
			preview: false,
			file: {
				fileRelativePath: 'content/home.json',
				data: (await import('../content/home.json')).default,
			},
		},
	};
};
