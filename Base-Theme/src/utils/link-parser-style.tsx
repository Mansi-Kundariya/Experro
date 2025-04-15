import { expColorObjectParser } from './color-object-parser';

/**
 * Parses the provided style data and returns an object containing CSS variable values for link parser styles.
 * @param buttonHoverColor - The color for the button background on hover.
 * @param buttonTextHoverColor - The color for the button text on hover.
 * @param buttonColor - The color for the button background.
 * @param buttonTextColor - The color for the button text.
 * @param linkTextHoverColor - The color for the link text on hover.
 * @param linkLinkColor - The color for the link underline.
 * @param linkTextColor - The color for the link text.
 * @returns An object containing CSS variable values for link parser styles.
 */
export const linkParserStyle = (style: any) => {
  const {
    buttonHoverColor,
    buttonTextHoverColor,
    buttonColor,
    buttonTextColor,
    linkTextHoverColor,
    linkLinkColor,
    linkTextColor,
  } = style;

  return {
    '--button-hover-bg-color': expColorObjectParser(buttonHoverColor),
    '--button-hover-color': expColorObjectParser(buttonTextHoverColor),
    '--button-bg-color': expColorObjectParser(buttonColor),
    '--button-color': expColorObjectParser(buttonTextColor),
    '--link-hover-color': expColorObjectParser(linkTextHoverColor),
    '--link-decor-color': expColorObjectParser(linkLinkColor),
    '--link-color': expColorObjectParser(linkTextColor),
  };
};
