import { Box, Button, Flex, Link, Text, useThemeUI } from "theme-ui"
import FeatureInputSearch from "./FeatureSearchInput"
import UsageDataInput from "./input/UsageDataInput"
import { FC, useState } from "react"
import { CSVDataType } from "../types"
import useBreakpoint from "../hooks/useBreakpoint"
import { Db, GithubCircle, Internet, NavArrowUp } from "iconoir-react"
import Icon from "./Icon"

interface Props {
  csvData?: CSVDataType | null,
  setCsvData?: any,
}

const FooterIconLink: FC<{ href: string, icon: any }> = ({ href, icon }) => {
  const theme = useThemeUI().theme as any;

  return (
    <Link
      href={href}
      target="_blank"
      sx={{
        ...theme.buttons.ghost,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '44px',
        width: '44px',
        fontSize: 0,
      }}
    >
      <Icon icon={icon} />
    </Link>
  )
}

export const FooterContent = () => (
  <Flex
    sx={{
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Text
      sx={{
        fontSize: 0,
        color: 'textNeutralSecondary',
      }}
    >
      Made by Sam Bernhardt
    </Text>
    <Flex
      sx={{ gap: 1 }}
    >
      <FooterIconLink
        href="https://github.com/sambernhardt"
        icon={GithubCircle} />
      <FooterIconLink
        href="https://www.samuelbernhardt.com/"
        icon={Internet} />
    </Flex>
  </Flex>
);

const LeftColumn: FC<Props> = ({ csvData, setCsvData }) => {
  const { theme } = useThemeUI() as any;
  const isMobile = useBreakpoint('<' + theme.breakpoints[0]);
  const [showUsageDataInput, setShowUsageDataInput] = useState(false);

  function handleSetCSVData(data: CSVDataType) {
    if (data !== null) {
      setShowUsageDataInput(false);
    }
    setCsvData(data);
  }

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        maxWidth: ['100%', '100%', '400px'],
        minWidth: ['100%', '300px'],
        gap: 5,
        flex: 1,
        height: '100%'
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          gap: [4, 5],
          flex: 1,
        }}
      >
        <Flex
          sx={{
            width: '100%',
            gap: 2,
          }}
        >
          <FeatureInputSearch />
          {isMobile &&
            <Button
              onClick={() => setShowUsageDataInput(!showUsageDataInput)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: '12px',
                fontSize: 1,

                // border: '1px solid',
                // borderColor: 'borderFocus',
                // boxShadow: 'focus',
              }}
            >
              {csvData ? 'Edit' : 'Add'}
              <Icon icon={showUsageDataInput ? NavArrowUp : Db} />
            </Button>
          }
        </Flex>
        {(!isMobile || (isMobile && showUsageDataInput)) && (
          <UsageDataInput
            csvData={csvData}
            setCsvData={handleSetCSVData}
          />
        )}
      </Flex>
      <Box
        sx={{
          display: ['none', 'none', 'block']
        }}
      >
        <FooterContent />
      </Box>
    </Flex>
  )
}

export default LeftColumn