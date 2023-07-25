import { Box } from 'theme-ui';

const CompatibilityTable = ({ data }: { data: any }) => {

  const tableContents: {
    header: string,
    cell: (d: any) => string,
  }[] = [
    {
      header: 'Browser',
      cell: d => d['Browser'],
    },
    {
      header: 'Version',
      cell: d => d['Browser Version'],
    },
    {
      header: 'Device category',
      cell: d => d['Device Category'],
    },
    // {
    //   header: 'Browser key',
    //   cell: d => d['Browser key'],
    // },
    {
      header: 'Users',
      cell: d => d['Users'],
    },
    {
      header: 'Compatible',
      cell: d => d['Compatible'],
    },
    // {
    //   header: 'Support added',
    //   cell: d => d['Support added'],
    // },
    // {
    //   header: 'Notes',
    //   cell: d => d['Notes'],
    // },
  ]

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
        {data.map((row: any, idx: any) => (
          <tr key={`row-${idx}`}>
            {tableContents.map(({ cell }, idx) => (
              <td key={`cell-${idx}`}>
                {cell(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Box>
  )
}

export default CompatibilityTable