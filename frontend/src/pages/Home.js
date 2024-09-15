import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">

      {/* Welcome and Game Title */}
      <h1 className="m-0 text-[20rem] font-semibold leading-none transform scale-y-110 text-[#D5B895]">GOOSE</h1>
      <h2 className="my-4 text-4xl font-bold text-[#D5B895]">PAINTER</h2>

      {/* Stone Bar with Buttons */}
      <div className="justify-center mx-auto">
        <Link
          to="/Lobby"
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