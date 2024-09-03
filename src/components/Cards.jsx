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
    <div
      key={event.id}
      className="relative bg-customGreen h-96 w-72 rounded-xl overflow-hidden shadow-lg m-4 group"
    >
      {/* Event Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={event.picture} 
        alt={event.title} 
      />
      
      {/* Text Content */}
      <div className="absolute inset-0 bg-customGreen bg-opacity-90 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <h2 className="text-customWhite font-medium text-2xl mb-2">
          {event.title}
        </h2>
        <h2 className="text-customWhite font-medium text-xl mb-2">
          Date: {new Date(event.date).toLocaleDateString()}
        </h2>
        <h2 className="text-customWhite font-medium text-xl mb-2">
          Time: {event.time}
        </h2>
        <h2 className="text-customWhite font-medium text-xl mb-2">
          Venue: {event.venue}
        </h2>
        <button className="bg-customWhite text-customGreen w-full py-2 rounded-lg">
          Register
        </button>
      </div>
    </div>
  ))}
</div>
  );
};

export default Cards;
