import { FC, PropsWithChildren } from 'react'
import { Box, Flex, Label, Text } from 'theme-ui'

interface FieldsetProps extends PropsWithChildren {
  label: string,
  labelAction?: React.ReactNode,
  error?: string,
}

const Fieldset: FC<FieldsetProps> = ({
  label,
  error,
  children,
  labelAction
}) => {
  return (
    <Box>
      <Flex
        sx={{
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Label
          sx={{
            pl: 2,
            width: 'auto',
          }}
        >
          {label}
        </Label>
        {labelAction}
      </Flex>
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