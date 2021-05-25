const dayList = ["Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"];
const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getColorIndex = (value: number, valueThreshold: number[]) => {
  if (value >= 0) {
    for (let i = 0; i < valueThreshold.length; i++) {
      if (value <= valueThreshold[i]) {
        return i;
      }
    }
  }
  return valueThreshold.length;
};

export { getColorIndex, monthList, dayList };
