export interface expImageProps {
  src?: any;
  name: string;
  className?: string;
  height: number;
  width: number;
  alt?: string;
  title?: string;
  style?: any;
  lazyLoad?: boolean;
  retina?: boolean;
  preLoad?: boolean;
  options?: any;
  navigationUrl?: string;
  navigationTargert?: string;
  pictureClassName?: string;
}
export interface expImageOption {
  /*
   * Parameter: breakPoint    Units: Pixels
   * breakPoint will be useful, when all the options object have a breakPoint for the options array for ExpImage component,
   * if not found then it will use the default breakPoints, which you can find in ExpImage Component.
   * */
  breakPoint?: number;
  /*
   * Parameter: width    Units: Pixels    Default: auto
   * Resize the output image to the given width maintaining the current aspect ratio.
   * */
  width?: number;
  /*
   * Parameter: height    Units: Pixels    Default: auto
   * Resize the output image to the given height maintaining the current aspect ratio.
   * */
  height?: number;
  /*
   * Parameter: aspectratio    **_Default**: auto
   * Crop the output image to match the given aspect ratio. The default origin point (gravity) is positioned on the center of the image.
   * */
  aspect_ratio?: string;
  /*
   * Parameter: quality    Units: Number    Range: 0-100    Default: 85
   * Determines the compression level of the resulting image with 100 being the lowest level of compression and 0 being the highest.
   * Higher compression means smaller files, but might visually degrade the image (e.g. JPEG compression under 70 tends to produce visible artefacts.
   * */
  quality?: number;
  /*
   * Parameter: sharpen    Units: Boolean    Default: false
   * Sharpen the output image.
   * */
  sharpen?: boolean;
  /*
   * Parameter: blur    Units: Number    Range: 0-100    Default: 0
   * Blur the output image.
   * */
  blur?: boolean;
  /*
   * Parameter: crop    Units: Pixels    Format 1: width,height    Format 2: width,height,x,y
   * Crop the output image to the given width and height. Two formats are accepted. Format 1 one only includes the width and height of the crop.
   * Format 2 also includes the X and Y position where the crop should start. Image resizing with the width and height parameters is processed after the crop and the resized measurements apply.
   * If only width and height are given, the Crop Gravity parameter will be used.
   * */
  crop?: string;
  /*
   * Parameter: cropgravity    **_Default: center
   * Values**: center,forget,east,north,south,west,northeast,northwest,southeast,southwest
   * Set the gravity of the crop operation. This is used with the Format 1 cropping only and snaps the crop to the selected position.
   * */
  crop_gravity?: string;
  /*
   * Parameter: flip    Units: Boolean    Default: false
   * Flip the output image vertically.
   * */
  flip?: boolean;
  /*
   * Parameter: flop    Units: Boolean    Default: false
   * Flip the output image horizontally
   * */
  flop?: boolean;
  /*
   * Parameter: brightness    Units: Number    Range: -100-100    Default: 0
   * Adjusts the brightness of the output image. This can either brighten or darker the image.
   * */
  brightness?: number;
  /*
   * Parameter: saturation    Units: Number    Range: -100 - 100    Default: 0
   * Adjusts the saturation of the output image. Use -100 for grayscale.
   * */
  saturation?: number;
  /*
   * Parameter: hue    Units: Number    Range: 0-100    Default: 0
   * Adjusts the hue of the output image by rotating the color wheel.
   * The default value of 0 is the base color and increasing the value modulates to the next color for each 33 change.
   * */
  hue?: number;
  /*
   * Parameter: contrast    Units: Number    Range: -100 - 100    Default: 0
   * Adjusts the contrast of the output image.
   * */
  contrast?: number;
  /*
   * Parameter: sepia Units: Integer Values: 0 - 100 Default: 0
   * Changes the image color to the sepia color scheme.
   * */
  sepia?: number;
}
