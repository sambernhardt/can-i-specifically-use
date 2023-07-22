import { get } from 'lodash';
import { useGlobalContext } from './ContextProvider'
import { Button, Flex, Heading, Link, Text } from 'theme-ui';
import CategoryBadge from './CategoryBadge';
import Message from './Message';
import { CheckCircle, WarningCircle, Link as LinkIcon } from 'iconoir-react';
import SupportCard from './SupportCard';
import Icon from './Icon';

type SupportStatusType = {
  icon: React.FC,
  heading: string,
  message: string,
  palette: 'success' | 'warning' | 'danger',
}

const supportStatuses: Record<string, SupportStatusType> = {
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

const FeatureDetail = () => {
  const {
    bcdData,
    selectedFeatureId,
    selectedFeature
  } = useGlobalContext();

  const supportStatus = supportStatuses.veryWellSupported;

  return (
    <div>
      {selectedFeatureId ? (
        <div>
          <CategoryBadge category={selectedFeature.category} />
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontSize: 6,
                mb: 4,
              }}
            >
              {selectedFeature.parentPath && (
                <Text>
                  {selectedFeature.parentPath}&nbsp;
                </Text>
              )}
              {selectedFeature.name}
            </Heading>
            <Link
              href={selectedFeature.mdn_url}
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
          <Message
            heading={supportStatus.heading}
            icon={supportStatus.icon}
            palette={supportStatus.palette}
            sx={{
              mb: 4,
            }}
          >
            {supportStatus.message}
          </Message>
          <Flex
            sx={{
              gap: 4,
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
        </div>
      ) : (
        <p>Nothing selected</p>
      )}
    </div>
  );
}

export default FeatureDetail