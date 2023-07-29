import React, { forwardRef } from 'react'
import { Box, Input, InputProps } from 'theme-ui';

interface TextInputProps extends Omit<InputProps, 'ref'> {
  leadingAdornment?: React.ReactNode,
  trailingAdornment?: React.ReactNode,
}

const ICON_WIDTH = 20;

const TextInput = forwardRef<any, TextInputProps>(({
  leadingAdornment,
  trailingAdornment,
  sx,
  ...props
}, ref) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {leadingAdornment}
      <Input
        ref={ref}
        sx={{
          p: 3,
          pl: leadingAdornment ? 12 + ICON_WIDTH + 12 + 'px' : 3,
          pr: trailingAdornment ? 12 + ICON_WIDTH + 12 + 'px' : 3,
          width: '100%',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'borderNeutralPrimary',
          boxShadow: 'default',
          transition: 'all 0.2s ease-in-out',
          height: ['44px', '44px', 'auto'],

          '&:focus': {
            outline: 'none',
            borderColor: 'borderFocus',
            boxShadow: 'focus',
          },

          ...sx,
        }}
        {...props}
      />
      {trailingAdornment}
    </Box>
  )
});

export default TextInput