import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App-header text-center px-6 py-12 bg-blue-500 min-h-screen flex items-center justify-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Welcome to Baybe On The Go!</h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
        Baybe on the Go empowers families with young children to travel to the Bay Area with confidence and ease.
        Our smart interface integrates AI into itinerary planning, packing lists, and travel documentation to ensure a smooth journey tailored for your family's needs.
      </p>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-12">
        Simplify logistics, connect with essential resources, and explore baby-friendly destinations across the Bay Area. With Baybe on the Go, every trip becomes stress-free, memorable, and filled with joy.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md text-lg"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded shadow-md text-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
