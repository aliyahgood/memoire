import React, { useEffect, useState } from 'react';
import './gettingstarted.scss';

const GettingStarted = ({ targetRef, closeTooltip }) => {
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <p>Welcome! Click here to create your first post.</p>
        <button onClick={closeTooltip}>Got it!</button>
      </div>
    </div>
  );
};

export default GettingStarted;
