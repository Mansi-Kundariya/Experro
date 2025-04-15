declare const window: any;
function handleAppendToHTML(
  windowKey,
  elementToAppend,
  tagType: 'style_etl' | 'script_etl',
  forGlobalSettings = false
) {
  setTimeout(() => {
    if (!window[`${windowKey}_${tagType}`]) {
      try {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = elementToAppend;

        let elementStyleScript: any;

        if (tagType === 'style_etl') {
          elementStyleScript = tempElement.querySelector('style');
          elementStyleScript.setAttribute(
            'data-id',
            `${forGlobalSettings ? 'global_style_etl' : 'style_etl'}`
          );
        } else {
          elementStyleScript = tempElement.querySelector('script');
          elementStyleScript.setAttribute(
            'data-id',
            `${forGlobalSettings ? 'global_script_etl' : 'script_etl'}`
          );
        }

        if (elementStyleScript) {
          const modifiedScriptStyle = tempElement.innerHTML;

          document
            .querySelector('head')
            .insertAdjacentHTML('beforeend', modifiedScriptStyle);

          const scriptTag = document.createElement('script');
          scriptTag.setAttribute('data-id', 'script_etl');
          scriptTag.textContent = `window['${windowKey}_${tagType}'] = true;`;
          document.querySelector('head').appendChild(scriptTag);
        }
      } catch (e) {
        console.error(e, 'Something went wrong at handleAppendToHTML');
      }
    }
  }, 10);
}

function handle_etl_fieldOnPageChange() {
  try {
    const styles = document.querySelectorAll('style');
    const stylesToRemove = Array.from(styles).filter(function (style) {
      return style.getAttribute('data-id') === 'style_etl';
    });

    stylesToRemove.forEach(function (style) {
      style.remove();
    });

    const scripts = document.querySelectorAll('script');
    const scriptsToRemove = Array.from(scripts).filter(function (script) {
      return script.getAttribute('data-id') === 'script_etl';
    });

    scriptsToRemove.forEach(function (script) {
      script.remove();
    });
    for (const key in window) {
      // Check if the key ends with '_etl'
      if (key.endsWith('_etl')) {
        // console.log(key);

        window[key] = false;
      }
    }
  } catch (e) {
    console.error(e, 'Something went wrong at handle_etl_fieldOnPageChange');
  }
}

function getNested_etl_fields(global_settings: any) {
  const result = {};

  for (const key in global_settings) {
    if (
      typeof global_settings[key] === 'object' &&
      global_settings[key] !== null
    ) {
      // If the value is an object or array, recursively call the function
      Object.assign(result, getNested_etl_fields(global_settings[key]));
    } else {
      // Check if the key ends with '_etl'
      if (key.endsWith('_etl')) {
        // Store the key-value pair in the result object
        result[key] = global_settings[key];
      }
    }
  }
  return result;
}
export function handleScriptAndStyleFields(page) {
  // handle_etl_fieldOnPageChange();

  try {
    // Style etl handleing
    const style_feilds = Object.getOwnPropertyNames(page).filter((item) =>
      item.endsWith('style_etl')
    );

    if (style_feilds?.length) {
      for (let i = 0; i < style_feilds?.length; i++) {
        // console.log('Before appending Style ::', page[`${style_feilds[i]}`]);
        handleAppendToHTML(
          `${page.id}_${i}`,
          page[`${style_feilds[i]}`],
          'style_etl'
        );
      }
    }
  } catch (e) {
    console.error(e, 'Something went wrong while managing the style_etl');
  }

  // Script etl handleing
  try {
    const script_feilds = Object.getOwnPropertyNames(page).filter((item) =>
      item.endsWith('script_etl')
    );

    if (script_feilds?.length) {
      for (let i = 0; i < script_feilds?.length; i++) {
        handleAppendToHTML(
          `${page.id}_${i}`,
          page[`${script_feilds[i]}`],
          'script_etl'
        );
      }
    }
  } catch (e) {
    console.error(e, 'Something went wrong while managing the script_etl');
  }

  /**
   * Handleing for globalSettings Style_etl and Script_etl
   */
  try {
    const global_settings_etl_fields = getNested_etl_fields(
      page?.globalSettings
    );
    if (global_settings_etl_fields) {
      // Style etl handling from global settings
      const styles_etls = Object.keys(global_settings_etl_fields).filter(
        (item) =>
          item.endsWith('style_etl') && global_settings_etl_fields[item]?.length
      );
      if (styles_etls?.length) {
        for (let i = 0; i < styles_etls?.length; i++) {
          handleAppendToHTML(
            `${page.id}_${i}`,
            global_settings_etl_fields[styles_etls[i]],
            'style_etl',
            true
          );
        }
      }

      // Script etl handling from global settings
      const script_etls = Object.keys(global_settings_etl_fields).filter(
        (item) =>
          item.endsWith('script_etl') &&
          global_settings_etl_fields[item]?.length
      );
      if (script_etls?.length) {
        for (let i = 0; i < script_etls?.length; i++) {
          handleAppendToHTML(
            `${page.id}_${i}`,
            global_settings_etl_fields[script_etls[i]],
            'script_etl',
            true
          );
        }
      }
    }
  } catch (e) {
    console.error(
      e,
      'Something went wrong while handeling _etl fields from globalSettings'
    );
  }
}
