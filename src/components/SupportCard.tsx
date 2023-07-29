import React, { FC } from 'react'
import { Box, Flex, Label, Text } from 'theme-ui'
import Icon from './Icon'

interface Props {
  label: string,
  icon: React.FC,
  stat: string | number,
  units?: string,
  subtext: string,
}

const SupportCard: FC<Props> = ({
  label,
  icon,
  stat,
  subtext,
  units,
}) => {
  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        width: '100%',
        gap: 3,
        flex: 1,
        minWidth: '160px',
        borderRadius: '16px',
        p: 4,
        bg: 'backgroundSurface',
      }}
    >
      <Icon icon={icon} />
      <Box>
        <Flex
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: ['2px', 2],
          }}
        >
          <Label sx={{ color: 'textNeutralSecondary' }}>{label}</Label>
        </Flex>
        <Text
          sx={{
            fontFamily: 'heading',
            display: 'block',
            fontSize: [5, 6],
            fontWeight: 600,
            mb: 3,
          }}
        >
          {stat}
          {units && (
            <Text sx={{ color: 'textNeutralSecondary', ml: 1, fontWeight: '400', fontSize: 4 }}>
              {units}
            </Text> 
          )}
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