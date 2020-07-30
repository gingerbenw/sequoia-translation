import React from 'react';
import { InlineTextarea, BlocksControls } from 'react-tinacms-inline'



export const Hero = () => {

    return (<div>
         <p> 
       <InlineTextarea name="headline" focusRing={false} />
      </p>
    </div>)
}

export default Hero

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
  }