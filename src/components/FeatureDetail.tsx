import _, { get } from 'lodash';
import { Box, Flex, Heading, Link, Text } from 'theme-ui';
import { CheckCircle, WarningCircle, Link as LinkIcon, HelpCircle } from 'iconoir-react';
import { useLoaderData } from 'react-router-dom';

import CategoryBadge from './CategoryBadge';
import Message from './Message';
import SupportCard from './SupportCard';
import Icon from './Icon';
import { bcdData, bcdDataAsKeys } from '../mdnData';

import useCanIUseData from '../hooks/useCanIUseData';
import SupportTable from './SupportTable';
import PlaceholderDetail from './PlaceholderDetail';
import { Fragment, ReactNode, useState } from 'react';

export type SupportStatusShape = {
  icon: React.FC,
  heading: string,
  message: string,
  palette: 'success' | 'warning' | 'danger',
}

const supportStatuses: Record<string, SupportStatusShape> = {
  completelySupported: {
    icon: CheckCircle,
    heading: 'Completely supported',
    message: `The selected API is supported by all of the browsers in your usage data. You can safely use this API without any fallbacks or polyfills.`,
    palette: 'success',
  },
  veryWellSupported: {
    icon: CheckCircle,
    heading: 'Very well-supported',
    message: `The selected API is widely supported by most modern browsers, but it's recommended to have fallback options in place for a small percentage of users who may encounter compatibility issues.`,
    palette: 'success',
  },
  moderatelySupported: {
    icon: WarningCircle,
    heading: 'Moderately supported',
    message: `The selected API has moderate support across various browsers, making it a viable choice for a significant portion of users. However, be aware that some browsers may have limitations or inconsistencies. Thorough testing and graceful fallback options are advised.`,
    palette: 'warning',
  },
  notWellSupported: {
    icon: WarningCircle,
    heading: 'Not well-supported',
    message: `Consider exploring alternative solutions or providing alternative workflows to accommodate users who may not have access to this API. Testing and graceful degradation strategies are essential.`,
    palette: 'danger',
  },
  notSupportedAtAll: {
    icon: WarningCircle,
    heading: 'Not supported at all',
    message: `This API is not supported by any of the browsers in your usage data. Consider exploring alternative APIs to achieve the same functionality.`,
    palette: 'danger',
  }
};

export type SupportStatusKey = keyof typeof supportStatuses;

// The smaller the length, the larger the font size
// function calculateFontSize(length: number) {
//   const fontSizeMin = 42;
//   const fontSizeMax = 74;
//   const characterLengthMin = 10;
//   const characterLengthMax = 40;

//   // Interpolate the font size based on the length of the title
//   if (length <= characterLengthMin) {
//     return fontSizeMax;
//   } else if (length >= characterLengthMax) {
//     return fontSizeMin;
//   } else { 
//     const slope = (fontSizeMax - fontSizeMin) / (characterLengthMin - characterLengthMax);
//     const yIntercept = fontSizeMax - (slope * characterLengthMin);
//     return (slope * length) + yIntercept;
//   }
// }

// // The smaller the length, the larger the font size
// function calculateFontSizeMobile(length: number) {
//   const fontSizeMin = 22;
//   const fontSizeMax = 52;
//   const characterLengthMin = 10;
//   const characterLengthMax = 40;

//   // Interpolate the font size based on the length of the title
//   if (length <= characterLengthMin) {
//     return fontSizeMax;
//   } else if (length >= characterLengthMax) {
//     return fontSizeMin;
//   } else { 
//     const slope = (fontSizeMax - fontSizeMin) / (characterLengthMin - characterLengthMax);
//     const yIntercept = fontSizeMax - (slope * characterLengthMin);
//     return (slope * length) + yIntercept;
//   }
// }

function addWordBreaks(text: string): ReactNode[] {
  if (text.includes('-')) {
    // Split on hyphens
    return text.split('-').map((word, index) => (
      <Fragment key={index}>
        {word}
        {index < text.split('-').length - 1 && '-'}
        <wbr />
      </Fragment>
    ));

  } else if (text.includes('_')) {
    // Split on hyphens
    return text.split('_').map((word, index) => (
      <Fragment key={index}>
        {word}
        {index < text.split('_').length - 1 && '_'}
        <wbr />
      </Fragment>
    ));

  } else {
    // Split on camelCase
    return text.split(/(?=[A-Z])/).map((word, index) => (
      <Fragment key={index}>
        {word}
        <wbr />
      </Fragment>
    ));
  }

}

