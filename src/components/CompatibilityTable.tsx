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
    )
  },
  {
    header: 'Device category',
    cell: d => d['Device Category'],
  },
  {
    header: 'Users',
    cell: d => d['Users'].toLocaleString(),
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

const CompatibilityTable: FC<Props> = ({
  data,
  limit,
  onShowMore
}) => {
  const dataToShow = limit ? data.slice(0, limit) : data;

  return (
    <>
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
            {tableDefinition.map(({ header }) => (
              <th key={header}>
                {header}
              </th>
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

export default CompatibilityTable