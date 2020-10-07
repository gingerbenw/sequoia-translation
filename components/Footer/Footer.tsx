import React from 'react';
import { InlineText } from 'react-tinacms-inline';

import styles from './Footer.module.scss';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props) => {
	return (
		<footer className={styles.footer}>
			<span className={styles.footer_text}>
				&copy; 2020 <InlineText name="title" />
			</span>
		</footer>
	);
};