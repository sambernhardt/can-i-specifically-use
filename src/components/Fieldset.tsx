import { FC, PropsWithChildren } from 'react'
import { Box, Label, Text } from 'theme-ui'

interface FieldsetProps extends PropsWithChildren {
  label: string,
  error?: string,
}

const Fieldset: FC<FieldsetProps> = ({
  label,
  error,
  children
}) => {
  return (
    <Box>
      <Label
        sx={{
          mb: 2,
          pl: 2,
        }}
      >
        {label}
      </Label>
      {children}
      {error && (
        <Text as="p" sx={{ color: 'error' }}>
          {error}
        </Text>
      )}
    </Box>
  )
}

export default Fieldset