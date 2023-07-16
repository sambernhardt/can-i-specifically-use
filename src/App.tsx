import bcd from '@mdn/browser-compat-data';
import { useMemo, useState } from 'react'
import './App.css'
import { makeGenericMdnDocsUrl, recursivelyGetFeatures } from './utils';

const { 
  __meta,
  browsers,
  ...bcdData
} = bcd as any;

function App() {
  const bcdDataAsKeys = useMemo(() => {
    const compatData: any = {};
    recursivelyGetFeatures(bcdData, '', compatData);
    return compatData;
  }, []);

  const [search, setSearch] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('');
  const selectedFeatureData = bcdDataAsKeys[selectedFeature];

  const results = useMemo(() => {
    const searchTerm = search.toLowerCase();
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    // Search by key name
    const filteredCompatDataKeys = Object.keys(bcdDataAsKeys)
      .filter((key: string) => {
        const keyWithoutSpecialChars = key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const searchTermWithoutSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const nameMatch = keyWithoutSpecialChars.includes(searchTermWithoutSpecialChars);
        if (nameMatch) {
          return true;
        }

        if (bcdDataAsKeys[key]?.mdn_url) {
          const mdnUrlMatch = bcdDataAsKeys[key].mdn_url.toLowerCase().includes(makeGenericMdnDocsUrl(searchTerm.toLowerCase()));
          return mdnUrlMatch;

        } else {
          return false;
        }


      }).map((key: string) => {
        return {
          key,
          ...bcdDataAsKeys[key],
        };
      });

    return filteredCompatDataKeys;

  }, [search, bcdDataAsKeys]);

  return (
    <>
      {selectedFeature ? (
        <div>
          <h4><code>{selectedFeatureData.category}</code></h4>
          <h3>{selectedFeatureData.pathWithoutCategory}</h3>
          <button onClick={() => setSelectedFeature('')}>Clear</button>
          <pre>
            {JSON.stringify(selectedFeatureData, null, 2)}
          </pre>
        </div>
      ) : (
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
      )}
      <h3>Results</h3>
      {results.map((result: any) => (
        <div key={result.key}>
          <button onClick={() => setSelectedFeature(result.key)}>
            <code>{result.category}</code>
            {result.pathWithoutCategory.split('.')}
          </button>
        </div>
      ))}
    </>
  )
}

export default App
