//how to avoid unusedVars warning here?
import React, { useState, useEffect } from "react";
import "./App.css";
// import css from 'styled-jsx/macro'
import TileGrid from "./TileGrid";
import Scoring from "./Scoring";
// import Square from "./Square";

function App() {
  console.log("App rendered");
  //change this to background colors
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [midgroundColors, setMidgroundColors] = useState([]);
  const [foregroundColors, setForegroundColors] = useState([]);

  const [currentCombo, setCurrentCombo] = useState(0);
  const [longestCombo, setLongestCombo] = useState(0);
  //TO DO: Game Over modal
  // const [isComplete, setIsComplete] = useState(false);

  //pertains to the 'go anywhere' logic in this file and Square.js
  // const [toggle, setToggle] = useState(false);
  // const handleClick = () => {
  //   setToggle(!toggle);
  // };

  useEffect(() => {
    const colors = {
      //Current logic means that the length of these arrays must be an odd number, to ensure that each has a matchable pair
      background: [
        "aqua",
        "darkcyan",
        "lavenderblush",
        "lightsteelblue",
        "rebeccapurple",
        "moccasin",
        "rosybrown",
      ],
      midground: [
        "black",
        "orange",
        "tomato",
        "lightblue",
        "violet",
        "purple",
        "gainsboro",
      ],
      foreground: [
        "darkkhaki",
        "lightsteelblue",
        "lightgreen",
        "darkslategray",
        "fuchsia",
        "lavenderblush",
        "darkgreen",
        "palevioletred",
        "purple",
        "orange",
        "navy",
      ],
    };
    //Why is this colors.background.length? Could it be an arg instead?
    const randomNumber = () => {
      return Math.floor(Math.random() * colors.background.length);
    };
    // const randomNumber = (arr) => {
    //   return Math.floor(Math.random() * arr.length);
    // };

    //array lenghts are 7,7,11
    function randomColorArray(arr, setter) {
      const loops = Math.floor(30 / arr.length);
      const remainder = 30 % (loops * arr.length);

      const colorsArr = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < loops; j++) {
          colorsArr.push(arr[i]);
        }
      }

      for (let i = 0; i < remainder / 2; i++) {
        // console.log(randomColor);
        const randomColor = arr[randomNumber(arr)];
        colorsArr.push(randomColor, randomColor);
      }
      //Fisher-Yates/Knuth shuffle algo
      function shuffle(array) {
        var currentIndex = array.length,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      }
      setter(shuffle(colorsArr));
    }
    randomColorArray(colors.background, setBackgroundColors);
    randomColorArray(colors.midground, setMidgroundColors);
    randomColorArray(colors.foreground, setForegroundColors);
  }, []);

  // const handleMatch = (layer, primaryId, secondaryId) => {
  //   console.log("handleMatch fired!");
  //   console.log(layer, primaryId, secondaryId);

  //   if (layer === "background") {
  //     const copy = [...backgroundColors];
  //     copy[primaryId] = "";
  //     copy[secondaryId] = "";
  //     setBackgroundColors(copy);
  //   }
  //   if (layer === "midground") {
  //     const copy = [...midgroundColors];
  //     copy[primaryId] = "";
  //     copy[secondaryId] = "";
  //     setMidgroundColors(copy);
  //   }
  //   if (layer === "foreground") {
  //     const copy = [...foregroundColors];
  //     copy[primaryId] = "";
  //     copy[secondaryId] = "";
  //     setForegroundColors(copy);
  //   }
  // };

  //update param names here to clearer!
  const handleMatches = (layer, primaryIndex, secondaryIndex) => {
    console.log("handleMatches fired!");
    console.log(layer, primaryIndex, secondaryIndex);

    if (layer === "background") {
      const copy = [...backgroundColors];
      copy[primaryIndex] = "";
      copy[secondaryIndex] = "";
      setBackgroundColors(copy);
    }
    if (layer === "midground") {
      const copy = [...midgroundColors];
      copy[primaryIndex] = "";
      copy[secondaryIndex] = "";
      setMidgroundColors(copy);
    }
    if (layer === "foreground") {
      const copy = [...foregroundColors];
      copy[primaryIndex] = "";
      copy[secondaryIndex] = "";
      setForegroundColors(copy);
    }
  };

  return (
    <div className="App">
      <TileGrid
        backgroundColors={backgroundColors}
        midgroundColors={midgroundColors}
        foregroundColors={foregroundColors}
        // handleMatch={handleMatch}
        handleMatches={handleMatches}
        currentCombo={currentCombo}
        setCurrentCombo={setCurrentCombo}
        longestCombo={longestCombo}
        setLongestCombo={setLongestCombo}
      />
      <Scoring currentCombo={currentCombo} longestCombo={longestCombo} />
      {/* leaving this here as it contains the logic for the 'go anywhere' keyframes animation */}
      {/* <Square handleClick={handleClick} toggle={toggle} setToggle={setToggle} /> */}
    </div>
  );
}

export default App;
