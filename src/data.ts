import bcd from '@mdn/browser-compat-data';
import { FeatureType, recursivelyGetFeatures } from './utils';
const { 
  __meta,
  browsers,
  ...bcdData
} = bcd as any;

const getBcdDataAsKeys = (): Record<string, FeatureType> => {
  const compatData: any = {};
  recursivelyGetFeatures(bcdData, '', compatData);
  return compatData;
};

export const bcdDataAsKeys: Record<string, FeatureType> = getBcdDataAsKeys();

export const bcdDataAsArray: FeatureType[] = Object.entries(bcdDataAsKeys).map(([, value]) => value);