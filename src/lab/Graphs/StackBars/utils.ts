import { bisector } from "d3-array";
import dayjs from "dayjs";
import { BarDateValue, StackBarMetric } from "./base";

// Get date in type of string as per format passed
const dateFormat = (date: number, xAxistimeFormat: string) => {
  return dayjs(new Date(date)).format(xAxistimeFormat);
};

// Convert integer to string with Unit
const intToString = (value: number, unit: string) => {
  let numValue = "";
  const shortValue = parseFloat(value.toPrecision(2));
  numValue = shortValue.toString();

  if (shortValue % 1 !== 0) {
    numValue = shortValue.toFixed(2);
  }
  return `${numValue} ${unit}`;
};

// Accessor functions
const getBarDateNum = (d: StackBarMetric) => {
  if (d) {
    if (typeof d.date === "number") {
      return new Date(d.date);
    } else return new Date(parseInt(d.date, 10));
  } else {
    return new Date(0);
  }
};
// Accessor functions
const getLineDateNum = (d: BarDateValue) => {
  if (d) {
    if (typeof d.date === "number") {
      return new Date(d.date);
    } else return new Date(parseInt(d.date, 10));
  } else {
    return new Date(0);
  }
};

// Get date in in type number
const getDateNumber = (d: string | number) => {
  if (d) {
    if (typeof d === "number") {
      return d;
    } else return parseInt(d, 10);
  } else {
    return 0;
  }
};

// Get Value in in type number
const getValueNum = (d: BarDateValue) => {
  if (d) {
    if (typeof d.value === "number") {
      return d.value;
    } else return parseInt(d.value, 10);
  } else {
    return NaN;
  }
};

// Get Value in in type string
const getValueStr = (d: BarDateValue) => {
  if (d) {
    if (typeof d.value === "number") {
      return d.value.toFixed(2).toString();
    } else return d.value;
  } else {
    return "";
  }
};

// Bisectors

// Bisect line data with date
const bisectLineDate = bisector<BarDateValue, Date>(
  (d) => new Date(getLineDateNum(d))
).left;

// Bisect bar data with date
const bisectBarDate = bisector<StackBarMetric, Date>(
  (d) => new Date(getBarDateNum(d))
).left;

export {
  getLineDateNum,
  getValueNum,
  getValueStr,
  bisectLineDate,
  getBarDateNum,
  bisectBarDate,
  getDateNumber,
  dateFormat,
  intToString,
};
