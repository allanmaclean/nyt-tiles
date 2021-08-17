//how to avoid unusedVars warning here?
import React, { useState, useEffect } from "react";
import "./App.css";
// import css from 'styled-jsx/macro'
import TileGrid from "./TileGrid";
import Scoring from "./Scoring";

function App() {
  console.log("App rendered");
  //change this to background colors
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [midgroundColors, setMidgroundColors] = useState([]);
  const [foregroundColors, setForegroundColors] = useState([]);

  const [currentCombo, setCurrentCombo] = useState(0);
  const [longestCombo, setLongestCombo] = useState(0);

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
      //not currently being used - but might be a smart idea to keep this here, as you'd ideally want it a contrasting color to everything in your background property
      hightlight: "red",
    };
    const randomNumber = () => {
      return Math.floor(Math.random() * colors.background.length);
    };

    //V1
    //Current logic which does not ensure that every tile has an acheiveable pairing
    // const colorsArr = [];
    // for (let i = 0; i < 30; i++) {
    //   colorsArr.push(colors.background[randomNumber()]);
    // }
    // setTileColors(colorsArr);

    //V2
    //This is not great because rows 1-3 are identical to rows 4-6
    //could set the concat'd array inside a new variable, and then shuffle it from that point. Seems like a lot of call to randomNumber though, and still does not guarantee that all colors will be represented on the board
    // const subColorsArr = [];
    // for (let i = 0; i < 15; i++) {
    //   subColorsArr.push(colors.background[randomNumber()]);
    // }
    // setTileColors(subColorsArr.concat(subColorsArr));

    function randomColorArray(arr, setter) {
      //could this whole thing fuck up if loops is an odd number?
      const loops = Math.floor(30 / arr.length);
      const remainder = 30 % (loops * arr.length);
      // console.log(loops, remainder);

      const colorsArr = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < loops; j++) {
          colorsArr.push(arr[i]);
        }
      }
      // console.log(arr, colorsArr.length);
      // console.log(
      //   `remaining elements to be pushed are ${30 - colorsArr.length}`
      // );
      //make this into a function as for the foreground colors, you're going to get a cluster at the end
      const randomColor = arr[randomNumber()];

      for (let i = 0; i < remainder; i++) {
        // console.log(randomColor);
        colorsArr.push(randomColor);
      }

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

    //V3
    //Knowing there are 7 colors in the background array, loop through that array - and push each color in four times - creating an array of length 28.
    //Pick a color at random from the colors array - and push that same color in twice
    //shuffle the array
    // const colorsArr = [];

    // for (let i = 0; i < colors.background.length; i++) {
    //   for (let j = 0; j < 4; j++) {
    //     colorsArr.push(colors.background[i]);
    //   }
    // }
    // const randomColor = colors.background[randomNumber()];
    // for (let j = 0; j < 2; j++) {
    //   colorsArr.push(randomColor);
    // }

    // //impliment Fisher-Yates/Knuth shuffle algo
    // function shuffle(array) {
    //   var currentIndex = array.length,
    //     randomIndex;

    //   // While there remain elements to shuffle...
    //   while (0 !== currentIndex) {
    //     // Pick a remaining element...
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     currentIndex--;

    //     // And swap it with the current element.
    //     [array[currentIndex], array[randomIndex]] = [
    //       array[randomIndex],
    //       array[currentIndex],
    //     ];
    //   }

    //   return array;
    // }

    // setTileColors(shuffle(colorsArr));
  }, []);

  const handleMatch = (layer, primaryId, secondaryId) => {
    console.log("handleMatch fired!");
    console.log(layer, primaryId, secondaryId);

    if (layer === "background") {
      const copy = [...backgroundColors];
      copy[primaryId] = "";
      copy[secondaryId] = "";
      setBackgroundColors(copy);
    }
    if (layer === "midground") {
      const copy = [...midgroundColors];
      copy[primaryId] = "";
      copy[secondaryId] = "";
      setMidgroundColors(copy);
    }
    if (layer === "foreground") {
      const copy = [...foregroundColors];
      copy[primaryId] = "";
      copy[secondaryId] = "";
      setForegroundColors(copy);
    }
  };

  return (
    <div className="App">
      {/* Should main container be it's own component here, if I'm going to store current combo/highest combo? */}
      <div className="main-container"></div>
      <TileGrid
        backgroundColors={backgroundColors}
        midgroundColors={midgroundColors}
        foregroundColors={foregroundColors}
        handleMatch={handleMatch}
        currentCombo={currentCombo}
        setCurrentCombo={setCurrentCombo}
        setLongestCombo={setLongestCombo}
      />
      <Scoring currentCombo={currentCombo} longestCombo={longestCombo} />
    </div>
  );
}

export default App;
