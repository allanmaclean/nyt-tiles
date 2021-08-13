//how to avoid unusedVars warning here?
import React, { useState, useEffect } from "react";
import "./App.css";
// import css from 'styled-jsx/macro'
import TileGrid from "./TileGrid";

function App() {
  console.log("App rendered");
  const [tileColors, setTileColors] = useState([]);

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

    //V3
    //Knowing there are 7 colors in the background array, loop through that array - and push each color in four times - creating an array of length 28.
    //Pick a color at random from the colors array - and push that same color in twice
    //shuffle the array
    const colorsArr = [];
    for (let i = 0; i < colors.background.length; i++) {
      for (let j = 0; j < 4; j++) {
        colorsArr.push(colors.background[i]);
      }
    }
    const randomColor = colors.background[randomNumber()];
    for (let j = 0; j < 2; j++) {
      colorsArr.push(randomColor);
    }

    //impliment Fisher-Yates/Knuth shuffle algo
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

    setTileColors(shuffle(colorsArr));
  }, []);

  return (
    <div className="App">
      {/* Should main container be it's own component here, if I'm going to store current combo/highest combo? */}
      <div className="main-container"></div>
      <TileGrid tileColors={tileColors} />
    </div>
  );
}

export default App;
