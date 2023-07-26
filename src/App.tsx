import { Box, Divider, Flex, Heading, Link, Text } from "theme-ui"
import FeatureInputSearch from "./components/FeatureSearchInput"
import FeatureDetail from "./components/FeatureDetail"
import ThemeSwitcher from "./components/ThemeSwitcher";
import exampleData from './exampleData.csv?raw';
import usePersistedState from "./hooks/usePersistedState";
import UsageDataInput from "./components/input/UsageDataInput";

const HEADER_HEIGHT = '80px';

export type CSVDataType = {
  name: string;
  data: string;
  uploadedAt: string;
}

const App = () => {
  const [csvData, setCSVData] = usePersistedState<CSVDataType | null>('csvData', {
    data: exampleData,
    name: 'exampleData.csv',
    uploadedAt: new Date().toISOString(),
  });

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
            lineHeight: '1em'
          }}
        >
          <Heading as="h4">Can I specifically use... ?</Heading>
          <Text
            sx={{
              display: 'block',
              color: 'textNeutralSecondary',
              fontSize: 1,
              mt: 1,
            }}
          >Check browser compatibility for your actual usage data</Text>
        </Link>
        <ThemeSwitcher />
      </Flex>
      <Flex
        sx={{
          height: '100px',
          flexDirection: ['column', 'column', 'row'],
          minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
          p: [4, 5],
          gap: [4, 5],
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            gap: [4, 5],
            maxWidth: ['100%', '100%', '400px'],
            flex: 1,
          }}
        >
          <FeatureInputSearch />
          <UsageDataInput
            csvData={csvData}
            setCsvData={setCSVData}
          />
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
            flex: 3,
          }}
        >
          <FeatureDetail csvData={csvData ? csvData.data : ''} />
        </Box>
      </Flex>
    </Box>
  )
}

export default App