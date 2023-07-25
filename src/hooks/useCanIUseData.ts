import { useMemo } from 'react'
import { isCompatible, parseCSV } from '../utils';
import { SupportStatusKey } from '../components/FeatureDetail';

const getBrowserKey = (browser: string, device: string) => {
  const compatibilityKeys: {
    [key: string]: {
      browser: string[],
      device: string[],
    }
  } = {
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

  const browserKey = Object.keys(compatibilityKeys).find((key) => {
    const { browser: browserNames, device: deviceNames } = compatibilityKeys[key];
    return browserNames.includes(browser) && deviceNames.includes(device);
  });

  return browserKey;
}

type DataType = Record<string, {
  'Browser': string,
  'Device Category': string,
  'Browser Version': string,
  'Users': string,
  'Browser key': string,
  'Compatible': boolean,
}>[]

type CanIUseDataType = (
  csvData: string,
  selectedFeatureCompatibilityData: any,
) => {
  parsedCSVData: DataType,
  percentageSupported: number,
  percentageNotSupported: number,
  numberSupported: number,
  numberNotSupported: number,
  supportMessageKey: string,
}

const useCanIUseData: CanIUseDataType = (csvData, selectedFeatureCompatibilityData) => {
  const result = useMemo(() => {
    const parsed = parseCSV(csvData);
    const csvDataWithBrowserKeys = parsed.map((row) => {
      const browserKey = getBrowserKey(row['Browser'], row['Device Category']);
      return {
        ...row,
        'Browser key': browserKey,
      }
    });
    const withCompatible: any = csvDataWithBrowserKeys.map((row: any) => {
      const result = isCompatible(selectedFeatureCompatibilityData, row['Browser key'], row['Browser Version']);
      return {
        ...row,
        Compatible: result,
      }
    });

    const _numberSupported = withCompatible
      .filter((row: any) => row.Compatible)
      .reduce((acc: any, row: any) => acc + parseInt(row.Users), 0);
    const _numberNotSupported = withCompatible
      .filter((row: any) => !row.Compatible)
      .reduce((acc: any, row: any) => acc + parseInt(row.Users), 0);

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
      parsedCSVData: withCompatible,
      percentageSupported: _percentageSupported,
      percentageNotSupported: _percentageNotSupported,
      numberSupported: _numberSupported,
      numberNotSupported: _numberNotSupported,
      supportMessageKey: _supportMessageKey,
    }
  }, [csvData, selectedFeatureCompatibilityData]);

  return result;
}

export default useCanIUseData