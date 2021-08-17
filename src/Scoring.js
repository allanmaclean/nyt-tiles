import { useState } from "react";

const Scoring = ({ currentCombo, longestCombo }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="scoring-section">
      <div className="scoring-heading-section">
        <h3 onClick={handleToggle} className={isActive ? "red-text" : ""}>
          Current Combo
        </h3>
        <h3>Longest Combo</h3>
      </div>
      <div className="scoring-number-section">
        <h2>{currentCombo}</h2>
        <h2>{longestCombo}</h2>
      </div>
    </div>
  );
};

export default Scoring;
