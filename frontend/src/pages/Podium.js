import React from 'react';
import { useNavigate } from 'react-router-dom';

const Podium = () => {
  const navigate = useNavigate();
  const winners = [
    { name: 'Player 2', position: 2 },
    { name: 'Player 1', position: 1 },
    { name: 'Player 3', position: 3 },
  ];

  const goToResults = () => {
    navigate('/results');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">
      {/* Falling Vine */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 vines"></div>

      {/* Home Button */}
      <button 
        onClick={goToHome}
        className="absolute top-4 left-4 px-4 py-2 text-sm bg-black text-white rounded-lg shadow-md hover:bg-gray-800"
      >
        Home
      </button>

      <h1 className="text-4xl font-bold mb-8">Winners</h1>

      <div className="flex items-end justify-center mb-12">
        {winners.map((winner) => (
          <div 
            key={winner.position} 
            className={`flex flex-col items-center mx-4 ${
              winner.position === 1 ? 'order-2' : 
              winner.position === 2 ? 'order-1' : 'order-3'
            }`}
          >
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4 border-4 border-yellow-400">
              <span className="text-4xl font-bold">{winner.position}</span>
            </div>
            <div 
              className={`w-32 ${
                winner.position === 1 ? 'h-40 bg-yellow-400' : 
                winner.position === 2 ? 'h-32 bg-gray-300' : 'h-24 bg-orange-400'
              } flex items-center justify-center rounded-t-lg`}
            >
              <span className="text-white text-xl font-bold">{winner.name}</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={goToResults}
        className="mx-4 px-5 py-2 text-lg bg-black text-white rounded-lg shadow-md hover:bg-gray-800"
      >
        See Full Results
      </button>
    </div>
  );
};

export default Podium;