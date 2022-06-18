import moment from 'moment';

const checkNumber = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return !Number.isNaN(Number(value));
};

const toCurrency = (
  value: any,
  currency = 'USD',
  maximumFraction = 2,
): string | undefined | null => {
  if (checkNumber(value)) {
    return Number(value).toLocaleString('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: maximumFraction,
    });
  }
  return value;
};

const toLocaleString = (
  value: any,
  fraction = 2,
): string | undefined | null => {
  if (checkNumber(value)) {
    return Number(value).toLocaleString('en-US', {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    });
  }
  return value;
};

const toFixed = (value: any, fraction = 2): string | undefined | null => {
  if (checkNumber(value)) {
    return Number(value).toFixed(fraction);
  }
  return value;
};

const toPercent = (value: any, fraction = 2): string | undefined | null => {
  if (checkNumber(value)) {
    return `${Number(value).toFixed(fraction)}%`;
  }
  return value;
};

const toDateString = (
  value: any,
  format = 'YYYY-MM-DD HH:mm:ss',
): string | undefined | null => {
  if (value) {
    if (value instanceof Date) {
      return moment(value).format(format);
    }
    if (typeof value === 'string') {
      return moment(value).format(format);
    }
  }
  return value;
};

export default {
  toCurrency,
  toLocaleString,
  toFixed,
  toPercent,
  toDateString,
};
