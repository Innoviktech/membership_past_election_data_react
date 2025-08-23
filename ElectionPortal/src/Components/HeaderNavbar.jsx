import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HeaderNavbar.scss'; // Create this CSS file

const HeaderNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

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
          <h1>ELECTION PORTAL</h1>
        </div>

        {/* Navigation Links - Desktop */}
        {isDesktop && (
          <nav className="navbar-links">
            {/* <Link 
              to="/voter-services" 
              className={isActive('/voter-services') ? 'active' : ''}
            >
              Voter Services
            </Link> */}
            <Link 
              to="/election-info" 
              className={isActive('/election-info') ? 'active' : ''}
            >
              Election Info
            </Link>
            <Link 
              to="/manifesto-promises" 
              className={isActive('/manifesto-promises') ? 'active' : ''}
            >
              Manifesto Promises
            </Link>
            {/* <Link 
              to="/results" 
              className={isActive('/results') ? 'active' : ''}
            >
              Results
            </Link> */}
            {/* <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact
            </Link> */}
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

      {/* Mobile Menu Dropdown */}
      {!isDesktop && isMobileMenuOpen && (
        <nav
          ref={mobileMenuRef}
          className="mobile-menu"
          aria-hidden={!isMobileMenuOpen}>
          {/* <Link 
            to="/voter-services" 
            className={isActive('/voter-services') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Voter Services
          </Link> */}
          <Link 
            to="/election-info" 
            className={isActive('/election-info') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Election Info
          </Link>
          <Link 
            to="/manifesto-promises" 
            className={isActive('/manifesto-promises') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Manifesto Promises
          </Link>
          {/* <Link 
            to="/results" 
            className={isActive('/results') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Results
          </Link> */}
          {/* <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link> */}
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