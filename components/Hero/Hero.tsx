import React, { useEffect, useState } from 'react';
import { InlineTextarea } from 'react-tinacms-inline';
import styles from './Hero.module.scss';

export function Hero({ heroImage }) {
	const [state, setState] = useState('loading');

	useEffect(() => {
		if (heroImage) {}
	}, [heroImage]);

	return (
		<div className={styles.hero} style={{ backgroundImage: `linear-gradient(
			rgba(0, 0, 0, 0.521),
			rgba(0, 0, 0, 0.521)
		  ),
		  url("${heroImage}")` }}>
			<div className={styles.hero_text}> 
				<InlineTextarea name="text" />
			</div>
		</div>
	);
}
