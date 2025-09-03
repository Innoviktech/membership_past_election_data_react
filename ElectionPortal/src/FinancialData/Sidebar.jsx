import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../constants/url.jsx";

const Sidebar = ({ selectedState, onStateChange }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const apiUrl = url.get_state.url;
        console.log("Fetching states from API:", apiUrl);

        const response = await axios.get(apiUrl);

        const result = Array.isArray(response.data?.data)
          ? response.data.data
          : Array.isArray(response.data)
          ? response.data
          : [];

        const validStates = result.filter(
          (state) => state.state_id && state.state_name
        );

        setStates(validStates);
      } catch (err) {
        console.error("Error fetching states:", err);
        setError("Failed to load states");
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedId = e.target.value;
    const selectedStateObj = states.find(
      (state) => String(state.state_id) === selectedId
    );

    if (selectedStateObj) {
      onStateChange({
        state_id: selectedStateObj.state_id,
        state_name: selectedStateObj.state_name
      });
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Financial Explorer</h2>
      <p className="sidebar-description">
        Select a state to view its real-time financial overview.
      </p>

      <div className="dropdown-container">
        <label htmlFor="state-select">Select State *</label>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <select
            id="state-select"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="" disabled>
              Select a State
            </option>
            {states.map((state) => (
              <option key={state.state_id} value={state.state_id}>
                {state.state_name}
              </option>
            ))}
          </select>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
