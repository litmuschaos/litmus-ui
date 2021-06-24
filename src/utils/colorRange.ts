export interface ColorMap {
  [key: number]: string;
}

// Pass a value and the colorMap, the function will return the color
const getValueColor = (value: number, colorMap: ColorMap) => {
  let selectedColor = "";
  for (let i = 0; i < Object.keys(colorMap).length; i++) {
    if (parseInt(Object.keys(colorMap)[i], 10) === value) {
      selectedColor = Object.values(colorMap)[i];
      break;
    } else if (parseInt(Object.keys(colorMap)[i], 10) > value) {
      selectedColor = Object.values(colorMap)[i - 1];
      break;
    }
  }
  return selectedColor;
};

export { getValueColor };
