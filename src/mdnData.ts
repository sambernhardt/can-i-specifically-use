import bcd from '@mdn/browser-compat-data';
import { FeatureType, recursivelyGetFeatures } from './utils';
const { 
  __meta,
  browsers,
  ..._bcdData
} = bcd as any;

export const bcdData = _bcdData;

const getBcdDataAsKeys = (): Record<string, FeatureType> => {
  const compatData: any = {};
  recursivelyGetFeatures(bcdData, '', compatData);
  return compatData;
};

export const bcdDataAsKeys: Record<string, FeatureType> = getBcdDataAsKeys();

export const bcdDataAsArray: FeatureType[] = Object.entries(bcdDataAsKeys).map(([, value]) => value);