import { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import { MdError } from 'react-icons/md';
import './MessageModal.scss';

const MessageModal = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

//   useEffect(() => {
//     const timer = setTimeout(handleClose, 5000);
//     return () => clearTimeout(timer);
//   }, []);

  if (!isVisible) return null;

  const iconConfig = {
    success: {
      icon: <FiCheckCircle className="modal-icon icon-success" />,
      title: 'Success'
    },
    error: {
      icon: <MdError className="modal-icon icon-error" />,
      title: 'Error'
    },
    alert: {
      icon: <FiAlertCircle className="modal-icon icon-alert" />,
      title: 'Notice'
    },
    info: {
      icon: <FiInfo className="modal-icon icon-info" />,
      title: 'Information'
    }
  };

  const { icon, title } = iconConfig[type] || iconConfig.info;

  return (
    <div className="message-modal">
      {/* Blur background */}
      <div 
        className="modal-backdrop"
        onClick={handleClose}
      />
      
      {/* Modal container */}
      <div className="modal-container">
        {/* Icon and title */}
        <div className="modal-content">
          <div className="modal-icon-container">
            {icon}
          </div>
          <h3 className="modal-title">{title}</h3>
          <p className="modal-message">{message}</p>
        </div>
        
        {/* OK button */}
        <div className="modal-footer">
          <button
            onClick={handleClose}
            className="modal-button"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;