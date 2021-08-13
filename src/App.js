//how to avoid unusedVars warning here?
import React, { useState, useEffect } from "react";
import "./App.css";
// import css from 'styled-jsx/macro'
import TileGrid from "./TileGrid";
import Tile from "./Tile";

function App() {
  console.log("App rendered");
  const [tileColors, setTileColors] = useState([]);
  // const [primarySelect, setPrimarySelect] = useState({
  //   background: null,
  //   midground: null,
  //   foreground: null,
  // });
  // const [secondarySelect, setSecondarySelect] = useState({
  //   background: null,
  //   midground: null,
  //   foreground: null,
  // });

  useEffect(() => {
    const colors = {
      background: [
        "aqua",
        "darkcyan",
        "lavenderblush",
        "lightsteelblue",
        "rebeccapurple",
        "moccasin",
        "rosybrown",
      ],
      hightlight: "red",
    };
    const randomNumber = () => {
      return Math.floor(Math.random() * colors.background.length);
    };
    const colorsArr = [];
    for (let i = 0; i < 30; i++) {
      colorsArr.push(colors.background[randomNumber()]);
    }
    setTileColors(colorsArr);
  }, []);

  const colors = {
    background: [
      "aqua",
      "darkcyan",
      "lavenderblush",
      "lightsteelblue",
      "rebeccapurple",
      "moccasin",
      "rosybrown",
    ],
    hightlight: "red",
  };

  // const handleClick = (e) => {
  //   console.log(e.target.style.backgroundColor);
  //   console.log(primarySelect.background);
  //   // //Need to think about the logic here with regards to background, middle and foreground
  //   // //Sticking with just background for proof of concept
  //   if (!primarySelect.background) {
  //     setPrimarySelect({
  //       ...primarySelect,
  //       background: e.target.style.backgroundColor,
  //     });
  //   } else {
  //     setSecondarySelect({
  //       ...secondarySelect,
  //       background: e.target.style.backgroundColor,
  //     });
  //   }
  // };

  //issue with the random number logic here, every tile needs to be paired!
  //Rewrite - maybe using a shuffle algo?
  const randomNumber = () => {
    return Math.floor(Math.random() * colors.background.length);
  };

  const tiles = [];

  for (let i = 0; i < 30; i++) {
    tiles.push(
      <Tile
        key={i}
        cssColor={colors.background[randomNumber()]}
        // handleClick={handleClick}
      />
    );
  }

  return (
    <div className="App">
      <div className="main-container"></div>
      <TileGrid tileColors={tileColors} />
      {/* <div className="tile-grid">{tiles}</div> */}
    </div>
  );
}

export default App;
