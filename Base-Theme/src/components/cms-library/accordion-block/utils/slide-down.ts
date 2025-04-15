/**
 * Slide down the tab on onclick event.
 * @param element The refrenced element or tag
 * @param duration Time duration of slide animation in number
 */
// Show the element
const slideDown = (element: any, duration: number = 400) => {
  Object.assign(element?.style || {}, { display: 'block', overflow: 'hidden' });
  const targetHeight = element?.scrollHeight;
  // Use Element.animate() to create a sliding animation
  element?.animate([{ height: '0' }, { height: `${targetHeight}px` }], {
    // Animation duration
    duration: duration,
    easing: 'ease-out',
    // Callback function when animation is complete
    complete: function () {
      // Hide the element after the animation is finished
      Object.assign((element?.style || {}, { height: 'auto' }));
    },
  });
};

export default slideDown;
