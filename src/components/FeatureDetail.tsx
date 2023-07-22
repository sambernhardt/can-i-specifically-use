import { get } from 'lodash';
import { useGlobalContext } from './ContextProvider'
import { Heading, Text } from 'theme-ui';

const FeatureDetail = () => {
  const {
    bcdData,
    selectedFeatureId,
    setSelectedFeatureId,
    selectedFeature
  } = useGlobalContext();

  return (
    <div>
      {selectedFeatureId ? (
        <div>
          <Heading as="h3"><code>{selectedFeature.category}</code></Heading>
          <Heading as="h2" sx={{ fontSize: 6 }}>
            {selectedFeature.parentPath && (
              <Text>
                {selectedFeature.parentPath}&nbsp;
              </Text>
            )}
            {selectedFeature.name}
          </Heading>
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