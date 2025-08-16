import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import SpinnerProvider from './Components/Spinner/SpinnerProvider'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  // This will run once when component mounts (after refresh)
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Optional: Add smooth scrolling behavior
    const html = document.documentElement;
    html.style.scrollBehavior = 'smooth';
    
    // Clean up by removing smooth behavior
    return () => {
      html.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <SpinnerProvider>
        <Outlet />
      </SpinnerProvider>
    </>
  )
}

export default App;
