// LanguageDropdown.js
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import './LanguageDropdown.scss';

const LanguageDropdown = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    // { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    // { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    // { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    // { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* <Globe size={18} /> */}
        <span className="selected-language">{selectedLanguage.nativeName}</span>
        {/* <span className="selected-language">{selectedLanguage.name}</span> */}
        <ChevronDown 
          size={16} 
          className={`dropdown-chevron ${isOpen ? 'open' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`dropdown-item ${language === lang.code ? 'selected' : ''}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="language-native">{lang.nativeName}</span>
              {/* <span className="language-english">{lang.name}</span> */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;