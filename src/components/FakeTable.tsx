import useCanIUseData from '../hooks/useCanIUseData';
import SupportTable from './SupportTable';
import exampleData from '../exampleData.csv?raw';

const FakeTable = ({ selectedFeatureCompatibilityData }: { selectedFeatureCompatibilityData: any }) => {
  const {
    parsedCSVData,
  } = useCanIUseData(exampleData, selectedFeatureCompatibilityData);

  return (
    <SupportTable data={parsedCSVData} />
  )
}

export default FakeTable;