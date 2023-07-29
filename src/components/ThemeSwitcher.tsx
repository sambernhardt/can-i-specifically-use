import { HalfMoon, SunLight } from 'iconoir-react';
import { Button, useColorMode } from 'theme-ui'
import Icon from './Icon';

const ThemeSwitcher = () => {
  const [mode, setMode] = useColorMode()

  return (
    <Button
      variant="ghost"
      onClick={() => {
        const next = mode === 'dark' ? 'light' : 'dark';
        const stylesheet = document.createElement('style');
        stylesheet.innerHTML = `* { transition-duration: 0s !important; }`;
        document.head.appendChild(stylesheet);
        setMode(next);

        setTimeout(() => {
          stylesheet.remove();
        }, 100)

      }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '44px',
        width: '44px',
        borderRadius: '8px',
        fontSize: 1,
        p: 2,
      }}
    >
      <Icon icon={mode === 'dark' ? HalfMoon : SunLight} sx={{ fontSize: 0 }} />
    </Button>
  )
}

export default ThemeSwitcher