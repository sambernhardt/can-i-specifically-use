import { forwardRef } from 'react'
import { Box, Button, Flex, Input, Link, Text } from 'theme-ui';
import Fieldset from '../Fieldset';
import Icon from '../Icon';
import { Cancel, CloudUpload } from 'iconoir-react';
import { CSVDataType } from '../../App';
import moment from 'moment';

interface UsageDataInputProps {
  csvData?: CSVDataType | null,
  setCSVData?: any,
  handleFileUpload?: any,
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
  setCSVData,
  handleFileUpload,
}, ref) => {

  return (
    <Fieldset
      label="Usage data"
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
              onClick={() => {
                setCSVData(null);
              }}
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
        </>
      )}
    </Fieldset>
  )
});

export default UsageDataInput