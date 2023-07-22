import { FC } from 'react'
import { Box, BoxProps } from 'theme-ui'

interface Props extends BoxProps {
  category: 'html' | 'css' | 'api' | 'webextensions',
  size: 'sm' | 'md',
}

const sizeLookup = {
  sm: {
    borderRadius: '4px',
    fontSize: 1,
    p: 1,
  },
  md: {
    borderRadius: '16px',
    fontSize: 1,
    p: 3,
  }
}

const CategoryBadge: FC<Props> = ({ category, size, sx }) => {
  return (
    <Box
      sx={{
        lineHeight: 1,
        border: '1px solid',
        borderColor: 'borderNeutral',
        ...sizeLookup[size],
        ...sx,
      }}
    >
      {category}
    </Box>
  )
}

export default CategoryBadge