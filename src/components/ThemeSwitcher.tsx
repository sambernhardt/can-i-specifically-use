import { Button, useColorMode } from 'theme-ui'

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
        borderRadius: '8px',
        height: '40px',
        fontSize: 1,
      }}
    >
      {mode === 'dark' ? '☀️' : '🌙'}
    </Button>
  )
}

export default ThemeSwitcher