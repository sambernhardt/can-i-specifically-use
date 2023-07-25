import { Box, Button, Divider, Flex, Heading, Input, Link, Text } from "theme-ui"
import FeatureInputSearch from "./components/FeatureSearchInput"
import FeatureDetail from "./components/FeatureDetail"
import ThemeSwitcher from "./components/ThemeSwitcher";
import Fieldset from "./components/Fieldset";
import Icon from "./components/Icon";
import { CloudUpload } from "iconoir-react";
import exampleData from './exampleData.csv?raw';
import usePersistedState from "./hooks/usePersistedState";

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

  function handleFileUpload(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target?.result;
      if (typeof csvData === 'string') {
        setCSVData({
          data: csvData,
          name: file.name,
          uploadedAt: new Date().toISOString(),
        });
      }
    }

    reader.readAsText(file);
  }

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
          minHeight: `calc(100vh - ${HEADER_HEIGHT})`,
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
          {csvData ? (
            <Fieldset
              label="Uploaded usage data"
            >
              <Button>
                {csvData.name}
              </Button>
              <Link
                sx={{
                  display: 'inline-block',
                  ml: 3,
                  fontSize: 0,
                  whiteSpace: 'nowrap',
                }}
                onClick={() => {
                  setCSVData(null);
                }}
              >
                Clear
              </Link>
            </Fieldset>  
          ) : (
            <>
              <Box>
                <Fieldset
                  label="Upload usage data"
                >

                  <Flex
                    sx={{
                      position: 'relative',
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
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
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
                </Fieldset>
                <Link
                  sx={{
                    display: 'inline-block',
                    mt: 3,
                    fontSize: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Download template
                </Link>
              </Box>
            </>
          )}
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