import useCanIUseData from '../hooks/useCanIUseData';
import CompatibilityTable from './CompatibilityTable';
import exampleData from '../exampleData.csv?raw';

const FakeTable = ({ selectedFeatureCompatibilityData }: { selectedFeatureCompatibilityData: any }) => {
  const {
    parsedCSVData,
  } = useCanIUseData(exampleData, selectedFeatureCompatibilityData);

  return (
    <CompatibilityTable data={parsedCSVData} />
  )
}

export default FakeTable;