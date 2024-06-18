import React, { useState } from 'react';

const Slider = ({ statement }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSlider = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="slider-container">
      <div className={`slider-symbol ${expanded ? 'expanded' : ''}`} onClick={toggleSlider}>
        {expanded ? '-' : '+'}
      </div>
      {expanded && (
        <div className="slider-content">
          <p>{statement}</p>
        </div>
      )}
    </div>
  );
};

export default Slider;