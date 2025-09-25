// LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    return localStorage.getItem('appLanguage') || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('appLanguage', language);
    
    // You can also update the HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};