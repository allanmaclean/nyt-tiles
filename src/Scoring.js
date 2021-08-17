import { useState } from "react";

const Scoring = ({ currentCombo, longestCombo }) => {
  return (
    <div className="scoring-section">
      <div className="scoring-heading-section">
        <h3>Current Combo</h3>
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
