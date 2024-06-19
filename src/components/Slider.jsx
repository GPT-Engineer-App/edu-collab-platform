import React, { useState } from 'react';

const Slider = ({ statement }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleSlider = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="slider-container" style={{ outline: expanded ? '2px solid #000' : 'none' }}>
      <div
        className={`slider-symbol ${expanded ? 'expanded' : ''}`}
        style={{ color: expanded ? '#000' : '#555', outline: 'none' }}
        onKeyPress={(e) => { if (e.key === 'Enter') toggleSlider(); }}
        onClick={toggleSlider}
        role="button"
        aria-pressed={expanded}
        aria-expanded={expanded}
        tabIndex="0"
      >
        {expanded ? '-' : '+'}
      </div>
      {expanded && (
        <div className="slider-content" role="region" aria-live="polite">
          <p>{statement}</p>
        </div>
      )}
    </div>
  );
};

export default Slider;