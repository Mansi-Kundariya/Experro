import Cookies from 'js-cookie';
import { AuthService } from '../services/';
declare const window: any;

function removeSlashFromHostname(hostname: string) {
  if (hostname.endsWith('/')) {
    return hostname.slice(0, -1);
  }
  return hostname ? hostname : null;
}
export class CommonUtilities {
  static getLanguage() {
    return window['__PING_DETAILS__']?.language;
  }

  static getDefaultLanguage() {
    return window['__PING_DETAILS__']?.defaultLanguage;
  }

  static getTenantId() {
    return window['__PING_DETAILS__']?.tenantId;
  }

  static getStoreURL() {
    return window['__PING_DETAILS__']?.ecommStoreBaseUrl;
  }

  static getWorkspaceId() {
    return window['__PING_DETAILS__']?.workspaceId;
  }

  static getEnvironmentId() {
    return window['__PING_DETAILS__']?.environmentId;
  }

  static getCustomDomain() {
    return removeSlashFromHostname(window['__PING_DETAILS__']?.customDomain);
  }
  static getChannelsInfo() {
    return window['__PING_DETAILS__']?.otherDomains;
  }
  static getCurrentChannelInfo() {
    try {
      return window['__PING_DETAILS__']?.otherDomains?.find(
        (domain) => domain.is_current
      );
    } catch {
      return 'default';
    }
  }

  static getHostname() {
    if (window.originalHost) {
      return removeSlashFromHostname(window.originalHost);
    } else if (window['__PING_DETAILS__']?.customDomain) {
      return removeSlashFromHostname(window['__PING_DETAILS__']?.customDomain);
    } else {
      return window.location.hostname;
    }
  }

  static getEnvironmentType() {
    return window['__PING_DETAILS__']?.environmentType;
  }

  static isEcommStoreExist() {
    return !!(
      window['__PING_DETAILS__'] && window['__PING_DETAILS__']?.ecommProvider
    );
  }

  static getCacheDomain() {
    return window['__PING_DETAILS__']?.cacheDomain;
  }

  static getPingDetails() {
    return window['__PING_DETAILS__'];
  }

  static isExperroHost() {
    const originalHost = CommonUtilities.getHostname();
    return (
      originalHost &&
      (originalHost.includes('.myexperro') ||
        originalHost.includes('experro.app') ||
        originalHost.includes('experro-dev.app') ||
        originalHost.includes('experro-staging.app') ||
        originalHost.includes('experro-demo.com'))
    );
  }

  // static getReleaseId() {
  //   return Cookies.get('exp-rid');
  // }

  // static getEcommProviderChannelId() {
  //   return Cookies.get('exp-ecomm-provider-chid');
  // }

  // static getEcommProvider() {
  //   return Cookies.get('exp-ecomm-provider')
  // }

  static isRenderingOnServer() {
    return window.location.href.indexOf('___i_s_S_S_R___') !== -1;
  }

  // static getWorkspaceHash() {
  //   return Cookies.get('exp-whash');
  // }

  static getStoreHash() {
    return window['__PING_DETAILS__']?.storeHash;
  }

  static utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  static b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

  static getGoogleCdnMediaPrefix() {
    return 'https://cdn.experro-dev.app';
  }

  static getLocalState(key) {
    const data = window[window['__exp_dataKey__']][key];
    if (data) {
      return JSON.parse(CommonUtilities.b64_to_utf8(data));
    } else {
      return null;
    }
  }

  static getGlobalSettings() {
    return window['__pageData__']?.globalSettings;
  }
  static isMobileInAppBrowser() {
    const useragent = window.navigator.userAgent || window.navigator.vendor;
    const BROWSER = {
      messenger: /\bFB[\w_]+\/(Messenger|MESSENGER)/,
      facebook: /\bFB[\w_]+\//,
      twitter: /\bTwitter/i,
      line: /\bLine\//i,
      wechat: /\bMicroMessenger\//i,
      puffin: /\bPuffin/i,
      miui: /\bMiuiBrowser\//i,
      instagram: /\bInstagram/i,
    };
    return Object.keys(BROWSER).find((key) => BROWSER[key].test(useragent));
  }

  static generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  static isRenderingInHeadlessBrowser() {
    if (process.env.REACT_APP_BUILD_TARGET !== 'app') {
      return false;
    }
    const isIOSPlatform = /iPhone|iPod|iPad/i;
    const expectedBrowsers = /Edg|Safari|Chrome|CriOS|Firefox/i;
    const agent = window.navigator?.userAgent || window.navigator?.vendor;
    const isMobileInApp = this.isMobileInAppBrowser();
    if (isIOSPlatform.test(agent)) {
      if (isMobileInApp) {
        return false;
      } else {
        const isExpectedBrowser = expectedBrowsers.test(agent);
        return (
          !isExpectedBrowser ||
          /HeadlessChrome/.test(agent) ||
          /Chrome-Lighthouse/.test(agent)
        );
      }
    } else {
      if (isMobileInApp) {
        return false;
      } else {
        const isExpectedBrowser = expectedBrowsers.test(agent);
        return (
          (!window.chrome &&
            !window.safari &&
            !isExpectedBrowser) ||
          /HeadlessChrome/.test(agent) ||
          /Chrome-Lighthouse/.test(agent)
        );
      }
    }
  }

  static setCurrency(currenyToSet: any) {
    if (currenyToSet) {
      Cookies.set('_c_d', JSON.stringify(currenyToSet), { expires: 1000 });
    }
  }

  static getCurrency() {
    const currencyData = Cookies.get('_c_d');
    if (currencyData) {
      return JSON.parse(currencyData);
    }
  }


  static getCustomerGroupId() {
    const userDetails = AuthService.getUserDetails();
    if(userDetails && userDetails.userInfo &&  userDetails.userInfo.customerGroupInfo && userDetails.userInfo.customerGroupInfo.id) {
      return userDetails.userInfo.customerGroupInfo.id;
    } else {
      return 0;
    }
  }

  /**
   * This utility file is tasked with parsing the component_content (the experro_storefront, custom traits values specific to our storefront) and
   *  combining it with the other component props, resulting in a unified object.
   */
  static propsParser(props: any) {
    try {
      const component_content: any = props?.component_content;
      if (component_content) {
        return {
          ...props,
          ...JSON.parse(
            component_content === undefined ? '{}' : component_content
          ),
        };
      }
      return props;
    } catch {
      return props;
    }
  }
}
