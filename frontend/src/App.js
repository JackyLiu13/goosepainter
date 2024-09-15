import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Painter from "./pages/Painter";
import Test from "./pages/Test";
import JoinGame from "./pages/JoinGame";
import Lobby from "./pages/Lobby";
import Podium from "./pages/Podium";
import Results from "./pages/Results";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/painter" element={<Painter />} />
        <Route path="/test" element={<Test />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/podium" element={<Podium />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
