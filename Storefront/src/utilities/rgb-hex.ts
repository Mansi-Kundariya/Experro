export default function rgbHex(r, g, b, a) {
  // Helper function to convert a number to a two-digit hex string
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  // Convert RGBA components to HEX and concatenate them
  const red = toHex(r);
  const green = toHex(g);
  const blue = toHex(b);
  const alpha = toHex(Math.round(a * 255));

  // Return the combined HEX string
  return `${red}${green}${blue}${alpha}`;
}
