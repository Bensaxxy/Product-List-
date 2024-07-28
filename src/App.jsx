import React from "react";
import HeroSection from "./components/HeroSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className=" font-primary bg-rose2">
        <Router>
          <Routes>
            <Route path="/" element={<HeroSection />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
