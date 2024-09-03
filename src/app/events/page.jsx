import React from 'react';
import Cards from '../../components/Cards';

const Events = () => {
  return (
    <div className='bg-zinc-800 py-8 px-4 lg:px-12'>
      <h1 className='text-customWhite font-medium text-5xl text-center mb-8'>Events</h1>
      <div className="flex flex-wrap justify-center mt-8">
        <Cards />
      </div>
    </div>
  );
}

export default Events;
