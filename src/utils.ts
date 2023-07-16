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

export function recursivelyGetFeatures(data: any, path: string, result: any) {

  if (data.__compat) {
    const category = path.split('.')[0];

    result[path] = {
      path,
      pathWithoutCategory: path.replace(category + '.', ''),
      category,
      mdn_url: data.__compat.mdn_url,
      spec_url: data.__compat.spec_url,
      compatibilityData: data.__compat,
    };
  }

  for (const key in data) {
    if (key === '__compat') {
      const category = path.split('.')[0];

      result[path] = {
        path,
        pathWithoutCategory: path.replace(category + '.', ''),
        category,
        mdn_url: data.__compat.mdn_url,
        spec_url: data.__compat.spec_url,
        compatibilityData: data.__compat,
      };
    } else if (isObject(data[key])) {
      const newPath = path ? path + '.' + key : key;
      recursivelyGetFeatures(data[key], newPath, result);
    }
  }
}

export function makeGenericMdnDocsUrl(url: string) {
  return url.replace('/en-us/', '/');
}