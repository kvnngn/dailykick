import { AxiosResponseHeaders } from 'axios';
import _ from 'lodash';
import { FormikValues } from 'formik';

export const parseContentRange = (
  headers: AxiosResponseHeaders,
): ContentRange => {
  const contentRange: ContentRange = {
    startRow: 0,
    endRow: 0,
    totalCount: 0,
  };
  if (_.has(headers, 'content-range')) {
    const chunk = headers['content-range'].split('/');
    if (chunk.length > 1) {
      contentRange.totalCount = parseInt(chunk[1], 10);
      const range = chunk[0].split('-');
      if (range.length > 1) {
        contentRange.startRow = parseInt(range[0], 10);
        contentRange.endRow = parseInt(range[1], 10);
      }
    }
  }
  return contentRange;
};

export const parseFilterValues = (v: FormikValues) => {
  const filter: Record<string, any> = {};
  Object.entries(v).forEach(([key, value]) => {
    if (value?.length) {
      filter[key] = value;
    }
  });
  return Object.keys(filter).length ? JSON.stringify(filter) : undefined;
};
