import React from "react";

const Cards = () => {
  return (
    <div className="flex flex-col bg-customGreen h-96 w-72 rounded-xl overflow-hidden shadow-lg m-4">
      <img
        className="w-full h-40 object-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyfjweegWp-Myq2jFiZbc1xfAwqlTZe4pkg&s"
        alt="Card Image"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-customWhite font-medium text-2xl mb-2">Happy Birthday</h2>
        <p className="text-customWhite mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam aliquid adipisci modi obcaecati aliquam.
        </p>
        <button className="bg-customWhite text-customGreen w-full py-2 rounded-lg ">
          Button
        </button>
      </div>
    </div>
  );
};

export default Cards;
