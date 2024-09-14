import React, { useState } from 'react';

function Test() {
  const [responseMessage, setResponseMessage] = useState('');

  const callFastAPIPost = async () => {
    try {
      const response = await fetch('http://localhost:8000/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Test Item', description: 'Test Description' }),
      });
      const data = await response.json();
      console.log(data); // log response
      setResponseMessage(data.message); 
    } catch (error) {
      console.error('Error fetching from FastAPI:', error);
    }
  };

  return (
    <div>
      <h1>Test FastAPI POST Call</h1>
      <button onClick={callFastAPIPost}>Call FastAPI POST</button>
      {responseMessage && <p>Response from FastAPI: {responseMessage}</p>}
    </div>
  );
}

export default Test;
