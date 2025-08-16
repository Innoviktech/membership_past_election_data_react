import React, { useState } from 'react';
import { SpinnerContext } from './SpinnerContext';
import SpinnerService from './SpinnerService';
import CustomSpinner from './CustomSpinner';

const SpinnerProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  SpinnerService.show = () => setIsLoading(true);
  SpinnerService.hide = () => setIsLoading(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      <CustomSpinner isVisible={isLoading} />
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
