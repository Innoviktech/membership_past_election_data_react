import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../constants/url.jsx";
import "./Sidebar.css";

const Sidebar = ({ selectedState, onStateChange, onTrackData }) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trackIdInput, setTrackIdInput] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(url.get_state.url);
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

  const handleTrackRequest = async () => {
    if (!trackIdInput.trim()) {
      alert("Please enter a tracking ID");
      return;
    }

    try {
      const apiUrl = `${url.getrequestdetails.url}?request_id=${trackIdInput}`;
      console.log('Request URL:', apiUrl);  // Log the API URL

      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      const data = response.data; 
      console.log('API Response Data:', data);  

      if (data && data.request_id === trackIdInput) {
        onTrackData(data);  
      } else {
        alert("No request found with this ID.");
      }
    } catch (err) {
      console.error('Error fetching request details:', err); 
      alert(`Error fetching request details: ${err.message}`);
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Financial Explorer</h2>
      <p className="sidebar-description">
        Select a state to view its real-time financial overview.
      </p>

      <div className="dropdown-container">
        <label>Select State *</label>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <select value={selectedState} onChange={handleStateChange}>
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

      <div className="track-request-section">
        <label>Track Your Request</label>
        <div className="track-input-wrapper">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackIdInput}
            onChange={(e) => setTrackIdInput(e.target.value)}
          />
          <button onClick={handleTrackRequest} title="Search">
            🔍
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
