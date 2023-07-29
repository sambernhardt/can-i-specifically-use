import { Box, Button, Flex, Text } from 'theme-ui';
import { DecoratedUsageDataType } from '../types';
import { FC, Fragment } from 'react';
import Icon from './Icon';
import { NavArrowDown } from 'iconoir-react';

type Props = {
  data: DecoratedUsageDataType[],
  limit?: number,
  onShowMore?: () => void,
}

const tableDefinition: {
  header: string,
  cell: (d: DecoratedUsageDataType, idx: number) => string | JSX.Element,
  width: string,
}[] = [
  {
    header: 'Browser',
    cell: d => d.Browser,
    width: '120px',
  },
  {
    header: 'Version',
    cell: (d, rowIndex) => (
      <Flex
        sx={{
          gap: '2px',
        }}
      >
        {d['Browser Version'].split('.').map((part: string, partIdx) => (
          <Fragment key={[d.Browser, d['Browser Version'], rowIndex, partIdx].join('-')}>
            <Text as="span" sx={{ fontFamily: 'inherit' }}>
              {part}
            </Text>
            <Text
              sx={{
                fontFamily: 'inherit',
                color: 'textNeutralSecondary',
                '&:last-of-type': {
                  display: 'none',
                },
              }}
            >
              .
            </Text>
          </Fragment>
        ))}
      </Flex>
    ),
    width: '140px',
  },
  {
    header: 'Device category',
    cell: d => d['Device Category'],
    width: '140px',
  },
  {
    header: 'Users',
    cell: d => d['Users'].toLocaleString(),
    width: '100px',
  },
  {
    header: 'Supported',
    cell: d => {
      if (d.Supported === null) {
        return 'Unknown'
      } else {
        return d['Supported'] ? 'Yes' : 'No'
      }
    },
    width: '100px',
  },
];

const SupportTable: FC<Props> = ({
  data,
  limit,
  onShowMore
}) => {
  const dataToShow = limit ? data.slice(0, limit) : data;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          overflowX: 'scroll',
        }}
      >
        <Box
          as="table"
          sx={{
            fontFamily: 'body',
            fontSize: 1,
            textAlign: 'left',
            width: '100%',
            tableLayout: 'fixed',
            borderCollapse: 'collapse',
            minWidth: tableDefinition.reduce((acc, { width }) => acc + parseInt(width) + 20, 0),

            'tr td, tr th': {
              py: 3,
              px: [3, 4],
              borderBottom: '1px solid',
              borderColor: 'borderNeutralPrimary',
            },
            'tr td:first-of-type, tr th:first-of-type': {
              // pl: 0,
            },
          }}
        >
          <thead>
            <tr>
              {tableDefinition.map(({ header }, headerIdx) => (
                <Box
                  as="th"
                  key={header}
                  sx={{
                    width: tableDefinition[headerIdx].width,
                    px: 3,
                    fontSize: 0,
                  }}
                >
                  {header}
                </Box>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((row: any, rowIdx: any) => (
              <tr key={`row-${rowIdx}`}>
                {tableDefinition.map(({ cell }, cellIdx) => (
                  <Box
                    as="td"
                    key={`cell-${rowIdx}-${cellIdx}`}
                    sx={{
                      fontSize: 2,
                      minWidth: tableDefinition[cellIdx].width,
                    }}
                  >
                    <Box
                      sx={{
                        width: tableDefinition[cellIdx].width,
                      }}
                    >
                      {cell(row, rowIdx)}
                    </Box>
                  </Box>
                ))}
              </tr>
            ))}
          </tbody>
        </Box>
      </Box>
      {limit && data.length > limit && (
        <Flex
          sx={{
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={onShowMore}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              mt: 3,
              borderRadius: '8px',
              fontSize: 1,
              gap: 2,
            }}
          >
            Show 10 more
            <Icon icon={NavArrowDown} />
          </Button>
        </Flex>
      )}
    </>
  )
}

export default SupportTable