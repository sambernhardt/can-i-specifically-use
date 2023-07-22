import { FC } from "react"
import { Text, TextProps } from "theme-ui";

interface IconProps extends TextProps {
  icon: FC
}

const Icon: FC<IconProps> = ({ icon, sx }) => {
  const Component = icon;
  return (
    <Text
      sx={{
        display: 'inline-block',
        lineHeight: 0,
        color: 'textNeutralSecondary',
        ...sx,
      }}
    >
      <Component />
    </Text>
  )
}

export default Icon