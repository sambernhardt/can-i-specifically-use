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
  category: string;
  mdn_url: string;
  spec_url: string;
  parentPath: string | null;
}

export function makeGenericMdnDocsUrl(url: string) {
  return url.replace('/en-us/', '/');
}