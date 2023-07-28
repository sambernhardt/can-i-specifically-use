import React, { FC } from 'react'
import { Flex, FlexProps, Heading, Text } from 'theme-ui'
import Icon from './Icon'

const paletteLookup = {
  danger: {
    textPrimary: 'textDangerPrimary',
    textSecondary: 'textDangerSecondary',
    background: 'backgroundDangerAlpha',
  },
  neutral: {
    textPrimary: 'textNeutralPrimary',
    textSecondary: 'textNeutralSecondary',
    background: 'backgroundSurface',
  },
  success: {
    textPrimary: 'textSuccessPrimary',
    textSecondary: 'textSuccessSecondary',
    background: 'backgroundSuccessAlpha',
  },
  warning: {
    textPrimary: 'textWarningPrimary',
    textSecondary: 'textWarningSecondary',
    background: 'backgroundWarningAlpha',
  },
}

interface Props extends FlexProps {
  heading?: string,
  icon?: React.FC,
  children: React.ReactNode,
  palette?: keyof typeof paletteLookup,
  buttons?: React.ReactNode,
  buttonPosition?: 'inline' | 'stacked',
}

const Message: FC<Props> = ({
  icon,
  heading,
  children,
  palette = 'neutral',
  buttons,
  buttonPosition = 'inline',
  sx,
}) => {
  const {
    textPrimary,
    textSecondary,
    background,
  } = paletteLookup[palette]

  return (
    <Flex
      sx={{
        flexDirection: ['column', 'row'],
        borderRadius: '16px',
        width: '100%',
        p: 4,
        gap: 3,
        bg: background,
        color: textSecondary,
        ...sx,
      }}
    >
      {icon && (
        <Icon
          icon={icon}
          sx={{
            color: textSecondary,
            flexShrink: 0,
          }}
        />
      )}
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {heading && (
          <Heading
            as="h3"
            sx={{
              fontWeight: 500,
              color: textPrimary,
            }}
          >
            {heading}
          </Heading>
        )}
        <Text
          sx={{
            color: textSecondary,
            fontSize: 1,
          }}
        >
          {children}
        </Text>
        {buttonPosition === 'stacked' && buttons}
      </Flex>
      {buttonPosition === 'inline' && buttons}
    </Flex>
  )
}

export default Message