import React, { useState, useEffect } from "react";
import "./RequestFormModal.css";
import url from "../constants/url.jsx";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestFormModal = ({ isOpen, onClose, stateId, stateName }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setTrackingId(null);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        message: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { ...formData, state_id: stateId };

    try {
      const res = await fetch(url.create_request.url, {
        method: url.create_request.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data?.status) {
        setTrackingId(data.tracking_id);
        setFormData({ name: "", mobile: "", email: "", message: "" });
      } else {
        toast.error(data?.Message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingId);
    toast.success("Tracking ID copied!", {
      position: "bottom-center",
      icon: "✅",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {!trackingId ? (
          <>
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
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h3>🎉 Request Submitted</h3>
            <p>Your request has been submitted successfully.</p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <strong>Tracking ID:</strong>
              <span style={{ wordBreak: "break-word" }}>{trackingId}</span>
              <ContentCopyIcon
                onClick={handleCopy}
                style={{
                  cursor: "pointer",
                  color: "#333",
                  fontSize: "20px",
                }}
                titleAccess="Copy Tracking ID"
              />
            </p>
            <div className="modal-buttons" style={{ justifyContent: "center" }}>
              <button className="ok-btn" onClick={onClose}>
                OK
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RequestFormModal;
