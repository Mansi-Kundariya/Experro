/**
 * Pass a JSON string representing the color default value object to ***ColorPicker***.
 * @param value - The default color value.
 * @param resetValue - The reset color value.
 * @returns A JSON string representing the color default value object.
 */
const getColorDefaultValueObject = (value?: any, resetValue?: any) => {
  return JSON.stringify({
    value: value ? value : '#100d0e',
    default: resetValue ? resetValue : '#100d0e',
  });
};

export default getColorDefaultValueObject;
