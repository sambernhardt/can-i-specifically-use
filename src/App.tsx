import { Box, Flex, Heading, Text } from "theme-ui"
import FeatureInputSearch from "./components/FeatureSearchInput"
import FeatureDetail from "./components/FeatureDetail"
import ThemeSwitcher from "./components/ThemeSwitcher";

const HEADER_HEIGHT = '80px';

const App = () => {
  return (
    <Box
      sx={{
        bg: 'background',
        color: 'textNeutralPrimary',
      }}
    >
      <Flex
        as="header"
        sx={{
          bg: 'backgroundSurface',
          px: 4,
          alignItems: 'center',
          justifyContent: 'space-between',
          height: HEADER_HEIGHT,
          borderBottom: '1px solid',
          borderColor: 'borderNeutralPrimary',
        }}
      >
        <div>
          <Heading as="h4">Can I specifically use?</Heading>
          <Text
            sx={{
              color: 'textNeutralSecondary',
              fontSize: 1,
            }}
          >Check browser compatibility for your actual usage data</Text>
        </div>
        <ThemeSwitcher />
      </Flex>
      <Flex
        sx={{
          height: `calc(100vh - ${HEADER_HEIGHT})`,
          p: 5,
          gap: 5,
        }}
      >
        <Box
          sx={{
            width: '400px',
          }}
        >
          <FeatureInputSearch />
        </Box>
        <Box
          sx={{
            flex: 1,
            maxWidth: '800px',
          }}
        >
          <FeatureDetail />
        </Box>
      </Flex>
    </Box>
  )
}

export default App