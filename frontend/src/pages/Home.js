import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">

      {/* Welcome and Game Title */}
      <h1 className="m-0 text-[20rem] font-semibold leading-none transform scale-y-110 text-[#D5B895] mt-[-20rem]">
        G<span className="dark-brown-o">OO</span>SE
      </h1>
      <h2 className="my-4 font-semibold text-4xl text-[#000] tracking-[.5em]">PAINTER</h2>

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

      {/* Inline CSS */}
      <style jsx>{`
        .dark-brown-o {
          color: #A67A5B; /* Darker hex brown color */
        }
      `}</style>
    </div>
  );
};

export default Home;