import React from 'react';
import { BlocksControls, InlineTextarea, InlineText } from 'react-tinacms-inline';

export function Section() {
	return (
		<div>
			<InlineText name="title" />
			<InlineTextarea name="text" />
		</div>
	);}

// 2. Define the block component with Hero
export const sectionBlock = {
	Component: ({ index }) => (
	  	<BlocksControls index={index} insetControls>
			<Section />
	  	</BlocksControls>
	),
	template: {
		label: 'Section',
		defaultItem: {
			title: 'Title',
			text: 'Dispassionate extraterrestrial observer',
		},
		fields: [],
	},
};