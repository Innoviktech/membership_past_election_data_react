import React from 'react';

const Sidebar = ({ selectedState, onStateChange }) => {
  const states = ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh"];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Financial Explorer</h2>
      <p className="sidebar-description">Select a state to view its real-time financial overview.</p>
      <div className="dropdown-container">
        <label htmlFor="state-select">Select State *</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => onStateChange(e.target.value)}
        >
          <option value="" disabled>Select a State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
