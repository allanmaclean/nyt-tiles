import { useEffect, useState } from "react";
import Tile from "./Tile";

const TileGrid = ({ tileColors }) => {
  const [primarySelect, setPrimarySelect] = useState({
    background: null,
    midground: null,
    foreground: null,
  });
  const [secondarySelect, setSecondarySelect] = useState({
    background: null,
    midground: null,
    foreground: null,
  });
  const [highlight, setHighlight] = useState(null);
  const [prevHighlight, setPrevHighlight] = useState(null);

  const handleClick = (e) => {
    console.log(e.target.style.backgroundColor);
    if (prevHighlight) {
      prevHighlight.style.border = "";
    }
    setHighlight(e.target);
    // e.target.style.border = "2px solid red";
    if (!primarySelect.background) {
      setPrimarySelect({
        ...primarySelect,
        background: e.target.style.backgroundColor,
      });
    } else {
      setSecondarySelect({
        ...secondarySelect,
        background: e.target.style.backgroundColor,
      });
    }
  };

  useEffect(() => {
    //would also need to reset state after each of the ternary options
    if (primarySelect.background && secondarySelect.background) {
      primarySelect.background === secondarySelect.background
        ? console.log("You found a match!")
        : console.log("No match!");
    }
  });

  useEffect(() => {
    if (highlight) {
      highlight.style.border = "2px solid red";
      setPrevHighlight(highlight);
    }
  }, [highlight]);

  return (
    <div className="tile-grid">
      {tileColors.map((color, idx) => {
        return <Tile key={idx} cssColor={color} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default TileGrid;
