import { useLayoutEffect } from "react";
import { Box, Divider, Flex, Heading, Link, Text } from "theme-ui"
import FeatureInputSearch from "./components/FeatureSearchInput"
import FeatureDetail from "./components/FeatureDetail"
import ThemeSwitcher from "./components/ThemeSwitcher";
import { useLoaderData } from "react-router-dom";
import { useGlobalContext } from "./components/ContextProvider";
import Fieldset from "./components/Fieldset";
import TextInput from "./components/input/TextInput";

const HEADER_HEIGHT = '80px';

const App = () => {
  const { setSelectedFeatureId } = useGlobalContext();
  const { featureId } = useLoaderData() as { featureId: string };

  useLayoutEffect(() => {
    if (featureId) {
      const featureIdKey = featureId.replace(/\+/g, '.');
      setSelectedFeatureId(featureIdKey);
    }
  }, [featureId]);

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
          <Heading as="h4">Can I specifically use... ?</Heading>
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
          flexDirection: ['column', 'column', 'row'],
          height: `calc(100vh - ${HEADER_HEIGHT})`,
          p: [4, 6],
          gap: [4, 6],
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
            label="Usage data"
            labelAction={(
              <Link
                sx={{
                  fontSize: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                Edit dataset
              </Link>
            )}
          >
            <TextInput
              placeholder="Search"
            />
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