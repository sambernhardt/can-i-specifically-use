import { forwardRef, useState } from 'react'
import { Box, Button, Flex, Input, Select, Text } from 'theme-ui';
import Fieldset from '../Fieldset';
import Icon from '../Icon';
import { Cancel, CloudUpload } from 'iconoir-react';
import { CSVDataType } from '../../types';
import moment from 'moment';
import greatBrowserSupport from '../../exampleUsageData/greatBrowserSupport.csv?raw';
import moderateBrowserSupport from '../../exampleUsageData/greatBrowserSupport.csv?raw';
import poorBrowserSupport from '../../exampleUsageData/poorBrowserSupport.csv?raw';
import { validateAndParseCSVString } from '../../utils';

const presets = [
  {
    id: 'great-browser-support',
    label: 'Great',
    data: greatBrowserSupport,
  },
  {
    id: 'moderate-browser-support',
    label: 'Moderate',
    data: moderateBrowserSupport,
  },
  {
    id: 'poor-browser-support',
    label: 'Poor',
    data: poorBrowserSupport,
  },
]

interface UsageDataInputProps {
  csvData?: CSVDataType | null,
  setCsvData?: any,
}

const ICON_WIDTH = 20;

function formatUploadedDate(uploadedDate: string) {
  const date = moment(uploadedDate);

  // Just now - if less than 30 seconds ago
  if (date.isAfter(moment().subtract(30, 'seconds'))) {
    return 'just now';
  } else {
    return date.fromNow();
  }
}

const UsageDataInput = forwardRef<any, UsageDataInputProps>(({
  csvData,
  setCsvData,
}, ref) => {
  const [error, setError] = useState<string | undefined>(undefined);

  function createCSVData(data: string, name: string): CSVDataType {
    try {
      const parsedData = validateAndParseCSVString(data);
      return {
        rawData: data,
        parsedData,
        name,
        uploadedAt: new Date().toISOString(),
      }
    } catch (error) {
      throw new Error("Couldn't parse CSV data");
    }
  }

  function handleFileUpload(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target?.result;
      if (typeof csvData === 'string') {
        try {
          const _csvData = createCSVData(csvData,  file.name);
          setCsvData(_csvData);
          setError(undefined);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Something went wrong');
          }
        }
      }
    }

    reader.readAsText(file);
  }

  function handleUsePreset(e: any) {
    const presetId = e.target.value;
    const preset = presets.find(preset => preset.id === presetId);

    if (preset) {
      const _csvData = createCSVData(preset.data, preset.label);
      setCsvData(_csvData);
    } else {
      throw new Error(`No preset found with id ${presetId}`);
    }
  }

  return (
    <Fieldset
      label="Usage data"
      error={error}
      labelAction={(
        <Select
          onChange={handleUsePreset}
          value=""
          sx={{
            display: 'inline-block',
            bg: 'transparent',
            p: 0,
            border: 'none',
            fontFamily: 'body',
            color: 'textLink',
            fontSize: 0,

            '+ svg': {
              display: 'none',
            },

            '&:focus': {
              outline: 'none',
            },
          }}
        >
          <option value="" disabled selected>Use a preset</option>
          {presets.map(preset => (
            <option value={preset.id}>{preset.label}</option>
          ))}
        </Select>
      )}
    >
      {csvData ? (
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Flex
            ref={ref}
            sx={{
              flexDirection: 'column',
              gap: 1,
              p: 3,
              pr: 12 + ICON_WIDTH + 12 + 'px',
              width: '100%',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'borderNeutralPrimary',
              boxShadow: 'default',
              fontFamily: 'body',
            }}
          >
            {csvData.name}
            <Text
              sx={{
                fontSize: 0,
                color: 'textNeutralSecondary',
              }}
            >
              Uploaded {formatUploadedDate(csvData.uploadedAt)}
            </Text>
          </Flex>
          <Flex
            sx={{
              height: '100%',
              position: 'absolute',
              p: 2,
              top: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="ghost"
              onClick={() => setCsvData(null)}
              sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '8px',
              }}
            >
              <Icon icon={Cancel} />
            </Button>
          </Flex>
        </Box>
      ) : (
        <>
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
              borderColor: error ? 'red' : 'borderNeutralPrimary',
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
              Upload CSV of your usage data
            </Text>
          </Flex>
          {/* <Link
            sx={{
              display: 'inline-block',
              mt: 3,
              fontSize: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Download template
          </Link> */}
        </>
      )}
    </Fieldset>
  )
});

export default UsageDataInput