import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HeaderNavbar.scss';
import LanguageDropdown from './LanguageSwitch/LanguageDropdown';
import { useTranslation } from './LanguageSwitch/useTranslation';

const HeaderNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && 
          !mobileMenuRef.current?.contains(event.target) && 
          !menuButtonRef.current?.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const closeToggleBar = () => {
    setIsMobileMenuOpen(false);
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo on the left */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/vite.svg" alt="Election Portal Logo" />
          </Link>
        </div>

        {/* Centered Title */}
        <div className="navbar-title">
          <h1>{t('NAVBAR.AppName')}</h1>
        </div>

        {/* Right Section: Language Toggle and Navigation/Menu */}
        <div className="navbar-right">
          {/* Language Toggle */}
          <div className="navbar-language">
            <LanguageDropdown />
          </div>

          {/* Navigation Links - Desktop */}
          {isDesktop && (
            <nav className="navbar-links">
              <Link
                to="/voter-services"
                className={isActive('/') || isActive('/voter-services') ? 'active' : ''}
              >
                {t('NAVBAR.Home')}
              </Link>
              <Link 
                to="/manifesto-promises" 
                className={isActive('/manifesto-promises') ? 'active' : ''}
              >
                {t('NAVBAR.ManifestoPromises')}
              </Link>
              <Link 
  to="/financial-data" 
  className={isActive('/financial-data') ? 'active' : ''}
>
  {t('NAVBAR.FinancialData')}
</Link>
              <Link 
                to="/services" 
                className={isActive('/services') ? 'active' : ''}
              >
                {t('NAVBAR.Services')}
              </Link>
              <Link 
                to="/about" 
                className={isActive('/about') ? 'active' : ''}
              >
                {t('NAVBAR.About')}
              </Link>
              <Link 
                to="/help" 
                className={isActive('/help') ? 'active' : ''}
              >
                {t('NAVBAR.Help')}
              </Link>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {!isDesktop && (
            <button 
              ref={menuButtonRef}
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {!isDesktop && isMobileMenuOpen && (
        <nav
          ref={mobileMenuRef}
          className="mobile-menu"
          aria-hidden={!isMobileMenuOpen}>
          <Link
              to="/voter-services"
              className={isActive('/') || isActive('/voter-services') ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
            {t('NAVBAR.Home')}
          </Link>
          <Link 
            to="/manifesto-promises" 
            className={isActive('/manifesto-promises') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('NAVBAR.ManifestoPromises')}
          </Link>
  {/* ----- REPLACE WITH THIS ----- */}
<Link 
  to="/financial-data" 
  className={isActive('/financial-data') ? 'active' : ''}
  onClick={() => setIsMobileMenuOpen(false)}
>
  {t('NAVBAR.FinancialData')}
</Link>
          <Link 
            to="/services" 
            className={isActive('/services') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('NAVBAR.Services')}
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('NAVBAR.About')}
          </Link>
          <Link 
            to="/help" 
            className={isActive('/help') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('NAVBAR.Help')}
          </Link>
        </nav>
      )}
      {/* Overlay for mobile */}
      {!isDesktop && isMobileMenuOpen && (
        <div className="toggle-overlay" onClick={closeToggleBar}></div>
      )}
    </header>
  );
};

export default HeaderNavbar;