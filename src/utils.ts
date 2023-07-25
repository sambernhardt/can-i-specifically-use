import { coerce, gte, valid } from "semver";
import { BrowserKeys, CompatibilityDataType } from "./types";
import { isArray } from "lodash";

function isObject(obj: any) {
  return (
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    obj !== null
  );
}

export function recursivelyGetCompatData(data: any, path: string, result: any) {
  if (data.__compat) {
    result[path] = data.__compat;
  }

  for (const key in data) {
    if (key === '__compat') {
      result[path] = data.__compat;
    } else if (isObject(data[key])) {
      const newPath = path ? path + '.' + key : key;
      recursivelyGetCompatData(data[key], newPath, result);
    }
  }
}

export function recursivelyGetFeatures(data: any, path: string, result: any, parentPath: any = null, level = 0) {
  for (const key in data) {
    // If an object has a __compat property, it's a feature that we need to index
    if (key === '__compat') {
      const category = path.split('.')[0];
      const pathWithoutCategory = path.replace(category + '.', '');

      result[path] = {
        name: path.split('.').pop(),
        path,
        searchablePath: pathWithoutCategory.replace(/\./g, ' '),
        category,
        mdn_url: data.__compat.mdn_url,
        spec_url: data.__compat.spec_url,
        parentPath: category === parentPath ? null : parentPath,
        // compatibilityData: data.__compat,
      };
    } else if (isObject(data[key])) {
      const newPath = path ? path + '.' + key : key;
      const category = path.split('.')[0];
      const pathWithoutCategory = path.replace(category + '.', '');

      recursivelyGetFeatures(data[key], newPath, result, pathWithoutCategory, level + 1);
    }
  }
}

export type FeatureType = {
  name: string;
  path: string;
  searchablePath: string;
  category: 'html' | 'css' | 'api' | 'webextensions';
  mdn_url: string;
  spec_url: string;
  parentPath: string | null;
}

export function makeGenericMdnDocsUrl(url: string) {
  return url.replace('/en-us/', '/');
}

export function parseCSV(csv: string): Record<string, string>[] {
  const rows = csv.split('\n');
  const headers = rows[0].split(',');
  const result: Record<string, string>[] = [];
  rows.slice(1).forEach(row => {
    const obj: any = {};
    const rowData = row.split(',');
    headers.forEach((header, i) => {
      obj[header] = rowData[i];
    });
    result.push(obj);
  });
  return result;
}

export function isCompatible(
  compatData: CompatibilityDataType,
  browserKey: BrowserKeys,
  version: string
): boolean | null {
  try {
    const compatibilityDataForBrowser = compatData[browserKey];
    let minimumCompatibleVersion = null;

    // TODO: Handle notes and flags
    if (isArray(compatibilityDataForBrowser)) {
      compatibilityDataForBrowser.forEach((compatibilityData) => {
        if (compatibilityData.version_added) {
          minimumCompatibleVersion = compatibilityData.version_added;
        }
      });
    } else {
      if (compatibilityDataForBrowser.version_added === false) {
        return false;
      }

      minimumCompatibleVersion = compatibilityDataForBrowser.version_added;
    }

    if (version === null || minimumCompatibleVersion === null) {
      console.error('Missing version or minimum compatible version');
      return false;
    }

    const validVersion = valid(coerce(version));
    const validMinimumCompatibleVersion = valid(coerce(minimumCompatibleVersion));

    if (validVersion !== null && validMinimumCompatibleVersion !== null) {
      return gte(validVersion, validMinimumCompatibleVersion);
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}