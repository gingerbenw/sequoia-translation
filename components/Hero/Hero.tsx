import React from 'react';
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline';
import styles from './Hero.module.scss';

export const Hero =  () => {
	return (
		<div className={styles.hero}>
			<div className={styles.hero_text}> 
				<InlineTextarea name="hero" />
			</div>
		</div>
	);
};

// 2. Define the block component with Hero
export const heroBlock = {
	Component: ({ index }) => (
		<BlocksControls index={index}
			focusRing={{ offset: 0 }}
			insetControls
		>
			<Hero />
		</BlocksControls>
	),
	template: {
		label: 'Hero',
		defaultItem: {
			headline: 'Suspended in a Sunbeam',
		},
		fields: [],
	},
};