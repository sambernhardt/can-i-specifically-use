import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: `"${JSON.stringify(issue.received)}" is not a valid value for ${issue.path.slice(-1)}` };
    }
  } else if (issue.code === z.ZodIssueCode.invalid_enum_value) {
    console.log(issue);
    return { message: `"${issue.received}" is not a valid value for ${issue.path.slice(-1)}` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const deviceCategories = [
  'desktop',
  'mobile',
  'tablet',
] as const;

export type DeviceCategory = typeof deviceCategories[number];

export const rawDataBrowsers = [
  'Android WebView',
  'Chrome',
  'Edge',
  'Firefox',
  'IE',
  'Internet Explorer',
  'Oculus Browser',
  'Opera',
  'Safari (in-app)',
  'Safari',
  'Samsung Internet',
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
  // TODO: See if there's a way to throw warnings instead of errors for invalid values
  // 'Browser': z.enum(rawDataBrowsers),
  'Browser': z.string(),
  'Browser Version': z.string(),
  'Device Category': z.enum(['desktop', 'mobile', 'tablet']),
  'Users': z.string().transform((val) => parseInt(val.replace(/,/g, ''))),
});
export const ParsedUsageDataArray = z.array(ParsedUsageDataItem);
export type ParsedUsageDataType = z.infer<typeof ParsedUsageDataItem>;
export type ParsedUsageDataArrayType = z.infer<typeof ParsedUsageDataArray>;

export type DecoratedUsageDataType = ParsedUsageDataType & {
  'Browser Key': BrowserKeys | null;
  'Compatible': boolean | null;
}

export type CSVDataType = {
  name: string;
  rawData: string;
  parsedData: ParsedUsageDataArrayType;
  uploadedAt: string;
}