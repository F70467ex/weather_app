import React, { useState } from "react";
import Section from "./Section";
import Footer from "./Footer";
import "./App.css"; // Ce fichier reste si tu as besoin de quelques styles globaux

const App = () => {
  return (
    <div className="app">
      <Section />
      <Footer />
    </div>
  );
};

export default App;
