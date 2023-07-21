import React from 'react'
import { debounce } from 'lodash';

export function useDebouncedState<T>(
  initialValue: T,
  wait = 100,
  options: any = {}
): [
  T,
  T,
  React.Dispatch<React.SetStateAction<T>>
] {
  const [value, setValue] = React.useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = React.useState<T>(initialValue)

  React.useEffect(() => {
    const debounced = debounce(setDebouncedValue, wait, options)
    debounced(value)
    return debounced.cancel
  }, [value, wait, options])

  return [
    debouncedValue,
    value,
    setValue
  ]
}

export default useDebouncedState