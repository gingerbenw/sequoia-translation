import React from 'react';
import { InlineText } from 'react-tinacms-inline';
import { useCMS } from 'tinacms';

import styles from './Footer.module.scss';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
	const cms = useCMS();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<span className={styles.footer_text}>
          &copy; 2020 <InlineText name="title" />
				</span>
				<div>
					<button className={styles.button} onClick={() => cms.toggle()}>
						{cms.enabled ? 'Stop editing' : 'Edit this site'}
					</button>
				</div>
			</div>
		</footer>
	);
};
