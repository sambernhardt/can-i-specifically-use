import { FC, PropsWithChildren } from "react"
import { Flex } from "theme-ui"


const SupportCardWrapper: FC<PropsWithChildren> = (props) => {
  return (
    <Flex
      sx={{
        flex: 1,
        minWidth: '160px',
        borderRadius: '16px',
        p: 4,
        gap: 3,
        bg: 'backgroundSurface',
      }}
      {...props}
    />
  )
}

export default SupportCardWrapper