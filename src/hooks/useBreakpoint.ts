import React from 'react'

const useBreakpoint = (breakpoint: string) => {
  let direction: string;
  if (breakpoint.slice(0, 1) === '>') {
    direction = 'min'
  } else if (breakpoint.slice(0, 1) === '<') {
    direction = 'max'
  } else {
    throw new Error('Invalid breakpoint')
  }

  const [matches, setMatches] = React.useState(false)
  const [, setMediaQueryList] = React.useState<MediaQueryList | null>(null)

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(`(${direction}-width: ${breakpoint.slice(1)})`)
    setMediaQueryList(mediaQueryList)
    setMatches(mediaQueryList.matches)

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQueryList.addEventListener('change', listener)

    return () => {
      mediaQueryList.removeEventListener('change', listener)
    }
  }, [breakpoint])

  return matches
}

export default useBreakpoint