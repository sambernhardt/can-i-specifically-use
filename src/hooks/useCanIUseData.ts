import { useMemo } from 'react'
import { isCompatible, validateAndParseCSVString } from '../utils';
import { SupportStatusKey } from '../components/FeatureDetail';
import { BrowserKeys, DecoratedUsageDataType, DeviceCategory } from '../types';

type CompatibilityKeysLookupObject = Record<BrowserKeys | string, {
  browser: string[],
  device: DeviceCategory[],
}>;

const getBrowserKey = (rawBrowser: string, device: DeviceCategory) => {
  // TODO: Handle typing with Deno, Node.js
  const compatibilityKeys: CompatibilityKeysLookupObject = {
    "chrome": {
      browser: ["Chrome"],
      device: ["desktop"],
    },
    "chrome_android": {
      browser: ["Chrome"],
      device: ["mobile", "tablet"],
    },
    "edge": {
      browser: ["Edge"],
      device: ["desktop"],
    },
    "firefox": {
      browser: ["Firefox"],
      device: ["desktop"],
    },
    "firefox_android": {
      browser: ["Firefox"],
      device: ["mobile", "tablet"],
    },
    "ie": {
      browser: ["IE"],
      device: ["desktop"],
    },
    "oculus": {
      browser: ["Oculus Browser"],
      device: ["mobile", "tablet"],
    },
    "opera": {
      browser: ["Opera"],
      device: ["desktop"],
    },
    "opera_android": {
      browser: ["Opera"],
      device: ["mobile", "tablet"],
    },
    "safari": {
      browser: ["Safari"],
      device: ["desktop"],
    },
    "safari_ios": {
      browser: ["Safari",  "Safari (in-app)"],
      device: ["mobile", "tablet"],
    },
    "samsunginternet_android": {
      browser: ["Samsung Internet"],
      device: ["mobile", "tablet"],
    },
    "webview_android": {
      browser: ["Android WebView"],
      device: ["mobile", "tablet"],
    },
  };

  // Look up the browser key based on the raw browser name and device category
  const browserKey = (Object.keys(compatibilityKeys) as BrowserKeys[]).find((key) => {
    const { browser: browserNames, device: deviceNames } = compatibilityKeys[key];
    return browserNames.includes(rawBrowser) && deviceNames.includes(device);
  });

  if (!browserKey) {
    // console.error(`Could not find browser key for ${rawBrowser} on ${device}`);
  }

  return browserKey;
}

type CanIUseDataType = (
  csvData: string,
  selectedFeatureCompatibilityData: any,
) => {
  parsedCSVData: DecoratedUsageDataType[],
  percentageSupported: number,
  percentageNotSupported: number,
  numberSupported: number,
  numberNotSupported: number,
  supportMessageKey: string,
  error: string | null,
}

const useCanIUseData: CanIUseDataType = (csvData, selectedFeatureCompatibilityData) => {
  const result = useMemo(() => {
    try {
      const parsedAndValidated = validateAndParseCSVString(csvData);
      const decoratedUsageData = parsedAndValidated.map((row) => {
        const browserKey = getBrowserKey(row['Browser'], row['Device Category']);
        return {
          ...row,
          'Browser Key': browserKey || null,
        }
      }).map((row) => {
        const result = isCompatible(selectedFeatureCompatibilityData, row['Browser Key'], row['Browser Version']);
        return {
          ...row,
          Compatible: result,
        }
      }) as DecoratedUsageDataType[];
  
      const _numberSupported = decoratedUsageData
        .filter((row) => row.Compatible === true)
        .reduce((acc, row) => acc + row.Users, 0);
      const _numberNotSupported = decoratedUsageData
        .filter((row) => row.Compatible === false)
        .reduce((acc, row) => acc + row.Users, 0);
  
      const total = _numberSupported + _numberNotSupported;
      const _percentageSupported = Math.round((_numberSupported / total) * 100);
      const _percentageNotSupported = Math.round((_numberNotSupported / total) * 100);
  
      let _supportMessageKey: SupportStatusKey = 'notWellSupported';
      if (_numberSupported / total >= 0.5) {
        _supportMessageKey = 'moderatelySupported';
      }
      if (_numberSupported / total >= 0.9) {
        _supportMessageKey = 'veryWellSupported';
      }
  
      return {
        parsedCSVData: decoratedUsageData,
        percentageSupported: _percentageSupported,
        percentageNotSupported: _percentageNotSupported,
        numberSupported: _numberSupported,
        numberNotSupported: _numberNotSupported,
        supportMessageKey: _supportMessageKey,
        error: null,
      }
    } catch (e) {
      return {
        parsedCSVData: [],
        percentageSupported: 0,
        percentageNotSupported: 0,
        numberSupported: 0,
        numberNotSupported: 0,
        supportMessageKey: 'notWellSupported',
        error: e instanceof Error ? "Couldn't parse CSV or process it or something: " + e.message : 'No error message',
      }
    }
  }, [csvData, selectedFeatureCompatibilityData]);

  return result;
}

export default useCanIUseData