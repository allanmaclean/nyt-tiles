import { useEffect, useState } from "react";
import Tile from "./Tile";

const TileGrid = ({
  backgroundColors,
  midgroundColors,
  foregroundColors,
  handleMatch,
  currentCombo,
  setCurrentCombo,
  setLongestCombo,
}) => {
  console.log("tile grid rendered");
  const [primarySelect, setPrimarySelect] = useState({
    id: null,
  });
  const [secondarySelect, setSecondarySelect] = useState({
    id: null,
  });

  useEffect(() => {
    if (secondarySelect.id) {
      console.log("secondarySelect was updated. Checking for equality...");

      const pBack = document.getElementById(`background-${primarySelect.id}`);
      const pMid = document.getElementById(`midground-${primarySelect.id}`);
      const pFore = document.getElementById(`foreground-${primarySelect.id}`);
      const sBack = document.getElementById(`background-${secondarySelect.id}`);
      const sMid = document.getElementById(`midground-${secondarySelect.id}`);
      const sFore = document.getElementById(`foreground-${secondarySelect.id}`);
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
      matches.length ? match(matches) : noMatch();
    }
  }, [secondarySelect]);

  const match = (matches) => {
    matches.forEach((el) => {
      handleMatch(el, primarySelect.id, secondarySelect.id);
    });
    setPrimarySelect(secondarySelect);
    setSecondarySelect({ id: null });
    setCurrentCombo(currentCombo + 1);
  };

  const noMatch = () => {
    console.log("no matches");
    setPrimarySelect(secondarySelect);
    setSecondarySelect({ id: null });
    setLongestCombo(currentCombo);
    setCurrentCombo(0);
  };

  const handleClick = (e) => {
    console.log("handleClick fired");

    const clicked = e.target.closest(".tile");
    const idTarget = clicked.id;
    const idx = idTarget.indexOf("-");
    const id = Number(idTarget.slice(idx + 1));

    const selected = {
      id: id,
    };
    //have to be explicit here as id may be zero (ie falsy!)
    if (primarySelect.id == null) {
      setPrimarySelect(selected);
    } else {
      if (id !== primarySelect.id) {
        setSecondarySelect(selected);
      } else {
        console.log("you may not select the same tile");
      }
    }
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
