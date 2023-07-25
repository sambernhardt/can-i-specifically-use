import { Box, Flex, Text } from 'theme-ui';
import { DecoratedUsageDataType } from '../types';
import { Fragment } from 'react';

const CompatibilityTable = ({ data }: { data: DecoratedUsageDataType[] }) => {
  const tableContents: {
    header: string,
    cell: (d: DecoratedUsageDataType, idx: number) => string | JSX.Element,
  }[] = [
    {
      header: 'Browser',
      cell: d => d.Browser,
    },
    {
      header: 'Version',
      cell: (d, rowIndex) => (
        <Flex
          sx={{
            gap: '2px',
            fontFamily: 'monospace'
          }}
        >
          {d['Browser Version'].split('.').map((part: string, partIdx) => (
            <Fragment key={[d.Browser, d['Browser Version'], rowIndex, partIdx].join('-')}>
              <Text sx={{ fontFamily: 'inherit' }}>
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
      )
    },
    {
      header: 'Device category',
      cell: d => d['Device Category'],
    },
    {
      header: 'Users',
      cell: d => d['Users'],
    },
    {
      header: 'Compatible',
      cell: d => {
        if (d.Compatible === null) {
          return 'Unknown'
        } else {
          return d['Compatible'] ? 'Yes' : 'No'
        }
      }
    },
  ];

  return (
    <Box
      as="table"
      sx={{
        fontFamily: 'body',
        width: '100%',
        fontSize: 1,
        textAlign: 'left',
        'tr td, tr th': {
          py: 3,
          borderBottom: '1px solid',
          borderColor: 'borderNeutralPrimary',
        },
      }}
    >
      <thead>
        <tr>
          {tableContents.map(({ header }) => (
            <th key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, rowIdx: any) => (
          <tr key={`row-${rowIdx}`}>
            {tableContents.map(({ cell }, cellIdx) => (
              <Box
                as="td"
                key={`cell-${rowIdx}-${cellIdx}`}
                sx={{
                  fontFamily: 'monospace'
                }}
              >
                {cell(row, rowIdx)}
              </Box>
            ))}
          </tr>
        ))}
      </tbody>
    </Box>
  )
}

export default CompatibilityTable