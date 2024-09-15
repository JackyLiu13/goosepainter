import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Lobby = () => {
  const [players, setPlayers] = useState([]);
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const playerName = location.state?.playerName;

    const createNewGame = async () => {
        try {
            const result = await fetch(`http://localhost:8000/create?username=${playerName}`);
            return result;
        } catch (error) {
            console.error("Error creating new game:", error);
        }
    }

    // Define an async function within useEffect
    const initGame = async () => {
        if (playerName) {
            await createNewGame();
            setPlayers((prevPlayers) => [...prevPlayers, playerName]);
        }
    }

    // Call the async function
    initGame();

}, [location.state]);  // Dependencies


  const startGame = () => {
    navigate("/Painter");
  };

  return (
    <div className="h-screen bg-[#fbe5c8] p-4 font-comic-sans flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center bg-[#A67A5B] text-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl">
        WELCOME TO...
      </h1>
      <h2 className="my-4 text-5xl font-bold text-[#A67A5B] transform scale-x-110 scale-y-110 tracking-widest" style={{
        textShadow: `
          2px 2px 0 #D5B895,
          4px 4px 0 #D5B895,
          6px 6px 0 #D5B895,
          8px 8px 0 #D5B895,
          10px 10px 0 #D5B895
        `
      }}>
        Game Lobby
      </h2>
      <h3 className="mb-4 text-2xl">
        Game Code: <span className="font-bold">{gameCode}</span>
      </h3>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Players:</h4>
        <ul className="space-y-2">
          {players.map((player, index) => (
            <li key={index} className="bg-white px-4 py-2 rounded-lg shadow-md">
              {player}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={startGame}
        className="bg-black text-white px-5 py-2 text-lg rounded-lg shadow-md hover:bg-gray-800"
      >
        Start Game
      </button>
    </div>
  );
};

export default Lobby;
