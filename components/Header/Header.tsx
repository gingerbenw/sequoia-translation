import React from 'react';
import { useRouter } from 'next/router';

import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';

export const Header =  () => {
	const router = useRouter();

	const handleLanguageSelect = ({ target }) => {
		router.push(`/${target.value}`);
		localStorage.setItem('selectedLanguage', target.value);
	};

	return (
		<header className={styles.header}>
			<div className={styles.header_inner}>
				<h1 className={styles.title}>
					<InlineText name="title" />
				</h1>
				<nav className={styles.nav}>
					<ul>
						<li>Services</li>
						<li>About</li>
						<li>Contact</li>
					</ul>
					<select value={router.query.languageCode} onChange={handleLanguageSelect}>
						<option value="en">English</option>
						<option value="jp">Japanese</option>
					</select>
				</nav>
			</div>
		</header>
	);
};
