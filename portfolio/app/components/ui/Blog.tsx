import React from 'react';
import { Blogs } from '@/data'; // Ensure this path is correct
import { InfiniteMovingCards } from './InfiniteCards';

const Blog = () => {
  return (
    <div className='py-20' id="Blog"> {/* Changed id to "blog" */}
      <h1 className='heading'>
        Recent Blog
        <span className='text-purple text-center'> Checking</span>
      </h1>
      <div className='flex flex-col items-center justify-center p-4 gap-x-24 gap-y-8 mt-10'>
        <div className='h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center relative overflow-hidden'>
          <InfiniteMovingCards
            items={Blogs}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;