const FeatureDetail = ({ csvData }: { csvData: any }) => {
  const [numberOfRowsToShow, setNumberOfRowsToShow] = useState(10);
  const { featureId } = useLoaderData() as { featureId: string };

  const featureIdPath = featureId.replace(/\+/g, '.');
  const selectedFeature = get(bcdDataAsKeys, featureIdPath);
  const selectedFeatureCompatibilityData = get(bcdData, selectedFeature.path + '.__compat.support', '');

  function handleShowMore() {
    setNumberOfRowsToShow(r => r + 10);
  }

  const {
    parsedCSVData,
    percentageSupported,
    percentageNotSupported,
    percentageUnknown,
    numberSupported,
    numberNotSupported,
    numberUnknown,
    supportMessageKey,
    error
  } = useCanIUseData(csvData, selectedFeatureCompatibilityData);

  const supportStatus = supportStatuses[supportMessageKey];
  const supportedStats = [
    {
      label: 'Supported',
      stat: percentageSupported,
      units: '%',
      icon: CheckCircle,
      subtext: `${numberSupported.toLocaleString()} user${numberSupported === 1 ? "" : "s"}`,
    },
    {
      label: 'Not supported',
      stat: percentageNotSupported,
      units: '%',
      icon: WarningCircle,
      subtext: `${numberNotSupported.toLocaleString()} user${numberNotSupported === 1 ? "" : "s"}`,
    },
    {
      label: 'Unkown',
      stat: percentageUnknown,
      units: '%',
      icon: HelpCircle,
      subtext: `${numberUnknown.toLocaleString()} user${numberUnknown === 1 ? "" : "s"}`,
    },
  ].filter(stat => stat.stat > 0);

  return (
    <Box
      sx={{
        maxWidth: '1000px',
        mb: 4
      }}
    >
      {featureIdPath ? (
        <div>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: [3, 4],
            }}
          >
            <Flex
              sx={{
                flexDirection: 'column',
                gap: 1,
                width: '100%',
              }}
            >
              <Flex
                sx={{
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <CategoryBadge category={selectedFeature.category} />
                {selectedFeature.parentPath && (
                  <Text
                    sx={{
                      fontWeight: 'normal',
                      color: 'textNeutralSecondary',
                    }}
                  >
                    {selectedFeature.parentPath.split('.').join('.')}&nbsp;
                  </Text>
                )}
              </Flex>
              <Flex
                sx={{
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%',
                  flexWrap: 'wrap',
                  gap: 3,
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    // fontSize: [
                    //   calculateFontSizeMobile(selectedFeature.name.length),
                    //   calculateFontSize(selectedFeature.name.length),
                    // ],
                    fontSize: [6, 8],
                    wordBreak: 'break-word',
                    lineHeight: 1,
                  }}
                >
                  {addWordBreaks(selectedFeature.name)}
                </Heading>
                <Link
                  href={selectedFeature.mdn_url}
                  target="_blank"
                  sx={{
                    fontFamily: 'body',
                    display: selectedFeature.mdn_url ? 'inline-flex' : 'none',
                    alignItems: 'center',
                    textDecoration: 'none',
                    gap: 2,
                    cursor: 'pointer',
                    px: 3,
                    py: 2,
                    borderRadius: '8px',
                    fontSize: 1,
                    color: 'textNeutralPrimary',
                    bg: 'backgroundSurface',
                    border: '1px solid',
                    borderColor: 'borderNeutralPrimary',
                    boxShadow: 'default',

                    opacity: selectedFeature.mdn_url ? 1 : 0,
                    pointerEvents: selectedFeature.mdn_url ? 'auto' : 'none',
                  }}
                >
                  View on MDN
                  <Icon icon={LinkIcon} sx={{ fontSize: 0 }} />
                </Link>
              </Flex> 
            </Flex>
            {error && (
              <Message
                heading="Error"
                icon={WarningCircle}
                palette="danger"
              >
                {error}
              </Message> 
            )}
            {csvData ? (
              <>  
                <Message
                  heading={supportStatus.heading}
                  icon={supportStatus.icon}
                  palette={supportStatus.palette}
                >
                  {supportStatus.message}
                </Message>
                <Flex
                  sx={{
                    gap: [3, 4],
                    width: '100%',
                    flexWrap: 'wrap',
                  }}
                >
                  {supportedStats.map(stat => (
                    <SupportCard key={stat.label} {...stat} />
                  ))}
                </Flex>
                <Box
                  sx={{
                    overflow: 'visible',
                    width: '100%',
                    mb: 5,
                  }}
                >
                  <SupportTable
                    data={parsedCSVData}
                    limit={numberOfRowsToShow}
                    onShowMore={handleShowMore}
                  />
                </Box>
              </>
            ) : (
              <PlaceholderDetail
                selectedFeatureCompatibilityData={selectedFeatureCompatibilityData}
              />
            )}
          </Flex>
        </div>
      ) : (
        <p>Nothing selected</p>
      )}
      {/* <pre>
        {csvData}
      </pre>
      <pre>
        {JSON.stringify(selectedFeatureCompatibilityData, null, 2)}
      </pre> */}
    </Box>
  );
}

const FeatureDetailContainer = ({ csvData }: { csvData: any }) => {
  const { featureId } = useLoaderData() as { featureId: string };

  if (!featureId) {
    return (
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 4,
          color: 'textNeutralSecondary',
        }}
      >
        <Text
          sx={{
            fontSize: 4,
            color: 'inherit'
          }}
        >
          “I wonder if we can use this feature with our current users”
        </Text>
        <Text
          sx={{
            fontSize: 2,
            color: 'inherit'
          }}
        >
          - Me, frequently
        </Text>
      </Flex>
    );
  }

  return (
    <FeatureDetail csvData={csvData} />
  );
}

export default FeatureDetailContainer;
