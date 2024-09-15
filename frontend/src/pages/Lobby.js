import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Lobby = () => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setGameCode('ABC123');
    const playerName = location.state?.playerName;
    if (playerName) {
      setPlayers(prevPlayers => [...prevPlayers, playerName]);
    }
  }, [location.state]);

  const startGame = () => {
    navigate('/Painter');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">
      {/* Falling Vine */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 vines"></div>

      {/* Lobby Title */}
      <h1 className="m-0 text-2xl font-normal">Welcome to...</h1>
      <h2 className="my-4 text-4xl font-bold">Game Lobby</h2>

      {/* Game Code */}
      <h3 className="mb-4 text-2xl">
        Game Code: <span className="font-bold">{gameCode}</span>
      </h3>

      {/* Players List */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Players:</h4>
        <ul className="space-y-2">
          {players.map((player, index) => (
            <li key={index} className="bg-white px-4 py-2 rounded-lg shadow-md">{player}</li>
          ))}
        </ul>
      </div>

      {/* Start Game Button */}
      <button 
        onClick={startGame}
        className="mx-4 px-5 py-2 text-lg bg-black text-white rounded-lg shadow-md hover:bg-gray-800"
      >
        Start Game
      </button>
    </div>
  );
};

export default Lobby;
