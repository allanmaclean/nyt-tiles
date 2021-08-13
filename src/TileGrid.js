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
  //could incorporate these into the objects above?
  const [currentClick, setCurrentClick] = useState(null);
  const [lastClick, setLastClick] = useState(null);

  useEffect(() => {
    console.log("generalized useEffect fired");
    //would also need to reset state after each of the ternary options
    if (primarySelect.background && secondarySelect.background) {
      primarySelect.background === secondarySelect.background
        ? match()
        : noMatch();
    }
  });

  useEffect(() => {
    console.log("useEffect for currentClick fired");

    if (lastClick) {
      lastClick.style.border = "";
    }
    if (currentClick) {
      currentClick.style.border = "2px solid red";
    }

    //need the following conditional to avoid error on first click (as lastClick will be falsy)
    if (currentClick && lastClick) {
      console.log("checking for equality between currentClick & lastClick...");
    }
  }, [currentClick]);

  useEffect(() => {
    //is there a terser syntax for checking if all props in an object are truthy/falsy?
    //**This go anywhere logic is incorrect
    if (
      !primarySelect.background &&
      !primarySelect.midground &&
      !primarySelect.foreground
    ) {
      console.log("Go Anywhere!");
    }
  }, [primarySelect]);

  const handleClick = (e) => {
    console.log(e.target.style.backgroundColor);

    if (currentClick) {
      if (e.target === currentClick) {
        console.log("cannot select the same square");
      } else {
        setLastClick(currentClick);
      }
    }
    setCurrentClick(e.target);

    if (!primarySelect.background) {
      setPrimarySelect({
        ...primarySelect,
        background: e.target.style.backgroundColor,
      });
    } else {
      if (e.target !== currentClick) {
        setSecondarySelect({
          ...secondarySelect,
          background: e.target.style.backgroundColor,
        });
      }
    }
  };

  const match = () => {
    console.log("You found a match");
    //this is background specific, and would need additional logic once there's multiple layers to each tile
    setPrimarySelect({
      ...primarySelect,
      background: null,
    });
    setSecondarySelect({
      ...secondarySelect,
      background: null,
    });
    currentClick.style.backgroundColor = "";
    lastClick.style.backgroundColor = "";
  };

  const noMatch = () => {
    console.log("No match!");
    setPrimarySelect({
      ...primarySelect,
      background: null,
    });
    setSecondarySelect({
      ...secondarySelect,
      background: null,
    });
    currentClick.style.border = "";
    setCurrentClick(null);
    setLastClick(null);
  };

  return (
    <div className="tile-grid">
      {tileColors.map((color, idx) => {
        return <Tile key={idx} cssColor={color} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default TileGrid;
