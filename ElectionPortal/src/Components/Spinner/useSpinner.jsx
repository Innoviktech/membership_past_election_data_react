import { useContext } from 'react';
import { SpinnerContext } from './SpinnerContext';

const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error('useSpinner must be used within SpinnerProvider');
  }
  return context;
};

export default useSpinner;
