import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const getRandomPastelColor = () => {
  // Generate a hue between 0 and 60 degrees (red to yellow)
  const hue = Math.floor(Math.random() * 61);
  const saturation = Math.floor(Math.random() * 20) + 60; // 60-80%
  const lightness = Math.floor(Math.random() * 10) + 80; // 80-90%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const RainDrop = () => {
  const color = getRandomPastelColor();
  return (
    <div className="rain" style={{ "--color": color }}>
      <div className="drop"></div>
      <div className="waves">
        <div></div>
        <div></div>
      </div>
      <div className="splash"></div>
      <div className="particles">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <div className="corner-gif">
        <iframe 
          src="https://giphy.com/embed/MYGJojUlVsjNgo76Fi" 
          width="150" 
          height="150" 
          frameBorder="0" 
          className="giphy-embed" 
          allowFullScreen
          title="Corner GIF"
        ></iframe>
      </div>
      <div className="rain-container">
        {[...Array(9)].map((_, index) => (
          <RainDrop key={index} />
        ))}
      </div>
      <div className="content-container">
        <h1 className="title">
          G<span className="dark-brown-o">OO</span>SE
        </h1>
        <h2 className="subtitle">PAINTER</h2>
        <div className="button-container">
          <Link to="/create" className="start-button"> {/* Updated to link to CreateLobby */}
            Start
          </Link>
          <Link to="/join" className="join-button">
            Join
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
