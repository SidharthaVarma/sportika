// import React from "react";

// const Cards = () => {
//   return (
//     <div className="flex flex-col bg-customGreen h-96 w-72 rounded-xl overflow-hidden shadow-lg m-4">
//       <img
//         className="w-full h-40 object-cover"
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyfjweegWp-Myq2jFiZbc1xfAwqlTZe4pkg&s"
//         alt="Card Image"
//       />
//       <div className="p-4 flex flex-col justify-between flex-grow">
//         <h2 className="text-customWhite font-medium text-2xl mb-2">Happy Birthday</h2>
//         <p className="text-customWhite mb-4">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam aliquid adipisci modi obcaecati aliquam.
//         </p>
//         <button className="bg-customWhite text-customGreen w-full py-2 rounded-lg ">
//           Button
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cards;
"use client"
import React, { useEffect, useState } from 'react';

const Cards = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Error fetching events');
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {events.map((event) => (
        <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={event.picture} alt={event.title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600">{event.time}</p>
            <p className="text-gray-500">{event.venue}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
