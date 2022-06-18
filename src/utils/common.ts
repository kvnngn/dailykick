import { AxiosError } from 'axios';
import _ from 'lodash';

const checkNumber = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return !Number.isNaN(Number(value));
};

export const calculateSlope = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  if (x1 === x2) {
    return Number.MAX_VALUE;
  }
  return (y2 - y1) / (x2 - x1);
};

export const isAxiosError = (e: any): e is AxiosError => e.isAxiosError;

export const isExpired = (e: any): boolean => {
  if (isAxiosError(e) && e.response && e.response.status) {
    if (
      e.response.status === 401 ||
      (e.response.status === 404 &&
        (e.message?.toLowerCase() === 'user not found' ||
          e.message?.toLowerCase() === 'user not found'))
    ) {
      return true;
    }
  }
  return false;
};

export const byteToGib = (bytes: number) => bytes / 1024 ** 3;

export const treeShakeObject = (obj: Record<string, unknown>) => {
  const clone = _.cloneDeep(obj);
  Object.keys(clone).forEach((key) => {
    if (clone[key] === null || clone[key] === undefined) {
      delete clone[key];
    }
  });
  return clone;
};

export const filterPositive = (
  value: number | undefined | null
): number | null => {
  if (typeof value === 'number' && value >= 0.0) {
    return value;
  }
  return null;
};

export const getPercentageChange = (
  newNumber: number,
  originalNumber: number,
  errorResponse: number | string = 'N/A'
): number | string => {
  if (
    !originalNumber ||
    !checkNumber(newNumber) ||
    !checkNumber(originalNumber)
  ) {
    return errorResponse;
  }
  return Number(((newNumber - originalNumber) / originalNumber) * 100);
};

export const getPercentageProportion = (
  newNumber: number,
  originalNumber: number,
  errorResponse: number | string = 'N/A'
): number | string => {
  if (
    !originalNumber ||
    !checkNumber(newNumber) ||
    !checkNumber(originalNumber)
  ) {
    return errorResponse;
  }
  return Number((newNumber / originalNumber) * 100);
};

export const subtractPercentageChanges = (
  newNumber1: number,
  originalNumber1: number,
  newNumber2: number,
  originalNumber2: number,
  errorResponse: number | string = 'N/A'
): number | string => {
  const valueA = getPercentageChange(newNumber1, originalNumber1);
  const valueB = getPercentageChange(newNumber2, originalNumber2);
  if (checkNumber(valueA) && checkNumber(valueB)) {
    return Number(valueA) - Number(valueB);
  }
  return errorResponse;
};

export const subtractPercentageProportions = (
  newNumber1: number,
  originalNumber1: number,
  newNumber2: number,
  originalNumber2: number,
  errorResponse: number | string = 'N/A'
): number | string => {
  const valueA = getPercentageProportion(newNumber1, originalNumber1);
  const valueB = getPercentageProportion(newNumber2, originalNumber2);
  if (checkNumber(valueA) && checkNumber(valueB)) {
    return Number(valueA) - Number(valueB);
  }
  return errorResponse;
};

export const isRecommendPeriod = (v: string): v is RecommendPeriod =>
  ['Days14', 'Days30', 'Days60'].includes(v);

export const isRecommendCategory = (v: string): v is RecommendCategory =>
  ['SavingsFirst', 'StabilityFirst', 'Chipset'].includes(v);
