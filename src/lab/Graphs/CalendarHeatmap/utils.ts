const getColorIndex = (value: number, valueRange: number[]) => {
  if (value || value === 0) {
    for (let i = 0; i < valueRange.length; i++) {
      if (value <= valueRange[i]) {
        return i;
      }
    }
  }
  return valueRange.length;
};

export { getColorIndex };
