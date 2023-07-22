import { useColorMode } from 'theme-ui'

const ThemeSwitcher = () => {
  const [mode, setMode] = useColorMode()

  return (
    <button
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
    >
      Toggle {mode === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}

export default ThemeSwitcher