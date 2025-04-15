export const isRetinaDisplay = () => {
  if (window.matchMedia) {
    const mq = window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)');
    // eslint-disable-next-line no-mixed-operators
    return (mq && mq.matches || (window.devicePixelRatio > 1));
  }
}
