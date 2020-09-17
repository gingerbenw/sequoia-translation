import React from 'react';
import { InlineTextarea, BlocksControls, Block } from 'react-tinacms-inline';
import styles from './Hero.module.scss';

export function Hero() {
	return (
		<div className={styles.hero}>
			<div className={styles.hero_text}> 
				<InlineTextarea name="text" />
			</div>
		</div>
	);
}

export const heroBlock: Block = {
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
			text: 'Suspended in a Sunbeam',
		},
		fields: [],
	},
};
