import React from 'react'
import logo from '../assets/HeroImage.png';

const Hero = () => {
  return (
    <>
<div className='flex flex-col items-center justify-center min-h-screen mt-20 bg-blue-100'>
  {/* tag line */}
  <div className="text-6xl font-bold text-center  font-sans text-blue-800 ">You want it? </div>
  <div className="text-3xl font-bold text-center mb-4 font-sans mt-1">We Foundit</div>
  <div className='text-center text-lg leading-tight'>Your personal AI shopping assistant that curates the best products tailored to your taste and budget.</div>

  {/* search space */}
  <div className="w-full max-w-md p-10 ">
    <input
      type="text"
      placeholder="what do you want to buy"
      className="pl-4 w-full p-4 border rounded-3xl"
    />

  </div>
  <div className='flex gap-6'>
          <button className='text-black font-bold hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-6 py-3 text-center border-blue-700 border-3 dark:focus:ring-blue-800'>Learn More</button>

      <button className='text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Try it Now</button>
  </div>


  {/* image */}
  <div className="mt-10">
    <img src={logo} alt="Search visual" className="w-60 h-auto" />
  </div>
</div>
    </>
  )
}

export default Hero