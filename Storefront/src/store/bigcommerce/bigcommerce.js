export class BigcommerceService {
    static async loginInBigcommerce(url) {
      const iframe = document.createElement("iframe");
      iframe.id = '__exp_bc_login_iframe__';
      iframe.src = url;
      iframe.height = '0px';
      iframe.width = '0px';
      document.body.append(iframe);
      await checkIframeLoaded('__exp_bc_login_iframe__');
    }

    static async logoutInBigcommerce(url) {
      const iframe = document.createElement("iframe");
      iframe.id = '__exp_bc_logout_iframe__';
      iframe.src = url;
      iframe.height = '0px';
      iframe.width = '0px';
      document.body.append(iframe);
      await checkIframeLoaded('__exp_bc_logout_iframe__');
    }
  }


  async function checkIframeLoaded(id) {
    return new Promise((resolve) => {
      const checkInterval = window.setInterval(checkIframe, 100);

      function checkIframe() {
        try {
          // Get a handle to the iframe element
          const iframe = document.getElementById(id);
          // @ts-ignore Its html properties
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          // Check if loading is complete
          if (iframeDoc.readyState == 'complete' && iframeDoc.location.href !== 'about:blank') {
            clearInterval(checkInterval);
            // @ts-ignore
            resolve(true);
          }
        } catch (e) {
          clearInterval(checkInterval);
          // @ts-ignore
          resolve(true);
        }
      }
    });
  }
