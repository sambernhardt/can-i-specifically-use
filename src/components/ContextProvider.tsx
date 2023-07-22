import React, { FC, PropsWithChildren, useContext, useState } from 'react'
import { get } from 'lodash';
import { useLoaderData, useParams } from 'react-router-dom';
import { FeatureType } from '../utils';
import { bcdDataAsKeys } from '../data';

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
  const { featureId } = useLoaderData();
  const [selectedFeatureId, setSelectedFeatureId] = useState(featureId ? featureId.replace(/\+/g, '.') : '');
  const selectedFeature = get(bcdDataAsKeys, selectedFeatureId);

  const context = {
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