import React from "react";
import Main from "./Components/Main";
import PrimaryNav from "./Components/PrimaryNav";
import Footer from "./Components/Footer";
import { makeServer } from "./miragejs/server";
import { useState } from "react";

makeServer();

const App = () => {
  localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    console.log("button clicked dark");
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  };
  return (
    <>
      <PrimaryNav handleDarkMode={toggleDarkMode} />
      <Main />
      <Footer />
    </>
  );
};

export default App;
