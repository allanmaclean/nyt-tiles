import { useEffect, useState } from "react";
import Tile from "./Tile";

const TileGrid = ({
  backgroundColors,
  midgroundColors,
  foregroundColors,
  handleMatch,
}) => {
  console.log("tile grid rendered");
  const [primarySelect, setPrimarySelect] = useState({
    element: null,
    background: null,
    midground: null,
    foreground: null,
    id: null,
  });
  const [secondarySelect, setSecondarySelect] = useState({
    element: null,
    background: null,
    midground: null,
    foreground: null,
    id: null,
  });

  useEffect(() => {
    console.log("primarySelect useEffect fired");
    if (primarySelect.element) {
      const background = primarySelect.element.children[0];
      const midground = background.children[0];
      const foreground = midground.children[0];

      setPrimarySelect({
        ...primarySelect,
        background: background.style.backgroundColor,
        midground: midground.style.backgroundColor,
        foreground: foreground.style.backgroundColor,
      });
    }
    if (secondarySelect.element) {
      const background = secondarySelect.element.children[0];
      const midground = background.children[0];
      const foreground = midground.children[0];

      setSecondarySelect({
        ...secondarySelect,
        background: background.style.backgroundColor,
        midground: midground.style.backgroundColor,
        foreground: foreground.style.backgroundColor,
      });
    }
  }, [primarySelect.element]);

  //Not very DRY here...but combining one into a single useEffect with both in the dependcies array causes endless loop

  useEffect(() => {
    console.log("secondarySelect useEffect fired");
    if (secondarySelect.element) {
      const background = secondarySelect.element.children[0];
      const midground = background.children[0];
      const foreground = midground.children[0];

      setSecondarySelect({
        ...secondarySelect,
        background: background.style.backgroundColor,
        midground: midground.style.backgroundColor,
        foreground: foreground.style.backgroundColor,
      });
    }
  }, [secondarySelect.element]);

  useEffect(() => {
    //this is where to check for matches!
    const matches = [];

    // console.log(secondarySelect.background);
    if (primarySelect.background === secondarySelect.background) {
      console.log("backgrounds match!");
      matches.push("background");
    }
    if (primarySelect.midground === secondarySelect.midground) {
      console.log("midgrounds match!");
      matches.push("midground");
    }
    if (primarySelect.foreground === secondarySelect.foreground) {
      console.log("foregrounds match!");
      matches.push("foreground");
    }
    matches.length ? match(matches) : noMatch();
  }, [
    secondarySelect.background,
    secondarySelect.midground,
    secondarySelect.foreground,
  ]);

  const match = (matches) => {
    matches.forEach((el) => {
      handleMatch(el, primarySelect.id, secondarySelect.id);
    });
  };

  const noMatch = () => {
    console.log("no matches");
  };

  const handleClick = (e) => {
    const clicked = e.target.closest(".tile");
    const idTarget = clicked.id;
    const idx = idTarget.indexOf("-");
    const id = Number(idTarget.slice(idx + 1));

    // const element = primarySelect.element.children[0];
    // const id = element.id;
    // const idx = id.indexOf("-");
    // const idInt = Number(id.slice(idx + 1));
    // console.log(idInt);

    const selected = {
      element: e.target.closest(".tile"),
      id: id,
    };
    if (!primarySelect.element) {
      setPrimarySelect(selected);
    } else {
      if (e.target.closest(".tile") !== primarySelect.element) {
        setSecondarySelect(selected);
      } else {
        console.log("you may not select the same tile");
      }
    }
  };

  //   useEffect(() => {
  //     console.log("secondarySelect was updated. Checking for equality...");
  //     const matches = [];

  //     // console.log(secondarySelect.background);
  //     if (primarySelect.background === secondarySelect.background) {
  //       console.log("backgrounds match!");
  //       matches.push("background");
  //     }
  //     if (primarySelect.midground === secondarySelect.midground) {
  //       console.log("midgrounds match!");
  //       matches.push("midground");
  //     }
  //     if (primarySelect.foreground === secondarySelect.foreground) {
  //       console.log("foregrounds match!");
  //       matches.push("foreground");
  //     }
  //     matches.length
  //       ? console.log(`Matched the following ${matches}`)
  //       : console.log("no matches!");
  //   }, [secondarySelect]);

  //   useEffect(() => {
  //     console.log("generalized useEffect fired");
  //     //would also need to reset state after each of the ternary options
  //     // if (primarySelect.background && secondarySelect.background) {
  //     //   primarySelect.background === secondarySelect.background
  //     //     ? match()
  //     //     : noMatch();
  //     // }
  //     //is there a shorthand to check for presence of falsy values in all props of an object?
  //     //if so, could possibly do this more elegantly with a swtich statement
  //     // const layers = [];
  //     // if (primarySelect.background && secondarySelect.background) {
  //     //   if (primarySelect.background === secondarySelect.background) {
  //     //     layers.push("background");
  //     //   }
  //     // }
  //     // if (primarySelect.midground && secondarySelect.midground) {
  //     //   if (primarySelect.midground === secondarySelect.midground) {
  //     //     layers.push("midground");
  //     //   }
  //     // }
  //     // if (primarySelect.foreround && secondarySelect.foreground) {
  //     //   if (primarySelect.foreground === secondarySelect.foreground) {
  //     //     layers.push("foreground");
  //     //   }
  //     // }
  //     // layers.length ? match(layers) : noMatch();

  //     let proceed = false;

  //     // Object.values(primarySelect).forEach((el) => {
  //     //   if (el !== null) {
  //     //     proceed = true;
  //     //   }
  //     // });
  //     //THERE IS AN ISSUE HERE, whereby if PrimarySelect has a value, but secondarySelect does not - proceed will still be true
  //     Object.values(secondarySelect).forEach((el) => {
  //       if (el !== null) {
  //         proceed = true;
  //       }
  //     });
  //     const layers = [];
  //     console.log(`Proceed: ${proceed}`);
  //     if (proceed) {
  //       if (primarySelect.background === secondarySelect.background) {
  //         layers.push("background");
  //       }
  //       if (primarySelect.midground === secondarySelect.midground) {
  //         layers.push("midground");
  //       }
  //       if (primarySelect.foreground === secondarySelect.foreground) {
  //         layers.push("foreground");
  //       }
  //       layers.length ? match(layers) : noMatch();
  //     }
  //   });

  //   useEffect(() => {
  //     console.log("useEffect for currentClick fired");

  //     if (lastClick) {
  //       lastClick.style.border = "";
  //     }
  //     if (currentClick) {
  //       currentClick.closest(".background").style.border = "2px solid red";
  //     }

  //     //need the following conditional to avoid error on first click (as lastClick will be falsy)
  //     if (currentClick && lastClick) {
  //       console.log("checking for equality between currentClick & lastClick...");
  //     }
  //   }, [currentClick]);

  //   useEffect(() => {
  //     //is there a terser syntax for checking if all props in an object are truthy/falsy?
  //     //**This go anywhere logic is incorrect
  //     if (
  //       !primarySelect.background &&
  //       !primarySelect.midground &&
  //       !primarySelect.foreground
  //     ) {
  //       console.log("Go Anywhere!");
  //     }
  //   }, [primarySelect]);

  //   const handleClick = (e) => {
  //     if (currentClick) {
  //       if (e.target.closest(".background") === currentClick) {
  //         console.log("cannot select the same square");
  //       } else {
  //         setLastClick(currentClick);
  //       }
  //     }
  //     //this might be a little clearer if you had a parent 'tile' element
  //     setCurrentClick(e.target.closest(".background"));

  //     //if it's the first click:
  //     if (
  //       !primarySelect.background &&
  //       !primarySelect.midground &&
  //       !primarySelect.foreground
  //     ) {
  //       setPrimarySelect({
  //         background: e.target.closest(".background").style.backgroundColor,
  //         midground: e.target.closest(".midground").style.backgroundColor,
  //         foreground: e.target.closest(".foreground").style.backgroundColor,
  //       });
  //     } else {
  //       //something is wrong with the logic here!
  //       //possible as the vitual DOM does not have these style attributes loaded by the time you try and set them...
  //       if (e.target.closest(".background") !== currentClick) {
  //         setSecondarySelect({
  //           background: e.target.closest(".background").style.backgroundColor,
  //           midground: e.target.closest(".midground").style.backgroundColor,
  //           foreground: e.target.closest(".foreground").style.backgroundColor,
  //         });
  //       }
  //     }
  //   };

  //   //I think an array is the best way to do this here
  //   const match = (layers) => {
  //     console.log(layers);
  //     console.log("You found a match");
  //     //this is background specific, and would need additional logic once there's multiple layers to each tile
  //     setPrimarySelect({
  //       ...primarySelect,
  //       background: null,
  //     });
  //     setSecondarySelect({
  //       ...secondarySelect,
  //       background: null,
  //     });
  //     currentClick.style.backgroundColor = "";
  //     lastClick.style.backgroundColor = "";
  //   };

  //   const noMatch = () => {
  //     console.log("No match!");
  //     setPrimarySelect({
  //       ...primarySelect,
  //       background: null,
  //     });
  //     setSecondarySelect({
  //       ...secondarySelect,
  //       background: null,
  //     });
  //     currentClick.style.border = "";
  //     setCurrentClick(null);
  //     setLastClick(null);
  //   };

  return (
    <div className="tile-grid">
      {backgroundColors.map((backgroundColor, idx) => {
        return (
          <Tile
            key={idx}
            id={idx}
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
