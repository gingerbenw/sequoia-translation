/* eslint-disable react/prop-types */
import React from 'react';
import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';
import { useI18n } from '@tinalabs/react-tinacms-i18n';

import languages from '../../lib/languages.json';

interface HeaderProps {
  servicesTitle?: string;
  aboutTitle?: string;
  contactTitle?: string;
}

const formatLink = (link: string) => '#' + link;

export const Header: React.FC<HeaderProps> = ({
	servicesTitle,
	aboutTitle,
	contactTitle,
}) => {
	const i18n = useI18n();

	const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedLocale = languages.find(({ language }) => language === event.target.value);
		i18n.setLocale(selectedLocale);
	};

	const currentLocale = i18n.getLocale();

	return (
		<header className={styles.header}>
			<div className={styles.header_inner}>
				<h1 className={styles.title}>
					<InlineText name={'title'} />
				</h1>
				<nav className={styles.nav}>
					<ul className={styles.menu}>
						<a href={formatLink(servicesTitle)}>
							<li>{servicesTitle}</li>
						</a>
						<a href={formatLink(aboutTitle)}>
							<li>{aboutTitle}</li>
						</a>
						<a href={formatLink(contactTitle)}>
							<li>{contactTitle}</li>
						</a>
					</ul>
				</nav>
				<select value={currentLocale.language} onChange={changeLocale}>
					{languages.map(({ language, label }) => <option key={language} value={language} label={label} />)}
				</select>
			</div>
		</header>
	);
};
