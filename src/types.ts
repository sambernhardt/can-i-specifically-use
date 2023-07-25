export type BrowserKeys = 'chrome' | 'chrome_android' | 'deno' | 'edge' | 'firefox' | 'firefox_android' | 'ie' | 'nodejs' | 'oculus' | 'opera' | 'opera_android' | 'safari' | 'safari_ios' | 'samsunginternet_android' | 'webview_android';

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

export type RawUsageDataType = {
  'Browser': string;
  'Browser Version': string;
  'Device Category': 'desktop' | 'mobile' | 'tablet';
  'Users': string;
}

export type DecoratedUsageDataType = RawUsageDataType & {
  'Browser Key': BrowserKeys;
  'Compatible': boolean | null;
}