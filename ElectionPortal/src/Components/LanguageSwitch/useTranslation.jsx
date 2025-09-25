// useTranslation.js
import { useLanguage } from './LanguageContext';
import translations from './translations';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key, defaultValue = '') => {
    // Handle nested keys like "HOME.selectState"
    const keys = key.split('.');
    let value = translations[language];
    
    // Traverse the nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && value[k] !== undefined) {
        value = value[k];
      } else {
        // Key not found, try English fallback
        value = translations['en'];
        for (const enK of keys) {
          if (value && typeof value === 'object' && value[enK] !== undefined) {
            value = value[enK];
          } else {
            // Return default value or the last part of the key
            return defaultValue || keys[keys.length - 1];
          }
        }
        return value;
      }
    }
    
    return value || defaultValue || keys[keys.length - 1];
  };

  return { t, language };
};