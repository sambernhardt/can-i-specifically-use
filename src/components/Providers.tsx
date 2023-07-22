import React, { PropsWithChildren } from 'react'
import ThemeProvider from './theme/ThemeProvider';
import ContextProvider from './ContextProvider';

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  
  return (
    <>
      <ThemeProvider>
        <ContextProvider>
          {children}
        </ContextProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers