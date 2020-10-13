import React from 'react';
import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';

export const Header =  () => {
	return (
		<header className={styles.header}>
			<div className={styles.header_inner}>
				<h1 className={styles.title}>
					<InlineText name="title" />
				</h1>
			</div>
		</header>
	);
};
