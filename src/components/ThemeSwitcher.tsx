import { Button, Text, useColorMode } from 'theme-ui'

const ThemeSwitcher = () => {
  const [mode, setMode] = useColorMode()

  return (
    <Button
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
      sx={{
        borderRadius: '8px',
        height: '40px',
        fontSize: 1,
      }}
    >
      <Text
        sx={{
          display: ['none', 'inline-block']
        }}
      >Toggle theme&nbsp;&nbsp;</Text>
      {mode === 'dark' ? '☀️' : '🌙'}
    </Button>
  )
}

export default ThemeSwitcher