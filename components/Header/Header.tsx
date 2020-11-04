/* eslint-disable react/prop-types */
import React from 'react';
import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';
import { useI18n } from '@tinalabs/react-tinacms-i18n';

import languages from '../../lib/languages.json';
import useFieldName from '../../utils/useFieldName';

interface HeaderProps {
  servicesTitle?: string;
  aboutTitle?: string;
  contactTitle?: string;
}

const formatLink = (link: string) => '#' + link;

export const Header: React.FC<HeaderProps> = () => {
	const { getFieldName } = useFieldName();

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
						<a href={formatLink(getFieldName('servicesTitle'))}>
							<li><InlineText name={getFieldName('servicesTitle')} /></li>
						</a>
						<a href={formatLink(getFieldName('aboutTitle'))}>
							<li><InlineText name={getFieldName('aboutTitle')} /></li>
						</a>
						<a href={formatLink(getFieldName('contactTitle'))}>
							<li><InlineText name={getFieldName('contactTitle')} /></li>

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
