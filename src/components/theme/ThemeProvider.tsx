import { PropsWithChildren } from 'react'
import { ThemeUIProvider } from 'theme-ui'
import { theme } from './theme';

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ThemeUIProvider theme={theme}>
    {children}
  </ThemeUIProvider>
)

export default ThemeProvider