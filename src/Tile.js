const Tile = ({
  backgroundColor,
  midgroundColor,
  foregroundColor,
  handleClick,
  id,
}) => {
  console.log("tile rendered");

  return (
    <div id={`tile-${id}`} className="tile" onClick={handleClick}>
      {/* this is a little confusing, in that the prop is the same label as the
      CSS property! Consider changing to 'bgColor', 'midColor', 'fgColor'? */}
      <div
        id={`background-${id}`}
        className="background"
        style={{ backgroundColor: backgroundColor }}
      >
        <div
          id={`midground-${id}`}
          className="midground"
          style={{ backgroundColor: midgroundColor }}
        >
          <div
            id={`foreground-${id}`}
            className="foreground"
            style={{ backgroundColor: foregroundColor }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Tile;
