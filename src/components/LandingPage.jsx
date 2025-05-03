import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/map.jpg";
const LandingPage = () => {
  return (
    <header className="w-full h-full flex flex-col md:flex-row justify-center gap-6 pt-24 bg-green-200 text-white">
      <section className="flex-1 px-8 text-center md:text-left md:px-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-light text-black">
          Explore the World of Countries
        </h1>

        <p className="py-6 leading-relaxed text-black">
          Discover facts, flags, and features of every country around the globe. Dive into geography, culture, and more — all in one place!
        </p>

        <div className="flex justify-center md:justify-start gap-4">
          <Link to="/login">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 focus:bg-gray-800 transition">
              Explore Now
            </button>
          </Link>
          <Link to="/register">
            <button className="border border-white text-black px-6 py-2 rounded hover:text-gray-800 hover:border-gray-800 focus:text-gray-800 focus:border-gray-800 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <div className="flex-1 md:flex-2 self-center md:self-end px-4">
        <img
          src={Image}
          alt="Explore Countries"
          className="w-full h-96 object-cover  -mb-4 pb-10"
        />
      </div>
    </header>
  );
};

export default LandingPage;
