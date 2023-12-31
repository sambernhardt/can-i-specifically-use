import { coerce, gte, valid } from "semver";
import { BrowserKeys, CompatibilityDataType, ParsedUsageDataArray, ParsedUsageDataArrayType } from "./types";
import { isArray } from "lodash";
import Papa from "papaparse";

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

export function parseCSV(csv: string): unknown[] {
  try {
    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    }).data;

    return parsed
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Could not parse CSV: ' + e.message);
    } else {
      throw new Error('Could not parse CSV');
    }
  }
}

export function validateAndParseCSVString(csv: string): ParsedUsageDataArrayType {
  const parsedCsv = parseCSV(csv);
  const validatedCsv = ParsedUsageDataArray.parse(parsedCsv);
  return validatedCsv;
}


export function isSupported(
  compatData: CompatibilityDataType,
  browserKey: BrowserKeys | null,
  version: string
): boolean | null {
  try {
    if (!browserKey || version === '(not set)') {
      return null;
    }

    const compatibilityDataForBrowser = compatData[browserKey];
    if (!compatibilityDataForBrowser) {
      return null;
    }

    let minimumSupportedVersion = null;

    // TODO: Handle notes and flags
    if (isArray(compatibilityDataForBrowser)) {
      compatibilityDataForBrowser.forEach((compatibilityData) => {
        if (compatibilityData.version_added) {
          minimumSupportedVersion = compatibilityData.version_added;
        }
      });
    } else {
      if (typeof compatibilityDataForBrowser.version_added === 'boolean') {
        return compatibilityDataForBrowser.version_added;
      }

      minimumSupportedVersion = compatibilityDataForBrowser.version_added;
    }

    if (version === null || minimumSupportedVersion === null) {
      console.error('Missing version or minimum Supported version');
      return false;
    }

    const validVersion = valid(coerce(version));
    const validMinimumSupportedVersion = valid(coerce(minimumSupportedVersion));

    if (validVersion !== null && validMinimumSupportedVersion !== null) {
      return gte(validVersion, validMinimumSupportedVersion);
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}