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
    <Box
      sx={{
        display: 'block',
        width: '100%',
        borderRadius: '16px',
        p: 5,
        gap: 4,
        bg: 'backgroundSurface',
      }}
    >
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Label>{label}</Label>
        <Icon icon={icon} />
      </Flex>
      <Text
        sx={{
          display: 'block',
          fontSize: 7,
          fontWeight: 'bold',
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
  )
}

export default SupportCard