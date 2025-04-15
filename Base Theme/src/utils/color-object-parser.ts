/**
 * Parses the color object and returns the corresponding RGB value.
 * @param color - The color object to parse.
 * @returns  The RGB value of the color.
 */
const expColorObjectParser = (color: any) => {
  try {
    return typeof color === 'string'
      ? hexToRGB(JSON.parse(color)?.value)
      : hexToRGB(color?.value);
  } catch {
    return color;
  }
};

function hexToRGB(hex: string) {
  // Remove the leading '#' if present
  hex = hex.replace(/^#/, '');

  // Ensure the HEX code is valid (6 or 8 characters)
  if (hex.length !== 6 && hex.length !== 8) {
    throw new Error("Invalid HEX color: please provide a 6-character or 8-character HEX color code.");
  }

  // Parse the R, G, B values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // If the HEX code includes an alpha value
  const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;

  // Return the RGBA color
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export { expColorObjectParser };
