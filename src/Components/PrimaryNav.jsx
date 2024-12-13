import React from "react";
import AppName from "./AppName";

const PrimaryNav = ({  handleDarkMode }) => {
  return (
    <>
      <div className="bg-neutral-400 dark:bg-lime-800 p-4 grid grid-flow-col justify-between items-center sticky top-0   z-30">
        <center className="px-2  "> 
          <AppName />
        </center>
        <button title="Toggle Dark mode"
          className=" bg-black dark:bg-white w-10 h-5 px-1 rounded-xl grid items-center dark:justify-end"
          onClick={handleDarkMode}
        >
          <div className=" bg-white dark:bg-black hover:bg-blue-500 size-3 hover:size-4 rounded-full duration-75 transition-transform"></div>
        </button>
      </div>
    </>
  );
};

export default PrimaryNav;
