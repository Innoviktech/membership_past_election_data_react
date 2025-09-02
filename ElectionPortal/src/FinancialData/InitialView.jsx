import React from 'react';

const InitialView = () => {
  return (
    <div className="initial-view">
      <svg className="initial-view-icon" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-8.3-4.3"/><path d="M10.4 16a6 6 0 0 0 8.3-4.3"/><path d="M15 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M15 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
      <h2 className="initial-view-title">Unlock Financial Insights</h2>
      <p className="initial-view-text">
        Please select a state from the sidebar to begin your journey.<br/>
        Real-time data will be fetched and visualized for you.
      </p>
    </div>
  );
};

export default InitialView;
