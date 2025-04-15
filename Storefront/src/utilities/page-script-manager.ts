import { IsCMSApp } from '../app-main-index';
import { CommonUtilities } from './common';

function handelScriptsForPage(
  script_location: string,
  script_to_add: string,
  window_id_postfix: any
) {
  if (script_location === 'Header' && script_to_add?.length) {
    if (window[`__headerScriptAppended_${window_id_postfix}`]) {
      return;
    }
    const headerScript: any = script_to_add;
    if (headerScript) {
      document.head.append(
        document.createRange().createContextualFragment(headerScript)
      );
      const scriptTag = document.createElement('script');
      scriptTag.id = window_id_postfix;
      scriptTag.textContent = `window['__headerScriptAppended_${window_id_postfix}']=true;`;
      document.head.appendChild(scriptTag);
    }
  } else if (script_location === 'Footer' && script_to_add?.length) {
    if (!CommonUtilities.isRenderingOnServer()) {
      if (window[`__footerScriptAppended_${window_id_postfix}`]) {
        return;
      }
      const footerScript = script_to_add;
      if (footerScript) {
        setTimeout(function () {
          const footer = document.getElementsByTagName('footer')[0];
          if (footer) {
            footer.append(
              document.createRange().createContextualFragment(footerScript)
            );
          }
        }, 5000);
        const scriptTag = document.createElement('script');
        scriptTag.id = window_id_postfix;
        scriptTag.textContent = `window['__footerScriptAppended_${window_id_postfix}']=true;`;
        document.head.appendChild(scriptTag);
      }
    }
  } else if (script_location === 'Body' && script_to_add?.length) {
    if (window[`__bodyScriptAppended_${window_id_postfix}`]) {
      return;
    }
    const bodyScript = script_to_add;
    if (bodyScript) {
      document.body.append(
        document.createRange().createContextualFragment(bodyScript)
      );

      const scriptTag = document.createElement('script');
      scriptTag.id = window_id_postfix;
      scriptTag.textContent = `window['__bodyScriptAppended_${window_id_postfix}']=true;`;
      document.body.appendChild(scriptTag);
    }
  }
}

//_scriptManager : is a script tag which is added from admin side
//pageContentModelInternalName : It is ecommerce page whose 'content_model_internal_name' starts with 'ecommerce'
export function pageScriptManager(
  _scriptManager: any,
  pageContentModelInternalName?: string
) {
  if (!IsCMSApp) {
    return;
  }

  const scriptManagerComponentData = _scriptManager?.map((item: any) => {
    return item?.version_data?.script?.length && item?.version_data?.script[0];
  });

  if (!scriptManagerComponentData?.length) {
    return;
  }
  let script_to_be_added: any = scriptManagerComponentData?.filter(
    (script_data: any) =>
      script_data?.select_pages_where_script_will_be_added === 'All Pages'
  );

  script_to_be_added = [
    ...script_to_be_added,
    scriptManagerComponentData?.filter(
      (script_data: any) =>
        pageContentModelInternalName?.startsWith('ecommerce_') &&
        script_data?.select_pages_where_script_will_be_added === 'Store Pages'
    ),
  ]?.flat(1);

  if (script_to_be_added) {
    script_to_be_added?.forEach((scriptItem: any) => {
      handelScriptsForPage(
        scriptItem?.location,
        scriptItem?.script_code_script,
        `${scriptItem?.id}`
      );
    });
  }
}
