/* eslint-disable @typescript-eslint/no-unused-vars */
import {CommonUtilities} from "./common";
declare let window: any
const dataKey = '__experro_ssr_request_data__'
window.__exp_dataKey__= dataKey;
if (!window[dataKey]) {
  window[dataKey] = {}
}

interface HttpRequestConfig {
  body?: any,
  headers?: any,
  credentials?: string,
  redirect?: string,
  cache?: string,
  mode?: string,
  method?: string
}

interface HttpRequest {
  key: string,
  url: string,
  config?: HttpRequestConfig,
  enableSSR?: boolean,
  componentId?: string,
  excludeCommonHeaders?: boolean,
  language?: string
  callForceFully?: boolean,
  signal?:any,
  appendLanguageFromQueryParams?: boolean;
  customerGroupId?:any
}

interface ExpHttpRequest {
  key?: string,
  url: string,
  enableSSR?: boolean,
  headers?: any,
  body?: any,
  method?: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'
}

const isRenderingOnServer = CommonUtilities.isRenderingOnServer();


export class Http {
  private static async request({
                                 key,
                                 url,
                                 config,
                                 enableSSR,
                                 componentId,
                                 excludeCommonHeaders,
                                 language,
                                 callForceFully = false,
                                 signal,
                                 appendLanguageFromQueryParams=true
                               }: HttpRequest) {
    key = `${componentId ? componentId : ''}_${key}`
    const defaultConfig = {
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'same-origin',
      redirect: 'follow',
      cache: 'no-cache',
      // mode: 'same-origin'
    };
    let result;
    if(!url?.includes('`/exp-sf-cms/api/ping?') && !url?.includes('/exp-sf-cms/api/auth-check')){
      const queryToAppend = `locale=${CommonUtilities.getLanguage()}`;
      if(url?.includes('?')){
        url += `&${queryToAppend}`
      }else{
        url += `?${queryToAppend}`
      }
    }
    if (!config) {
      throw Error("Invalid Request")
    }
    // console.log(`Making API call for key -> ${key}, Found in cache : ${window[dataKey][key]}, Is Rendering on server -> ${isRenderingOnServer}`);
    if (!isRenderingOnServer && window[dataKey][key]) {
      const response = CommonUtilities.getLocalState(key);
      delete window[dataKey][key]
      if(!callForceFully){
        return response
      }
    }

    const finalConfig: any = Object.assign(defaultConfig, config);
    if (config.headers && !config.headers['content-type']) {
      finalConfig.headers['content-type'] = 'application/json';
    }
    if (enableSSR) {
      finalConfig.headers['x-ssr-request-id'] = key
    }
    finalConfig.headers['x-customer-group-id'] = CommonUtilities.getCustomerGroupId();

    if (!excludeCommonHeaders) {
      Object.assign(finalConfig.headers, {});
    }
    // if (language) {
    //   finalConfig.headers['x-lang'] = language;
    // }

    if (finalConfig.body) {
      finalConfig.body = JSON.stringify(finalConfig.body);
    }
    if (process.env.REACT_APP_BUILD_TARGET !== 'app') {
      const currentURL = new URL(window.document.location.href).searchParams;
      const xDomain = currentURL.get('wh');
      if(xDomain) {
        finalConfig.headers['x-domain'] = xDomain;
        finalConfig.headers['x-workspace-id'] = xDomain;
      }
    }

    if (signal) {
      finalConfig['signal'] = signal
    }
    // @ts-ignore We are using our own object here
    const response: any = await fetch(url, finalConfig)
    const responseData = await response.text()
    if(responseData) {
      try {
        result = JSON.parse(responseData);
      } catch (e) {
        result = {};
      }
    }
    const responseObj = {
      data: result,
      type: response.type,
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    }

    if (isRenderingOnServer && enableSSR && response.status >= 200 && response.status < 300) {
      if (!window[dataKey][key]) {
        const script = document.createElement('script');
        script.textContent = `window['${dataKey}']['${key}'] = \`${CommonUtilities.utf8_to_b64(JSON.stringify(responseObj))}\`;`;
        document.head.appendChild(script);
      }
    }
    return responseObj
  }

  static async get({key, url, config, enableSSR, componentId, excludeCommonHeaders, language, callForceFully, appendLanguageFromQueryParams=false}: HttpRequest) {
    if (!config) {
      config = {};
    }
    config.method = 'GET'
    return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language, callForceFully, appendLanguageFromQueryParams})
  }

  static async post({key, url, config, enableSSR, componentId, excludeCommonHeaders, language, signal, customerGroupId}: HttpRequest) {
    if (!config) {
      config = {
        headers: {}
      }
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.method = 'POST'
    return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language, signal, customerGroupId})
  }

  static async put({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
    if (!config) {
      config = {
        headers: {}
      }
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.method = 'PUT'
    return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
  }

  static async patch({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
    if (!config) {
      config = {
        headers: {}
      }
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.method = 'PATCH'
    return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
  }

  static async delete({key, url, config, enableSSR, componentId, excludeCommonHeaders, language}: HttpRequest) {
    if (!config) {
      config = {
        headers: {}
      }
    }
    config.method = 'DELETE'
    return await Http.request({key, url, config, enableSSR, componentId, excludeCommonHeaders, language})
  }

  static async expFetch({key, url, enableSSR, headers, body, method}: ExpHttpRequest){
    key = `${key}`
    if (!isRenderingOnServer && window[dataKey][key]) {
      const response = CommonUtilities.getLocalState(key);
      delete window[dataKey][key]
        return response
    }
    if(!headers){
      headers = {
        'content-type': 'application/json',
      }
    }
    if(!method){
      method = 'GET'
    }
    const config: any = {
      headers: headers,
      method: method,
    }
    if(body){
      config.body = JSON.stringify(body)
    }
    const response: any = await fetch(url, config)
    const responseData: any = await response?.text();
    let result;
    if(responseData) {
      try {
        result = JSON.parse(responseData);
      } catch (e) {
        result = {};
      }
    }
    const responseObj = {
      data: result,
      type: response.type,
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    }
    if (isRenderingOnServer && enableSSR && response.status >= 200 && response.status < 300) {
      if (!window[dataKey][key]) {
        const script = document.createElement('script');
        script.textContent = `window['${dataKey}']['${key}'] = \`${CommonUtilities.utf8_to_b64(JSON.stringify(responseObj))}\`;`;
        document.head.appendChild(script);
        
      }
    }
    return responseObj
  }
}
