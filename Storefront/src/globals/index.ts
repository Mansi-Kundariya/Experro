(function() {
  const pushState = history.pushState;
  const replaceState = history.replaceState;

  history.pushState = function() {
    // eslint-disable-next-line prefer-rest-params
    pushState.apply(history, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
  };

  history.replaceState = function() {
    // eslint-disable-next-line prefer-rest-params
    replaceState.apply(history, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
  };

  window.addEventListener('popstate', function() {
    window.dispatchEvent(new Event('locationchange'))
  });
})();
