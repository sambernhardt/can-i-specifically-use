import { Box, Divider, Flex, Heading, Link, Text } from "theme-ui"
import FeatureDetail from "./components/FeatureDetail"
import ThemeSwitcher from "./components/ThemeSwitcher";
import exampleData from './exampleData.csv?raw';
import usePersistedState from "./hooks/usePersistedState";
import { CSVDataType } from "./types";
import { validateAndParseCSVString } from "./utils";
import LeftColumn from "./components/LeftColumn";

const HEADER_HEIGHT = '80px';

const defaultCSVData = {
  name: 'exampleData.csv',
  uploadedAt: new Date().toISOString(),
  rawData: exampleData,
  parsedData: validateAndParseCSVString(exampleData),
};

const App = () => {
  const [csvData, setCsvData] = usePersistedState<CSVDataType | null>('csvData', defaultCSVData);

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
            lineHeight: '1em',
            mt: '7px'
          }}
        >
          <Heading
            as="h3"
            sx={{
              fontFamily: 'body'
            }}
          >Can I specifically use... ?</Heading>
          <Text
            sx={{
              display: 'block',
              color: 'textNeutralSecondary',
              fontSize: 0,
              mt: 1,
            }}
          >
            Browser compatibility for your actual usage data</Text>
        </Link>
        <ThemeSwitcher />
      </Flex>
      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          height: ['auto', `calc(100vh - ${HEADER_HEIGHT})`],
          p: [4, 5],
          gap: [4, 5],
        }}
      >
        <Box
          sx={{
            maxWidth: ['100%', '100%', '400px'],
            minWidth: ['100%', '300px'],
            flexShrink: 1,
          }}
        >
          <LeftColumn
            csvData={csvData}
            setCsvData={setCsvData}
          />  
        </Box>
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
            my: 2,
          }}
        />
        <Box
          sx={{
            flex: [1, 3],
          }}
        >
          <FeatureDetail csvData={csvData ? csvData.rawData : ''} />
        </Box>
      </Flex>
    </Box>
  )
}

export default App