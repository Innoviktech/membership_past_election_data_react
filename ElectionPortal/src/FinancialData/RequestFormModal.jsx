import React, { useState } from "react";
import "./RequestFormModal.css";

const RequestFormModal = ({ isOpen, onClose, stateId, stateName, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      state_id: stateId,
    };

    if (onSubmit) onSubmit(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Request Financial Data for {stateName}</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Request or Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestFormModal;
