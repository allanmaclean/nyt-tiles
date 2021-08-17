// import { useState, useEffect } from "react";

// const Square = ({ handleClick, toggle, setToggle }) => {
//   const [animation, setAnimation] = useState(0);
//   useEffect(() => {
//     renderAnimations();
//   }, [toggle]);

//   useEffect(() => {
//     if (animation === 1) {
//       setTimeout(() => {
//         setToggle(false);
//       }, 900);
//     }
//   }, [animation]);

//   const renderAnimations = () => {
//     return toggle ? setAnimation(1) : setAnimation(2);
//   };

//   return (
//     <div className="red-box" onClick={handleClick}>
//       <div className={toggle ? "black-dialog" : "hide"} animation={animation}>
//         <h2 className="white-text">Go anywhere</h2>
//       </div>
//     </div>
//   );
// };

// export default Square;
