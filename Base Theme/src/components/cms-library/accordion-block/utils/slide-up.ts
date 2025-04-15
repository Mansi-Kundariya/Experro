/**
 * Slide up the tab on onclick event.
 * @param element The refrenced element or tag
 * @param duration Time duration of slide animation in number
 */

const slideUp = (element: HTMLElement, duration = 400) => {
  const initStyle = {
    overflow: 'hidden',
    transitionProperty: 'height, margin, padding',
    transitionDuration: `${duration}ms`,
    height: `${element.offsetHeight}px`,
  };
  Object.assign(element?.style || {}, initStyle);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  element?.offsetHeight; // Force reflow

  const hideStyle = {
    height: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    marginTop: '0px',
    marginBottom: '0px',
  };
  Object.assign(element?.style || {}, hideStyle);
  window.setTimeout(function () {
    Object.assign(element?.style || {}, { display: 'none' });
    element?.style.removeProperty('height');
    element?.style.removeProperty('padding-top');
    element?.style.removeProperty('padding-bottom');
    element?.style.removeProperty('margin-top');
    element?.style.removeProperty('margin-bottom');
    element?.style.removeProperty('overflow');
    element?.style.removeProperty('transition-duration');
    element?.style.removeProperty('transition-property');
  }, duration);
};

export default slideUp;
