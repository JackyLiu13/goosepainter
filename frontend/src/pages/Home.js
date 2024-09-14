import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">
      {/* Falling Vine */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 vines"></div>

      {/* Welcome and Game Title */}
      <h1 className="m-0 text-2xl font-normal">Welcome to...</h1>
      <h2 className="my-4 text-4xl font-bold">Our Game!</h2>

      {/* Stone Bar with Buttons */}
      <div className="justify-center mx-auto">
        <Link
          to="/painter"
          className="mx-4 px-5 py-2 text-lg bg-black text-white rounded-lg shadow-md no-underline text-center hover:bg-gray-800"
        >
          Start
        </Link>
        <Link
          to="/join"
          className="mx-4 px-5 py-2 text-lg bg-black text-white rounded-lg shadow-md no-underline text-center hover:bg-gray-800"
        >
          Join
        </Link>
      </div>
    </div>
  );
};

export default Home;
