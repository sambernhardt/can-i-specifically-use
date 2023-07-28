import { Button, Flex, useThemeUI } from "theme-ui"
import FeatureInputSearch from "./FeatureSearchInput"
import UsageDataInput from "./input/UsageDataInput"
import { FC, useState } from "react"
import { CSVDataType } from "../types"
import useBreakpoint from "../hooks/useBreakpoint"
import { Db, NavArrowUp } from "iconoir-react"
import Icon from "./Icon"

interface Props {
  csvData?: CSVDataType | null,
  setCsvData?: any,
}

const LeftColumn: FC<Props> = ({ csvData, setCsvData }) => {
  const { theme } = useThemeUI();
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
        gap: [4, 5],
        maxWidth: ['100%', '100%', '400px'],
        minWidth: ['100%', '300px'],
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
  )
}

export default LeftColumn