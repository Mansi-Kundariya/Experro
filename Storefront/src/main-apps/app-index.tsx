import '../globals';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { CMSApp } from './app';
import { AppInit } from '../interfaces/app-init';
import { AuthService } from '../services';
import { CommonUtilities } from '../utilities';
// import reportWebVitals from './report-web-vitals';
// import LazyHydrate from '../lib/core/react-lazy-hydration';
let elementToRender: any;
declare const window: any;


function App({
               templates,
               components,
               singleDataModelsToPrefetch,
               routes,
               headerComponent,
               footerComponent,
               pencilBannerComponent,
               handleI18
             }: AppInit) {
  const expAnalyticsScript = document.getElementById('exp-analytics-script');
  if((!CommonUtilities.isRenderingOnServer() && window.location.hostname !== 'localhost') && !expAnalyticsScript){
    const expAnalyticsScriptToLoad = document.createElement('script');
    expAnalyticsScriptToLoad.type = 'text/javascript';
    expAnalyticsScriptToLoad.id = 'exp-analytics-script';
    expAnalyticsScriptToLoad.src = 'https://cdn22.myexperro.com/experro-analytics-library/analytics.min.js';
    document.head.append(document.createRange().createContextualFragment(expAnalyticsScriptToLoad.outerHTML));
  }

  const rootElement = document.getElementById('root');
  function initAnalytics(tenantId, workspaceId, environmentId, channelId, language) {
    const ExpAnalytics = window.ExpAnalytics;
    if (window.location.hostname === 'localhost' || !ExpAnalytics) {
      if(!ExpAnalytics) {
        setTimeout(function(){
          initAnalytics(tenantId, workspaceId, environmentId, channelId, language);
        }, 1000);
      }
    } else {
      // @ts-ignore Because this is overridden
      ExpAnalytics.enable_orientation_tracking = false;

      ExpAnalytics.getViewName = function () {
        //get base for our view
        const view = document.title;
        return view;
      }

      ExpAnalytics.q.push(['track_sessions']);

      ExpAnalytics.init({
        app_key: 'k',
        url: '/analytics-service/v1',
        use_session_cookie: true,
        debug: false,
        require_consent: false,
        // inactivity_time: 5,
        // session_update:30,
        offline_mode: false,
        enable_orientation_tracking: false,
        headers: {
          'x-tenant-id': tenantId,
          'x-workspace-id': workspaceId,
          'x-env-id': environmentId,
          'x-channel-id': channelId,
          'x-channel-locale': language
        },
        force_post: true
      });
      ExpAnalytics.q.push(['track_links']);
    }

  }
  function loadMainApp(response : any) {
    AuthService.setUserDetails(response, true);
    if(!CommonUtilities.isRenderingOnServer()){

      // Prevent analytics from loading when the site is opened within an iframe in our own site
      if (window.self !== window.top) {
        try {
          if (window?.parent?.location?.origin !== window?.location?.origin) {
            initAnalytics(response.tenantId, response.workspaceId, response.environmentId, response.channelId, response.language
            );
          }
        } catch (e) {
          initAnalytics(response.tenantId, response.workspaceId, response.environmentId, response.channelId, response.language
          );
        }
      } else {
        initAnalytics(response.tenantId, response.workspaceId, response.environmentId, response.channelId, response.language
        );
      }
    }
    
    const language_code = CommonUtilities.getLanguage();
    if(language_code?.length){
      document.querySelector('html')?.setAttribute('lang', language_code);
    }
    if (rootElement) {
      elementToRender = (
        <CMSApp
          templates={templates}
          widgets={{}}
          components={components}
          routes={routes}
          singleDataModelsToPrefetch={singleDataModelsToPrefetch}
          headerComponent={headerComponent}
          footerComponent={footerComponent}
          pencilBannerComponent={pencilBannerComponent}
        />
      );

      // Suppress specific React error messages to avoid cluttering the console for Minified React error.
      window.onerror = function(message, source, lineno, colno, error) {
        // Suppress Minified React error #418 and others
        if (/Minified React error #\d+/.test(message)) {
          return true;
        }else{
          // Optionally, log all other errors to the console
          console.error(message, source, lineno, colno, error);
          return;
        }
      };

      if (rootElement.hasChildNodes()) {
        hydrateRoot(rootElement, elementToRender);
        //reportWebVitals();
      } else {
        const root = createRoot(rootElement);
        root.render(elementToRender);
        //reportWebVitals();
      }
    }
    if(handleI18) handleI18();
  }

  try {
    const pingDetailsPromise = AuthService.checkSessionInfo();
    const userSessionPromise = AuthService.getUserSessionInfo();
    const apiCallsPromises = [pingDetailsPromise];
    if(process.env.REACT_APP_ECOMMERCE_MODULE_ENABLE === 'true') {
      apiCallsPromises.push(userSessionPromise);
    }
    Promise.all(apiCallsPromises)
      .then((response) => {
        if(response) {
          const pingResponse = response[0];
          window['__PING_DETAILS__'] = pingResponse;
          if(response[1]) {
            const user = response[1];
            if (user && user.userInfo) {
              pingResponse.userInfo = user.userInfo;
              window['__USER_DETAILS__'] = user;
              loadMainApp(pingResponse);
            }
          } else {
            const userEmptyObj = {
              userInfo : {}
            }
            pingResponse.userInfo = userEmptyObj.userInfo;
            window['__USER_DETAILS__'] = userEmptyObj;
            loadMainApp(pingResponse);
          }
        } else {
          console.error('there is not a ping response');
        }
      }).catch((e) => {
      console.error('error in ping', e);
    });
  } catch (err) {
    console.error('error in ping', err);
  }
}

export { App };
