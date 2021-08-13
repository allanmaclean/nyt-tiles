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

  //have a feeling this is in the wrong layer here...
  //   const [border, setBorder] = useState("");

  const handleClick = (e) => {
    console.log(e.target.style.backgroundColor);

    if (currentClick) {
      setLastClick(currentClick);
    }
    setCurrentClick(e.target);
    // if (prevHighlight) {
    //   prevHighlight.style.border = "";
    // }
    // setHighlight(e.target);
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

  const match = () => {
    console.log("You found a match");
    // highlight.style.backgroundColor = "";
    // prevHighlight.style.backgroundColor = "";
    //this is background specific, and would need additional logic once there's multiple layers to each tile
    setPrimarySelect({
      ...primarySelect,
      background: null,
    });
    setSecondarySelect({
      ...secondarySelect,
      background: null,
    });

    // setPrevHighlight(null);
    // setHighlight(null);
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

  useEffect(() => {
    //would also need to reset state after each of the ternary options
    if (primarySelect.background && secondarySelect.background) {
      primarySelect.background === secondarySelect.background
        ? match()
        : noMatch();
    }
  });

  //   useEffect(() => {
  //     if (highlight) {
  //       highlight.style.border = "2px solid red";
  //       setPrevHighlight(highlight);
  //     }
  //   }, [highlight]);

  return (
    <div className="tile-grid">
      {tileColors.map((color, idx) => {
        return <Tile key={idx} cssColor={color} handleClick={handleClick} />;
      })}
    </div>
  );
};

export default TileGrid;
