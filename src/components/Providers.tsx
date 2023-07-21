import React, { PropsWithChildren } from 'react'
import ThemeProvider from './theme/ThemeProvider';

const Providers: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </>
);

export default Providers