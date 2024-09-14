import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Painter from "./pages/Painter";
import Test from "./pages/Test"
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/painter" element={<Painter />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
