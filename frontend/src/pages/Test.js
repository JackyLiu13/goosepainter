import React, { useState } from 'react';

function Test() {
  const [responseMessage, setResponseMessage] = useState('');

  const evaluateStory = async () => { 
    try {
      const response = await fetch('http://localhost:8000/evaluate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme: 'A journey through a magical forest.',
          generated_story: 'A young adventurer sets out into the forest, encountering creatures that only exist in her wildest dreams.Trees that speak in riddles guide her to a hidden lake, where the water glows under the moonlight, revealing a forgotten path to a new realm.'  
        }),
      });

      const data = await response.json();
      console.log('Full Response:', data); // Log the entire response to check the structure

      // Adjust this according to the logged response structure
      setResponseMessage(data.evaluation?.text || 'No text available'); 
    } catch (error) {
      console.error('Error fetching from FastAPI:', error);
    }
  };

  return (
    <div>
      <h1>Test FastAPI POST Call</h1>
      <button onClick={evaluateStory}>Evaluate Story</button>
      {responseMessage && <p>Response from FastAPI: {responseMessage}</p>}
    </div>
  );
}

export default Test;
