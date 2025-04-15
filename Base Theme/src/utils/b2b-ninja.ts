import { CommonUtilities } from 'experro-storefront';

declare let window: any;

const isRenderingOnServer =
  CommonUtilities.isRenderingOnServer() ||
  CommonUtilities.isRenderingInHeadlessBrowser();

export const loadB2bNinajaScript = (setShowB2bNinjaButtons: any) => {
  if (
    process.env.REACT_APP_B2B_NINJA_APP_ENABLE === 'true' &&
    !isRenderingOnServer
  ) {
    const b2bScript = document.getElementById('b2bNinjaScript');
    if (!b2bScript) {
      const storeHash = CommonUtilities.getStoreHash();
      const scriptTag = document.createElement('script');
      scriptTag.id = 'b2bNinjaScript';
      scriptTag.src = `https://cdn.quoteninja.com/storefront/quoteninja-headless.js?storeID=${storeHash}`;
      document.head.appendChild(scriptTag);
      scriptTag.onload = () => {
        setShowB2bNinjaButtons(true);
      };
    } else {
      setShowB2bNinjaButtons(true);
    }
  }
};

export const logoutFromB2bNinja = async () => {
  if (process.env.REACT_APP_B2B_NINJA_APP_ENABLE === 'true') {
    const logoutResponse = await window.BN?.log_out_customer();
    if (logoutResponse) {
      const b2bNinjascript = document.getElementById('b2bNinjaScript');
      localStorage.removeItem('qn-customer-token');
      localStorage.removeItem('qn-customer-data');
      localStorage.removeItem('qn-quote-id');
      localStorage.removeItem('qn-session-id');
      localStorage.removeItem('qn-quote-item-count');
      const b2bNinjaQuoteButton = document.getElementById('qn-dialog-toggle');
      if (b2bNinjaQuoteButton) {
        b2bNinjaQuoteButton.remove();
      }
      if (b2bNinjascript) {
        b2bNinjascript.remove();
      }
    }
  }
};
