import { Box, Divider, Flex, Heading, Link, Text } from "theme-ui"
import FeatureInputSearch from "./components/FeatureSearchInput"
import FeatureDetail from "./components/FeatureDetail"
import ThemeSwitcher from "./components/ThemeSwitcher";
import Fieldset from "./components/Fieldset";
import TextInput from "./components/input/TextInput";
import Icon from "./components/Icon";
import { CloudUpload } from "iconoir-react";

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
        <Link
          href="/"
          sx={{
            color: 'textNeutralPrimary',
            textDecoration: 'none',
          }}
        >
          <Heading as="h4">Can I specifically use... ?</Heading>
          <Text
            sx={{
              color: 'textNeutralSecondary',
              fontSize: 1,
            }}
          >Check browser compatibility for your actual usage data</Text>
        </Link>
        <ThemeSwitcher />
      </Flex>
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          height: `calc(100vh - ${HEADER_HEIGHT})`,
          p: [4, 5],
          gap: [4, 5],
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            gap: [4, 5],
            maxWidth: ['100%', '100%', '300px'],
            flex: 1,
          }}
        >
          <FeatureInputSearch />
          <Fieldset
            label="Upload usage data"
          >
            <Flex
               sx={{
                flexDirection: 'column',
                alignItems: 'center',
                p: 5,
                gap: 2,
                width: '100%',
                borderRadius: '12px',
                border: '1px dashed',
                borderColor: 'borderNeutralPrimary',
                boxShadow: 'default',
                transition: 'all 0.2s ease-in-out',
      
                '&:focus': {
                  outline: 'none',
                  borderColor: 'borderFocus',
                  boxShadow: 'focus',
                },
              }}
            >
              <Icon
                icon={CloudUpload}
                sx={{
                  color: 'textNeutralSecondary',
                }}
              />
              <Text
                sx={{
                  color: 'textNeutralSecondary',
                  fontSize: 0,
                }}
              >
                Upload CSV
              </Text>
            </Flex>
            <Link
              sx={{
                display: 'inline-block',
                mt: 2,
                fontSize: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Download template
            </Link>
          </Fieldset>
        </Flex>
        <Box
          sx={{
            width: '1px',
            height: '100%',
            bg: 'borderNeutralPrimary',
            display: ['none', 'none', 'block'],  
          }}
        />
        <Divider
          sx={{
            display: ['block', 'block', 'none'],
            my: 3,
          }}
        />
        <Box
          sx={{
            flex: 2,
            maxWidth: '1000px',
          }}
        >
          <FeatureDetail />
        </Box>
      </Flex>
    </Box>
  )
}

export default App