import bcd from '@mdn/browser-compat-data';
import { useMemo, useState } from 'react'
import './App.css'
import { recursivelyGetFeatures } from './utils';
import useDebouncedState from './hooks/useDebouncedState';
import { get } from 'lodash';
import Fuse from 'fuse.js';

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

  const bcdDataAsArray = useMemo(() => {
    return Object.entries(bcdDataAsKeys).map(([, value]) => value);
  }, [bcdDataAsKeys]);

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      keys: [
        'name',
        'searchablePath',
        'category',
      ],
    }
    
    return new Fuse(bcdDataAsArray, options)
  }, [bcdDataAsKeys]);

  const [debouncedSearch, search, setSearch] = useDebouncedState('');
  const [selectedFeatureId, setSelectedFeatureId] = useState('');
  const selectedFeature = get(bcdDataAsKeys, selectedFeatureId, {});

  const results = useMemo(() => {
    const results = fuse.search(debouncedSearch);
    return results.map((result: any) => result.item).splice(0, 100);

    // const searchTerm = debouncedSearch.toLowerCase();
    // if (!searchTerm || searchTerm.length < 2) {
    //   return [];
    // }

    // // Search by key name
    // const filteredCompatDataKeys = Object.keys(bcdDataAsKeys)
    //   .filter((key: string) => {
    //     const keyWithoutSpecialChars = key.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    //     const searchTermWithoutSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    //     const nameMatch = keyWithoutSpecialChars.includes(searchTermWithoutSpecialChars);
    //     if (nameMatch) {
    //       return true;
    //     }

    //     if (bcdDataAsKeys[key]?.mdn_url) {
    //       const mdnUrlMatch = bcdDataAsKeys[key].mdn_url.toLowerCase().includes(makeGenericMdnDocsUrl(searchTerm.toLowerCase()));
    //       return mdnUrlMatch;

    //     } else {
    //       return false;
    //     }


    //   }).map((key: string) => {
    //     return {
    //       key,
    //       ...bcdDataAsKeys[key],
    //     };
    //   });

    // return filteredCompatDataKeys;

  }, [debouncedSearch, bcdDataAsKeys]);

  return (
    <>
      {selectedFeatureId ? (
        <div>
          <h4><code>{selectedFeature.category}</code></h4>
          <h3>{selectedFeature.parentPath && <span>{selectedFeature.parentPath}&nbsp;</span>}{selectedFeature.name}</h3>
          <button onClick={() => setSelectedFeatureId('')}>Clear</button>
          <pre>
            {JSON.stringify(selectedFeature, null, 2)}
          </pre>
          <pre>
            {JSON.stringify(get(bcdData, selectedFeature.path, ''), null, 2)}
          </pre>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <h3>Results</h3>
          {results.map((result: any) => (
            <div key={result.path}>
              <button onClick={() => setSelectedFeatureId(result.path)}>
                <span>({result.category})&nbsp;</span>
                {result.parentPath && <span>{result.parentPath}&nbsp;</span>}
                {result.name}
              </button>
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default App
