import React, { FC, PropsWithChildren, useContext, useState } from 'react'
import bcd from '@mdn/browser-compat-data';
import { useMemo } from 'react'
import { FeatureType, recursivelyGetFeatures } from '../utils';
import { get } from 'lodash';

const { 
  __meta,
  browsers,
  ...bcdData
} = bcd as any;

type ContextType = {
  bcdData: any,
  bcdDataAsKeys: Record<string, FeatureType>,
  bcdDataAsArray: FeatureType[],
  selectedFeatureId: string,
  setSelectedFeatureId: (id: string) => void,
  selectedFeature: FeatureType,
}

export const GlobalContext = React.createContext({});

const ContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const bcdDataAsKeys: Record<string, FeatureType> = useMemo(() => {
    const compatData: any = {};
    recursivelyGetFeatures(bcdData, '', compatData);
    return compatData;
  }, []);
  const bcdDataAsArray: FeatureType[] = useMemo(() => {
    return Object.entries(bcdDataAsKeys).map(([, value]) => value);
  }, [bcdDataAsKeys]);

  const [selectedFeatureId, setSelectedFeatureId] = useState('');
  const selectedFeature = get(bcdDataAsKeys, selectedFeatureId);

  const context = {
    bcdData,
    bcdDataAsKeys,
    bcdDataAsArray,
    selectedFeatureId, setSelectedFeatureId,
    selectedFeature,
  }

  return (
    <GlobalContext.Provider value={context}>
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider

export const useGlobalContext = () => {
  const context = useContext(GlobalContext) as ContextType;
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a ContextProvider')
  }
  return context
}