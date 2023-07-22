import React, { FC } from 'react'
import { Box, Flex, Label, Text } from 'theme-ui'
import Icon from './Icon'

interface Props {
  label: string,
  icon: React.FC,
  stat: string,
  subtext: string,
}

const SupportCard: FC<Props> = ({
  label,
  icon,
  stat,
  subtext,
}) => {
  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        width: '100%',
        borderRadius: '16px',
        p: 4,
        gap: 3,
        bg: 'backgroundSurface',
      }}
    >
      <Icon icon={icon} />
      <Box>
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Label sx={{ color: 'textNeutralSecondary' }}>{label}</Label>
        </Flex>
        <Text
          sx={{
            display: 'block',
            fontSize: [4, 6],
            mb: 3,
          }}
        >
          {stat}
        </Text>
        <Text
          sx={{
            color: 'textNeutralSecondary',
          }}
        >
          {subtext}
        </Text>
      </Box>
    </Flex>
  )
}

export default SupportCard