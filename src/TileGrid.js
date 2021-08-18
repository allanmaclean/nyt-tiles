import { useEffect, useState, useRef } from "react";
import Tile from "./Tile";

const TileGrid = ({
  backgroundColors,
  midgroundColors,
  foregroundColors,
  // handleMatch,
  handleMatches,
  currentCombo,
  setCurrentCombo,
  longestCombo,
  setLongestCombo,
}) => {
  console.log("tile grid rendered");
  // const [primarySelect, setPrimarySelect] = useState({
  //   id: null,
  // });
  // const [secondarySelect, setSecondarySelect] = useState({
  //   id: null,
  // });
  const primarySelect = useRef(null);
  const secondarySelect = useRef(null);
  //would this need to be in a use effect?

  // const goAnywhere = () => {
  //   // setPrimarySelect({ id: null });
  //   primarySelect.current = null;
  //   //General keyframe bits down - see App.js + Square.js for how I'd impliment
  //   alert("go anywhere!");
  // };

  // function checkComplete() {
  //   const colorsArrays = [backgroundColors, midgroundColors, foregroundColors];

  //   for (let i = 0; i < colorsArrays.length; i++) {
  //     for (let j = 0; j < colorsArrays[i].length; j++) {
  //       console.log(colorsArrays[i][j]);
  //       if (colorsArrays[i][j] !== "") return;
  //     }
  //   }
  //   //prevent this from firing first time - and prevent 'go anywhere' from firing after it upon game completion
  //   //Am sure there is a more elegant way of doing this
  //   if (longestCombo > 0) {
  //     alert("game over!");
  //   }
  // }

  // useEffect(() => {
  //   // if (secondarySelect.id !== null) {
  //   if (secondarySelect.current !== null) {
  //     console.log("secondarySelect was updated. Checking for equality...");

  //     // const pBack = document.getElementById(`background-${primarySelect.id}`);
  //     // const pMid = document.getElementById(`midground-${primarySelect.id}`);
  //     // const pFore = document.getElementById(`foreground-${primarySelect.id}`);
  //     // const sBack = document.getElementById(`background-${secondarySelect.id}`);
  //     // const sMid = document.getElementById(`midground-${secondarySelect.id}`);
  //     // const sFore = document.getElementById(`foreground-${secondarySelect.id}`);
  //     const pBack = document.getElementById(
  //       `background-${primarySelect.current}`
  //     );
  //     const pMid = document.getElementById(
  //       `midground-${primarySelect.current}`
  //     );
  //     const pFore = document.getElementById(
  //       `foreground-${primarySelect.current}`
  //     );
  //     const sBack = document.getElementById(
  //       `background-${secondarySelect.current}`
  //     );
  //     const sMid = document.getElementById(
  //       `midground-${secondarySelect.current}`
  //     );
  //     const sFore = document.getElementById(
  //       `foreground-${secondarySelect.current}`
  //     );
  //     const matches = [];
  //     if (pBack.style.backgroundColor === sBack.style.backgroundColor) {
  //       matches.push("background");
  //     }
  //     if (pMid.style.backgroundColor === sMid.style.backgroundColor) {
  //       matches.push("midground");
  //     }
  //     if (pFore.style.backgroundColor === sFore.style.backgroundColor) {
  //       matches.push("foreground");
  //     }
  //     matches.length ? match(matches) : noMatch();
  //   }
  //   checkComplete();
  //   //I need some logic here to prevent goAnywhere from firing
  //   if (
  //     currentCombo > 0 &&
  //     !backgroundColors[primarySelect.id] &&
  //     !midgroundColors[primarySelect.id] &&
  //     !foregroundColors[primarySelect.id]
  //   ) {
  //     goAnywhere();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [secondarySelect]);

  // const match = (matches) => {
  //   matches.forEach((el) => {
  //     handleMatch(el, primarySelect.id, secondarySelect.id);
  //   });
  //   // setPrimarySelect(secondarySelect);
  //   // setSecondarySelect({ id: null });
  //   primarySelect.current = secondarySelect.current;
  //   secondarySelect.current = null;
  //   setCurrentCombo(currentCombo + 1);
  // };

  // useEffect(() => {
  //   if (currentCombo > longestCombo) {
  //     setLongestCombo(currentCombo);
  //   }
  // }, [currentCombo]);

  // const noMatch = () => {
  //   console.log("no matches");
  //   // setPrimarySelect(secondarySelect);
  //   // setSecondarySelect({ id: null });
  //   primarySelect.current = secondarySelect.current;
  //   secondarySelect.current = null;
  //   setLongestCombo(currentCombo);
  //   setCurrentCombo(0);
  // };

  // const handleClick = (e) => {
  //   console.log("handleClick fired");

  //   const clicked = e.target.closest(".tile");
  //   const idTarget = clicked.id;
  //   const idx = idTarget.indexOf("-");
  //   const id = Number(idTarget.slice(idx + 1));

  //   // const selected = {
  //   //   id: id,
  //   // };
  //   //uneccesary
  //   const selected = id;
  //   //have to be explicit here as id may be zero (ie falsy!)
  //   if (primarySelect.id == null) {
  //     // setPrimarySelect(selected);
  //     primarySelect.current = selected;
  //   } else {
  //     if (id !== primarySelect.id) {
  //       // setSecondarySelect(selected);
  //       secondarySelect.current = selected;
  //     } else {
  //       console.log("you may not select the same tile");
  //     }
  //   }
  // };

  const handleClick = (e) => {
    console.log("handleClick fired");
    const currentSelection = e.target.closest(".tile");
    if (primarySelect.current == null) {
      primarySelect.current = currentSelection;
    } else {
      if (currentSelection === primarySelect.current) {
        console.log(
          "you may not pick the same square as primarySelect for secondarySelect"
        );
      } else {
        secondarySelect.current = currentSelection;
        checkMatches();
      }
    }
  };

  const checkMatches = () => {
    console.log("checking for matches");

    //the syntax could be nicer here if the markup was not nested, and instead each layer was a child of 'tile' and the z-index changed (w/relative positioning I guess?)
    const pBack = primarySelect.current.children[0];
    const sBack = secondarySelect.current.children[0];
    const pMid = pBack.children[0];
    const sMid = sBack.children[0];
    const pFore = pMid.children[0];
    const sFore = sMid.children[0];

    const matches = [];

    if (pBack.style.backgroundColor === sBack.style.backgroundColor) {
      matches.push("background");
    }
    if (pMid.style.backgroundColor === sMid.style.backgroundColor) {
      matches.push("midground");
    }
    if (pFore.style.backgroundColor === sFore.style.backgroundColor) {
      matches.push("foreground");
    }
    //trying if else instead
    if (matches.length) {
      const primaryIndex = getIndex(primarySelect.current);
      const secondaryIndex = getIndex(secondarySelect.current);
      matches.forEach((layer) => {
        handleMatches(layer, primaryIndex, secondaryIndex);
      });
    } else {
      noMatch();
    }
  };

  const getIndex = (selection) => {
    // console.log(`selection: ${selection.id}`);
    const index = selection.id.indexOf("-");
    return Number(selection.id.slice(index + 1));
  };

  // const handleMatches = (matches) => {
  //   console.log(`preparing to handleMatches for ${matches}`);
  // };

  const noMatch = () => {
    console.log("no matches");
  };

  return (
    <div className="tile-grid">
      {backgroundColors.map((backgroundColor, idx) => {
        return (
          <Tile
            key={idx}
            id={idx}
            primarySelect={primarySelect}
            backgroundColor={backgroundColor}
            midgroundColor={midgroundColors[idx]}
            foregroundColor={foregroundColors[idx]}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default TileGrid;
