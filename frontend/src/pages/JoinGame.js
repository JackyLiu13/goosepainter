import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we're not validating the code
    navigate('/lobby', { state: { playerName: name } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">
      {/* Falling Vine */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 vines"></div>

      <h1 className="text-4xl font-bold mb-8">Join Game</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter game code"
          className="w-full px-4 py-2 mb-4 text-lg rounded-lg shadow-md"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 mb-6 text-lg rounded-lg shadow-md"
          required
        />
        <button 
          type="submit"
          className="w-full px-5 py-2 text-lg bg-black text-white rounded-lg shadow-md hover:bg-gray-800"
        >
          Join Lobby
        </button>
      </form>
    </div>
  );
};

export default JoinGame;
