import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateLobby = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreateLobby = async (e) => {
    e.preventDefault();
    // Logic to create a lobby can be added here

    const code = await fetch(`http://127.0.0.1:8000/create?username=${name}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    });

    navigate('/lobby', { state: { playerName: name } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fbe5c8] font-sans relative">
      <h1 className="text-4xl font-bold mb-8">Create Lobby</h1>

      <form onSubmit={handleCreateLobby} className="w-full max-w-xs">
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
          Create Lobby
        </button>
      </form>
    </div>
  );
};

export default CreateLobby;
