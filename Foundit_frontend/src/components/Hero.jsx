import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/HeroImage.png';

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <div className='flex flex-col items-center md:flex-row justify-center min-h-screen mt-20 bg-blue-100 md:gap-50 md:-mt-3.5'>
        <div className='flex flex-col items-center md:items-start'>
          {/* tag line */}
          <div className="text-6xl md:text-7xl font-bold text-center md:text-left font-sans text-blue-800">You want it? </div>
          <div className="text-3xl font-bold text-center md:text-left md:ml-1 mb-4 font-sans mt-1">We Foundit</div>
          <div className='text-center text-lg leading-tight md:text-left md:ml-1'>
            Your personal AI shopping assistant that curates the best products <span className="hidden md:inline"><br />tailored to your taste and budget.</span>
          </div>

          {/* search space */}
          <div className="w-full max-w-md p-10 md:px-0 py-6 ">
            <input
              type="text"
              placeholder="What do you want to buy?"
              className="pl-4 w-full p-4 border rounded-3xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className='flex gap-6'>
            <button
              className='text-black font-bold hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-6 py-3 text-center border-blue-700 border-3 dark:focus:ring-blue-800'
            >
              Learn More
            </button>

            <button
              onClick={handleSearch}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Try it Now
            </button>
          </div>
        </div>

        {/* image */}
        <div className="mt-10 md:-mt-1">
          <img src={logo} alt="Search visual" className="w-60 h-auto md:w-70" />
        </div>
      </div>
    </>
  );
};

export default Hero;
