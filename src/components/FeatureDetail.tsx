import { get } from 'lodash';
import { useGlobalContext } from './ContextProvider'
import { Button, Flex, Heading, Link, Text } from 'theme-ui';
import CategoryBadge from './CategoryBadge';
import Message from './Message';
import { CheckCircle, WarningCircle, Link as LinkIcon } from 'iconoir-react';
import SupportCard from './SupportCard';
import Icon from './Icon';
import { useState } from 'react';

type supportStatusTypes = 'veryWellSupported' | 'moderatelySupported' | 'notWellSupported';

type SupportStatusShape = {
  icon: React.FC,
  heading: string,
  message: string,
  palette: 'success' | 'warning' | 'danger',
}

const supportStatuses: Record<supportStatusTypes, SupportStatusShape> = {
  veryWellSupported: {
    icon: CheckCircle,
    heading: 'Very well supported',
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
    heading: 'Not well supported',
    message: `Consider exploring alternative solutions or providing alternative workflows to accommodate users who may not have access to this API. Testing and graceful degradation strategies are essential.`,
    palette: 'danger',
  },
};

// The smaller the length, the larger the font size
function calculateFontSize(length: number) {
  const fontSizeMin = 42;
  const fontSizeMax = 74;
  const characterLengthMin = 10;
  const characterLengthMax = 40;

  // Interpolate the font size based on the length of the title
  if (length <= characterLengthMin) {
    return fontSizeMax;
  } else if (length >= characterLengthMax) {
    return fontSizeMin;
  } else { 
    const slope = (fontSizeMax - fontSizeMin) / (characterLengthMin - characterLengthMax);
    const yIntercept = fontSizeMax - (slope * characterLengthMin);
    return (slope * length) + yIntercept;
  }
}

// The smaller the length, the larger the font size
function calculateFontSizeMobile(length: number) {
  const fontSizeMin = 22;
  const fontSizeMax = 52;
  const characterLengthMin = 10;
  const characterLengthMax = 40;

  // Interpolate the font size based on the length of the title
  if (length <= characterLengthMin) {
    return fontSizeMax;
  } else if (length >= characterLengthMax) {
    return fontSizeMin;
  } else { 
    const slope = (fontSizeMax - fontSizeMin) / (characterLengthMin - characterLengthMax);
    const yIntercept = fontSizeMax - (slope * characterLengthMin);
    return (slope * length) + yIntercept;
  }
}

const FeatureDetail = () => {
  const {
    bcdData,
    selectedFeatureId,
    selectedFeature
  } = useGlobalContext();

  const options: supportStatusTypes[] = ['veryWellSupported', 'moderatelySupported', 'notWellSupported'];
  const randomOption = Math.floor(Math.random() * options.length);
  const supportStatus = supportStatuses[options[randomOption]];

  return (
    <div>
      {selectedFeatureId ? (
        <div>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 4,
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
                    {selectedFeature.parentPath}&nbsp;
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
                    fontSize: [
                      calculateFontSizeMobile(selectedFeature.name.length),
                      calculateFontSize(selectedFeature.name.length),
                    ],
                  }}
                >
                  {selectedFeature.name}
                </Heading>
                <Link
                  href={selectedFeature.mdn_url}
                  target="_blank"
                  sx={{
                    display: 'inline-flex',
                    textDecoration: 'none',
                    alignItems: 'center',
                    gap: 2,
                    fontFamily: 'body',
                    cursor: 'pointer',
                    bg: 'backgroundSurface',
                    border: '1px solid',
                    borderColor: 'borderNeutralPrimary',
                    boxShadow: 'default',
                    color: 'textNeutralPrimary',
                    px: 3,
                    py: 2,
                    borderRadius: '8px',
                    fontSize: 2,
                  }}
                >
                  View on MDN
                  <Icon icon={LinkIcon} sx={{ fontSize: 0 }} />
                </Link>
              </Flex>
            </Flex>
            <Message
              heading={supportStatus.heading}
              icon={supportStatus.icon}
              palette={supportStatus.palette}
            >
              {supportStatus.message}
            </Message>
            <Flex
              sx={{
                gap: 4,
                width: '100%',
              }}
            >
              <SupportCard
                label="Supported"
                stat="92%"
                icon={CheckCircle}
                subtext='9,800 users'
              />
              <SupportCard
                label="Not supported"
                stat="8%"
                icon={WarningCircle}
                subtext='784 users'
              />
            </Flex>
            <pre>
              {JSON.stringify(selectedFeature, null, 2)}
            </pre>
            <pre>
              {JSON.stringify(get(bcdData, selectedFeature.path, ''), null, 2)}
            </pre>
          </Flex>
        </div>
      ) : (
        <p>Nothing selected</p>
      )}
    </div>
  );
}

export default FeatureDetail