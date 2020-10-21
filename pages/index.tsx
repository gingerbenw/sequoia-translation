/* eslint-disable react/prop-types */
import { useI18n } from '@tinalabs/react-tinacms-i18n';
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
import { toMarkdownString } from '../lib/toMarkdownString';
import styles from '../styles/Home.module.scss';

export default function Home(props) {
	const cms = useCMS();
	const i18n = useI18n();

	const selectedLocale = i18n.getFormateLocale();
	const getFieldTitle = (name) => `${selectedLocale}.${name}`;

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
				previewSrc: (data) => `/${data.heroImage}`,
			},
			{
				name: getFieldTitle('nameLabel'),
				label: 'Contact Form Name Label',
				component: 'text',
			},
			{
				name: getFieldTitle('emailLabel'),
				label: 'Contact Form Email Label',
				component: 'text',
			},
			{
				name: getFieldTitle('messageLabel'),
				label: 'Contact Form Message Label',
				component: 'text',
			},
			{
				name: getFieldTitle('submitLabel'),
				label: 'Submit Button Label',
				component: 'text',
			},
			{
				name: getFieldTitle('thanksMessage'),
				label: 'Contact Form Thanks Message',
				component: 'text',
			},
		],
		onSubmit(data) {
			return cms.api.git
				.writeToDisk({
					fileRelativePath: props.fileRelativePath,
					content: toMarkdownString(data),
				})
				.then(() => {
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
		<div>
			<Head>
				<title>{data.title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<InlineForm form={form}>
				<main className={styles.main}>
					<Header {...data} />
					<Hero {...data} />

					<section className={styles.about}>
						<div className={styles.about_intro}>
							<h2>
								<InlineText name={getFieldTitle('servicesTitle')} />
							</h2>
							<InlineTextarea name={getFieldTitle('servicesText')} />
						</div>

						<div className={styles.container}>
							<div className={styles.row}>
								<div className={styles.col}>
									<h3>
										<InlineText name={getFieldTitle('blockOneTitle')} />
									</h3>
									<InlineTextarea name={getFieldTitle('blockOneText')} />
								</div>
								<div className={styles.col}>
									<h3>
										<InlineText name={getFieldTitle('blockTwoTitle')} />
									</h3>
									<InlineTextarea name={getFieldTitle('blockTwoText')} />
								</div>
								<div className={styles.col}>
									<h3>
										<InlineText name={getFieldTitle('blockThreeTitle')} />
									</h3>
									<InlineTextarea name={getFieldTitle('blockThreeText')} />
								</div>
							</div>
						</div>
					</section>

					<section className={styles.about}>
						<div className={styles.about_intro}>
							<h2>
								<InlineText name={getFieldTitle('aboutTitle')} />
							</h2>
							<InlineTextarea name={getFieldTitle('aboutText')} />
						</div>

						<div className={styles.container}>
							<div className={styles.row}>
								<div className={styles.col}>
									<div className={styles.bio}>
										<img src={data.davidPicture} className={styles.portrait} />
										<div>
											<h3>
												<InlineText name={getFieldTitle('blockFourTitle')} />
											</h3>
											<InlineTextarea name={getFieldTitle('blockFourText')} />
										</div>
									</div>
								</div>
								<div className={styles.col}>
									<div className={styles.bio}>
										<img src={data.misakoPicture} className={styles.portrait} />

										<div>
											<h3>
												<InlineText name={getFieldTitle('blockFiveTitle')} />
											</h3>
											<InlineTextarea name={getFieldTitle('blockFiveText')} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className={styles.about}>
						<div className={styles.about_intro}>
							<h2>
								<InlineText name={getFieldTitle('contactTitle')} />
							</h2>
							<InlineTextarea name={getFieldTitle('contactText')} />
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
