import React from 'react';
import Head from 'next/head';

interface Props {
  description: string;
  title: string;
}

export const Seo: React.FC<Props> = ({ description, title }) => {
	const siteTitle = 'Sequoia Translation';

	return (
		<Head>
			<title>{`${title} | ${siteTitle}`}</title>
			<meta name="description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={siteTitle} />
			<meta property="twitter:card" content="summary" />
			{/* <meta property="twitter:creator" content={config.social.twitter} /> */}
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
		</Head>
	);
};
