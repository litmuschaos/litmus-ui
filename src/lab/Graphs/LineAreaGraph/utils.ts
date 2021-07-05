import { bisector } from "d3-array";
import { DateValue } from ".";
import { ToolTipDateValue } from "./base";

// Accessor functions
const getDateNum = (d: DateValue) => {
  if (d) {
    if (typeof d.date === "number") {
      return new Date(d.date);
    }
    return new Date(parseInt(d.date, 10));
  }
  return new Date(0);
};

const getValueNum = (d: DateValue) => {
  if (d) {
    if (typeof d.value === "number") {
      return d.value;
    }
    return parseInt(d.value, 10);
  }
  return NaN;
};

const getValueStr = (d: DateValue) => {
  if (d) {
    if (typeof d.value === "number") {
      return d.value.toFixed(2).toString();
    }
    return d.value;
  }
  return "";
};

// For reducer
const getSum = (total: number, num: number | string) => {
  if (typeof num === "number") {
    return total + (num || 0);
  }
  return total + (parseInt(num, 10) || 0);
};

// Bisectors
const bisectDate = bisector<DateValue, Date>(
  (d) => new Date(getDateNum(d))
).left;
const bisectorValue = bisector<ToolTipDateValue, number>((d) =>
  getValueNum(d.data)
).left;

export {
  getDateNum,
  getValueNum,
  getValueStr,
  getSum,
  bisectDate,
  bisectorValue,
};
