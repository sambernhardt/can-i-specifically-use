import { z } from "zod";

export const deviceCategories = [
  'desktop',
  'mobile',
  'tablet',
] as const;

export type DeviceCategory = typeof deviceCategories[number];

export const rawDataBrowsers = [
  'Chrome',
  'Edge',
  'Firefox',
  'IE',
  'Opera',
  'Safari',
  'Safari (in-app)',
  'Samsung Internet',
  'Android WebView',
  'Oculus Browser'
] as const;

export type RawDataBrowsersType = typeof rawDataBrowsers[number] | null;

export const validBrowserKeys = [
  'chrome',
  'chrome_android',
  'deno',
  'edge',
  'firefox',
  'firefox_android',
  'ie',
  'nodejs',
  'oculus',
  'opera',
  'opera_android',
  'safari',
  'safari_ios',
  'samsunginternet_android',
  'webview_android',
] as const;

export type BrowserKeys = typeof validBrowserKeys[number];

type SimpleCompatibilityDataType = {
  version_added: string | false;
}

type CompatibilityNotes = {
    notes: string;
    partial_implementation: boolean;
    version_added: string;
    version_removed: string;
}

type CompatibilityFlags = {
  flags: {
    name: string;
    type: string;
  }[];
  version_added: string;
}

export type CompatibilityDataType = Record<BrowserKeys,
  (SimpleCompatibilityDataType | Array<SimpleCompatibilityDataType | CompatibilityNotes | CompatibilityFlags>)>;


export const ParsedUsageDataItem = z.object({
  'Browser': z.enum(rawDataBrowsers),
  'Browser Version': z.string(),
  'Device Category': z.enum(['desktop', 'mobile', 'tablet']),
  'Users': z.string(),
});
export const ParsedUsageDataArray = z.array(ParsedUsageDataItem);
export type ParsedUsageDataType = z.infer<typeof ParsedUsageDataItem>;
export type ParsedUsageDataArrayType = z.infer<typeof ParsedUsageDataArray>;

export type DecoratedUsageDataType = ParsedUsageDataType & {
  'Browser Key': BrowserKeys;
  'Compatible': boolean | null;
}

export type CSVDataType = {
  name: string;
  rawData: string;
  parsedData: ParsedUsageDataArrayType;
  uploadedAt: string;
}