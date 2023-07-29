import _ from 'lodash';
import { Box, Flex } from 'theme-ui';
import { CheckCircle, WarningCircle } from 'iconoir-react';

import Message from './Message';
import SupportCard from './SupportCard';

import FakeTable from './FakeTable';
import SupportCardWrapper from './SupportCardWrapper';

const PlaceholderDetail = ({ selectedFeatureCompatibilityData }: { selectedFeatureCompatibilityData: any }) => {
  return (
    <Flex
      sx={{
        position: 'relative',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
      filter: 'blur(5px)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          background: theme => `linear-gradient(180deg, transparent 0%, ${theme.colors!.background} 100%)`,
          width: '100%',
          height: '100%',
        }}
      />
      <Message
        palette="neutral"
        icon={WarningCircle}
        heading="No usage data uploaded"
      >
        Upload a CSV file with your usage data to see how many users are affected by this feature. Upload a CSV file with your usage data to see how many users are affected by this feature.
      </Message>
      <Flex
        sx={{
          gap: 4,
          width: '100%',
        }}
      >
        <SupportCardWrapper>
          <SupportCard
            label="Supported"
            stat={`${30}%`}
            icon={CheckCircle}
            subtext={`99 users`}
          />
        </SupportCardWrapper>
        <SupportCardWrapper>
          <SupportCard
            label="Not supported"
            stat={`${70}%`}
            icon={WarningCircle}
            subtext={`3 users`}
          />
        </SupportCardWrapper>
      </Flex>
      <FakeTable selectedFeatureCompatibilityData={selectedFeatureCompatibilityData} />
    </Flex>
  )
}

export default PlaceholderDetail