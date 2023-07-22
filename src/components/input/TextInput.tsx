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
          pl: leadingAdornment ? theme => theme.space[3] + ICON_WIDTH + theme.space[3] + 'px' : 3,
          pr: trailingAdornment ? theme => theme.space[3] + ICON_WIDTH + theme.space[3] + 'px' : 3,
          width: '100%',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: 'borderNeutralPrimary',
          boxShadow: 'default',
          transition: 'all 0.2s ease-in-out',

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