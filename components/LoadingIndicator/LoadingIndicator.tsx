import React from 'react';
import styles from './LoadingIndicator.module.scss';

export const LoadingIndicator = () => (

	<div className={styles.container}>
		<div className={`${styles.dot} ${styles.dot1}`} />
		<div className={`${styles.dot} ${styles.dot2}`} />
		<div className={`${styles.dot} ${styles.dot3}`} />
	</div>
);
