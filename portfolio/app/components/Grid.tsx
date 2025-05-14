
// Make sure this is the exact filename and path
import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/Bentogrid'; // Ensure this path is correct
import { gridItems } from '@/data';

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid>
        {gridItems.map(({id,title,description,className,img,imgClassName,titleClassName,spareImg}) => (
          <BentoGridItem
            key={id}
            id={id}
            title={title}
            description={description}
            className={className}
            img= {img}
            imgClassName={imgClassName}
            titleClassName={titleClassName}
            spareImg={spareImg}

         
            />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
