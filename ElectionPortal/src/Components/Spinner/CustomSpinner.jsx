import React from 'react';
import './CustomSpinner.scss'; // For styles

const CustomSpinner = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner-backdrop"></div>
      <div className="spinner-container">
        <div className="custom-spinner">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="spinner-dot"
              style={{
                transform: `rotate(${i * 30}deg) translate(0, -20px)`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
        <div className="spinner-text">LOADING...</div>
      </div>
    </div>
  );
};

export default CustomSpinner;
