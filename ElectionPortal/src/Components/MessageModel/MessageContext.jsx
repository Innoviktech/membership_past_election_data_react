// context/MessageContext.jsx
import { createContext, useState } from 'react';
import MessageModal from './MessageModal';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (type, msg) => {
    setMessage({ type, message: msg });
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <MessageModal
          type={message.type}
          message={message.message}
          onClose={clearMessage}
        />
      )}
    </MessageContext.Provider>
  );
};