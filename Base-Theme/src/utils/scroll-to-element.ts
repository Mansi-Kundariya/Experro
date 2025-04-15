export const scrollToElement = (hash?: string) => {
  let headerOffset = 0;

  //header height can hide element so we need to remove it
  const header = document.getElementById('header');
  if (header) {
    headerOffset = header.offsetHeight;
  }

  // Use the provided hash or the window's hash
  const elementId = hash
    ? decodeURIComponent(hash.substring(1))
    : decodeURIComponent(window.location.hash.substring(1));

  if (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  }
};
