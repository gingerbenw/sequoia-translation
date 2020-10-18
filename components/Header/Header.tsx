/* eslint-disable react/prop-types */
import React from 'react';
import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';

interface HeaderProps {
  servicesTitle?: string;
  aboutTitle?: string;
  contactTitle?: string;
}

const formatLink = (link: string) => '#' + link;

export const Header: React.FC<HeaderProps> = ({ servicesTitle, aboutTitle, contactTitle }) => (
	<header className={styles.header}>
		<div className={styles.header_inner}>
			<h1 className={styles.title}>
				<InlineText name="title" />
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
		</div>
	</header>
);
