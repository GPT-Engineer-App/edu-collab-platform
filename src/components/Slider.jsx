import React, { useState } from 'react';

const Slider = ({ statement }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSlider = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="slider-container">
      <div
        className={`slider-symbol ${expanded ? 'expanded' : ''}`}
        onClick={toggleSlider}
        role="button"
        aria-expanded={expanded}
        tabindex="0"
      >
        {expanded ? '-' : '+'}
      </div>
      {expanded && (
        <div className="slider-content" role="region">
          <p>{statement}</p>
        </div>
      )}
    </div>
  );
};

export default Slider;