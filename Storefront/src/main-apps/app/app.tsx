import {AppInit} from '../../interfaces/app-init';
import {useEffect} from 'react';
import {AnalyticsService, AuthService, EcommerceService} from '../../services';
import { Routes } from './routes';
import { CommonUtilities } from '../../utilities';

declare const window: any;
try {
  window._exp_bc_ = new BroadcastChannel('exp_site_channel');
} catch(e) {
  window._exp_bc_ = null;
}

const CMSApp = ({ templates, components, routes, headerComponent, footerComponent, pencilBannerComponent }: AppInit) => {
  const userDetails = window['__PING_DETAILS__'];

  useEffect(() => {
    const isCurrencyCallNeeded = (process.env.REACT_APP_STORE)?.toLowerCase() !== 'shopify' && process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true';
    try {
      if(process.env.REACT_APP_ECOMMERCE_MODULE_ENABLE === 'true') {
        if (window._exp_bc_) {
          window._exp_bc_.addEventListener('message', (event) => {
            console.log('event', event);
            if (event.data && event.data.event === "USER_UPDATED") {
              handleEcommerce(event.data.data, true);
            }
            if (event.data && event.data.event === "MULTI_TAB_LOGIN_SUCCESSFUL" && window.location.pathname !== "/_exp_bc_checkout/") {
              window.location.reload();
            }
            if (event.data && event.data.event === "MULTI_TAB_LOGOUT_SUCCESSFUL" && window.location.pathname !== "/_exp_bc_checkout/") {
              window.location.reload();
            }
          });
        }

        const dispatchLoginLogoutEvents = (userDetailsToUse: any, isFromMultiTab: boolean) => {
          if(userDetailsToUse && userDetailsToUse.userInfo && userDetailsToUse?.userInfo?.email){
            document.dispatchEvent(new Event("LOGIN_SUCCESSFUL"));
          }
          if (userDetailsToUse.userInfo?.email) {
            AnalyticsService.updateUserDetails(userDetailsToUse.userInfo);
          }
          // if(!isFromMultiTab) {
          //   AuthService.forceLogout();
          // }
        }

        const handleEcommerce = async (eventData: any, isFromMultiTab = false) => {
          const userDetailsToUse = eventData ? eventData : userDetails;
          //const userSessionDetailsPromise = AuthService.getUserSessionInfo();
          const cartPromise = EcommerceService.getCart();
          const promises = [cartPromise];
          if (isCurrencyCallNeeded) {
            const currencyPromise = EcommerceService.getCurrencies();
            promises.push(currencyPromise);
          }

          Promise.all(promises)
            .then((values) => {
              userDetailsToUse.userInfo = window['__USER_DETAILS__']?.userInfo;
              const cartDetails = values[0];
              if (
                cartDetails &&
                (cartDetails?.Status !== 'failure' ||
                  cartDetails?.statusText === 'OK')
              ) {
                userDetailsToUse.userCartObj = cartDetails;
              } else {
                userDetailsToUse.userCartObj = {};
              }
              AuthService.setUserDetails(userDetailsToUse, true);
              document.dispatchEvent(new Event("CART_REFRESH"));
              if(!isCurrencyCallNeeded) {
                dispatchLoginLogoutEvents(userDetailsToUse, isFromMultiTab);
              }
              if (values[1] && isCurrencyCallNeeded) {
                const currencyDetails = values[1];
                if(currencyDetails?.length){
                  userDetailsToUse.currencyObj = currencyDetails;
                  const defaultCurrency = currencyDetails.find((elem: any) => elem.is_default) || currencyDetails[0];
                  if(defaultCurrency && !CommonUtilities.getCurrency()){
                    CommonUtilities.setCurrency(defaultCurrency);
                    userDetailsToUse.defaultCurrency = defaultCurrency;
                  }else{
                    const defaultCurrencyFromLocalStorage = CommonUtilities.getCurrency()
                    if(defaultCurrencyFromLocalStorage){
                      userDetailsToUse.defaultCurrency = defaultCurrencyFromLocalStorage
                    }
                  }
                  AuthService.setUserDetails(userDetailsToUse, true);
                  document.dispatchEvent(new CustomEvent("CURRENCY_UPDATE",{'detail': {
                      storefront: true
                    }}));
                  dispatchLoginLogoutEvents(userDetailsToUse, isFromMultiTab);
                }
              }
            }).catch((e) => {
            console.error(e);
          });
        }
        if(!CommonUtilities.isRenderingOnServer() && CommonUtilities.isEcommStoreExist()) {
          handleEcommerce(false, false);
        }
      } else {
        AuthService.setUserDetails(userDetails);
      }
    } catch (e) {
      console.error(e);
      AuthService.setUserDetails({});
    }
    const onPageLoad = () => {
      // make ssr variable blank after page load
      window['__experro_ssr_request_data__'] = {};
    };
    window.addEventListener('locationchange',onPageLoad);
    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
      return () => window.removeEventListener('locationchange',onPageLoad);
    } else {
      window.addEventListener('load', onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => {
        window.removeEventListener('load', onPageLoad);
        window.removeEventListener('locationchange', onPageLoad);
      };
    }
  }, []);
  // @ts-ignore
  return Routes({templates, components, routes, headerComponent, footerComponent, pencilBannerComponent});
}

export { CMSApp }
