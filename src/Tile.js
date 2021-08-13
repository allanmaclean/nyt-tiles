const Tile = ({ cssColor, handleClick }) => {
  return (
    <div
      className="tile"
      style={{ backgroundColor: cssColor }}
      onClick={handleClick}
    ></div>
  );
};

export default Tile;
