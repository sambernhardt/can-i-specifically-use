import { FC } from 'react'
import { Box, BoxProps } from 'theme-ui'

interface Props extends BoxProps {
  category: 'html' | 'css' | 'api' | 'webextensions',
  size?: 'sm' | 'md',
}

const sizeLookup = {
  sm: {
    borderRadius: '12px',
    fontSize: 0,
    py: '2px',
    px: '5px',
    color: 'textNeutralSecondary',
  },
  md: {
    borderRadius: '20px',
    fontSize: 1,
    p: '8px',
    px: '12px',
  }
}

const CategoryBadge: FC<Props> = ({
  category,
  size = 'md',
  sx
}) => {
  return (
    <Box
      sx={{
        fontFamily: 'body',
        display: 'inline-block',
        lineHeight: 1,
        color: 'textNeutralPrimary',
        border: '1px solid',
        borderColor: 'borderNeutralPrimary',
        ...sizeLookup[size],
        ...sx,
      }}
    >
      {category}
    </Box>
  )
}

export default CategoryBadge