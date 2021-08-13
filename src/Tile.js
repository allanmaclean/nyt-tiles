const Tile = ({ cssColor, handleClick }) => {
  //   const handleClick = (e) => {
  //     console.log(e.target.style.backgroundColor);
  //   };

  return (
    <div
      className="tile"
      style={{ backgroundColor: cssColor }}
      onClick={handleClick}
    ></div>
  );
};

export default Tile;
