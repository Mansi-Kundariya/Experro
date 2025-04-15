import { AuthService } from 'experro-storefront';
import { useEffect } from 'react';

const ExpMessagesController = (getOrderData: any) => {
  const userDetail = AuthService.getUserDetails();
  const initListener = () => {
    function resizeIFrameToFitContent(iFrame: any, height: any) {
      iFrame.style.height = height;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === 'attachEvent' ? 'onmessage' : 'message';

    // Listen to message from child window
    eventer(
      messageEvent,
      function (e: any) {
        const key = e.message ? 'message' : 'data';
        const data = e[key];
        if (data.from === 'bc') {
          const iFrame = document.getElementById('my-account-page');
          if (iFrame && data && data.height) {
            resizeIFrameToFitContent(iFrame, data.height);
          }
          if (data?.message && data?.message === 'message_submitted') {
            getOrderData();
          }
        }
      },
      false
    );
  };

  useEffect(() => {
    initListener();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userDetail,
  };
};

export default ExpMessagesController;
