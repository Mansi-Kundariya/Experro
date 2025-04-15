import React, { useEffect, useState } from 'react';
import { AnalyticsService, ContentService } from '../../services';
import {
  CommonUtilities,
  configureDevelopmentEnvironment,
  handleLanguageChange,
  pageScriptManager,
} from '../../utilities';
import { IsCMSApp } from '../../app-main-index';
import { useSearchParams } from 'react-router-dom';
import { setSEODetails } from '../../utilities/';
import { handleScriptAndStyleFields } from '../../utilities/handle-etl-field-style-script';
import { expLocalizedChannelTags } from '../../utilities/localized-version-tags';

let custom_domains = [];
declare const window: any;
let globalSettings;
let scriptManager;
const Page = ({
  templates,
  components,
  componentToLoad,
}: {
  templates: any;
  components: any;
  componentToLoad?: any;
}) => {
  const [queryParams] = useSearchParams();
  let isPageLoaded = false;
  const current_channel = CommonUtilities.getCurrentChannelInfo();
  const templateModelMapping = {};
  let defaultTemplate = null;

  let _defaultTemplates: any = templates;
  if (current_channel) {
    if (
      templates[current_channel?.channel_id] &&
      templates[current_channel?.channel_id][current_channel?.language]
    ) {
      _defaultTemplates =
        templates[current_channel?.channel_id][current_channel?.language];
    } else if (templates?.default) {
      _defaultTemplates = templates.default;
    }
  }
  for (const templateName in _defaultTemplates) {
    const template = _defaultTemplates[templateName];
    if (template?.contentModel) {
      templateModelMapping[template.contentModel] = template;
    }
    if (template?.isDefault) {
      defaultTemplate = template;
    }
  }

  const pageState = CommonUtilities.getLocalState('_page');
  let page;
  // TODO : Remove condition pageState.is_visible_ebi==true this is temporary fix
  if (pageState && !isPageLoaded) {
    page = pageState.data.Data;
    const globalSettingsState =
      CommonUtilities.getLocalState('gs_cmp_global_scmp');
    const scriptManagerState =
      CommonUtilities.getLocalState('id_script_manager');

    page.globalSettings = globalSettingsState.data.Data;
    expLocalizedChannelTags(page?.domain_urls);

    if (page.template) {
      // Check current_channel wise templates and template exists or not
      if (
        current_channel &&
        templates[current_channel?.channel_id] &&
        templates[current_channel?.channel_id][current_channel?.language] &&
        templates[current_channel?.channel_id][current_channel?.language][
          getTemplateName(page.template)
        ]
      ) {
        const current_channel_templates =
          templates[current_channel?.channel_id][current_channel?.language];
        if (current_channel_templates[getTemplateName(page.template)]) {
          page.Component =
            current_channel_templates[getTemplateName(page.template)][
              'component'
            ];
        }
      } else {
        // Fallback if current channel OR template not found for channel templates OR template not exists in channel templates
        if (templates?.default) {
          templates = templates.default;
        }
        if (templates[getTemplateName(page.template)]) {
          page.Component =
            templates[getTemplateName(page.template)]['component'];
        } else if (defaultTemplate) {
          page.Component = defaultTemplate['component'];
        }
      }
    } else {
      const defaultTemplateModelMapping = [];

      // Default template key found then only.
      if (templates?.default) {
        for (const templateName in templates?.default) {
          const template = templates?.default[templateName];
          if (template?.contentModel) {
            defaultTemplateModelMapping[template.contentModel] = template;
          }
          if (template?.isDefault) {
            defaultTemplate = template;
          }
        }
      }
      // Check for the channel templates in templateModelMapping
      if (
        templateModelMapping[getTemplateName(page.content_model_internal_name)]
      ) {
        page.Component =
          templateModelMapping[
            getTemplateName(page.content_model_internal_name)
          ]['component'];
      }
      // When template not found in channel specific tempaltes then check in default templates
      else if (
        defaultTemplateModelMapping[
          getTemplateName(page.content_model_internal_name)
        ]
      ) {
        page.Component =
          defaultTemplateModelMapping[
            getTemplateName(page.content_model_internal_name)
          ]['component'];
      } else if (defaultTemplate) {
        page.Component = defaultTemplate['component'];
      }
    }
    setSEODetails(page);
    if (scriptManagerState && scriptManagerState?.data?.Data?.items?.length) {
      pageScriptManager(
        scriptManagerState?.data?.Data?.items,
        page.content_model_internal_name
      );
    }
    // handling the etl field page wise
    handleScriptAndStyleFields(page);
  }
  const initialState: any = page ? page : {};
  const isCMSPage = componentToLoad ? false : true;
  const [pageData, setPageData] = useState(initialState);

  if (!pageData.Component) {
    const element = document.getElementById('_exp_page_main_container_');
    element?.classList.add('_exp_page_main_container_');
    goToTop();
  } else {
    setTimeout(() => {
      const element = document.getElementById('_exp_page_main_container_');
      element?.classList.remove('_exp_page_main_container_');
    }, 10);
  }
  // if (!isPageLoaded) {
  //   checkSSR();
  // }
  //Configure development environment warnings messages wrapper
  configureDevelopmentEnvironment();

  const handleNewDomainUrl = (event: any) => {
    if (event?.detail) {
      custom_domains = event?.detail;
    }
  };

  useEffect(() => {
    document.addEventListener('LANGUAGE_CHANGE', (event: any) =>
      handleLanguageChange(
        pageData,
        event,
        custom_domains?.length ? custom_domains : pageData?.domain_urls
      )
    );
    document.addEventListener('COLOR_CHANGE', handleNewDomainUrl);
    return () => {
      document.removeEventListener('COLOR_CHANGE', handleNewDomainUrl);
      document.removeEventListener('LANGUAGE_CHANGE', (event: any) =>
        handleLanguageChange(
          pageData,
          event,
          custom_domains?.length ? custom_domains : pageData?.domain_urls
        )
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  useEffect(() => {
    if (!isPageLoaded) {
      //initPage();
      checkSSR();
    }
    return () => {
      custom_domains = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.createElement(pageData.Component ? pageData.Component : 'div', {
    pageData: pageData,
    components: components,
  });

  function checkSSR() {
    if (page) {
      isPageLoaded = true;
      loadPage(page);
    } else {
      initPage();
    }
  }

  async function initPage() {
    const queryParams = new URLSearchParams(window.location.search);
    const promises = [];
    if (isCMSPage) {
      const pagePromise = ContentService.getPageDataBySlugV2({
        pageSlug: window.location.pathname
          .replace('/_ssr_', '')
          .replace('/_admin_theme_', ''),
        versionId: queryParams.get('vid'),
        lang: queryParams.get('lang'),
      });
      promises.push(pagePromise);
    }

    if (!globalSettings) {
      const globalSettingsPromise = ContentService.getSingleTypeContentV2({
        modelName: 'global_settings',
        componentId: 'gs_cmp',
        ssrKey: 'global_scmp',
        enableSSR: true,
        versionId: null,
      });
      promises.push(globalSettingsPromise);
    }

    if (!scriptManager) {
      const scriptManagersPromise =
        ContentService.searchContentModelRecordsByFieldKeyValueGETV2({
          modelInternalName: 'script_manager',
          fieldKey: 'id',
          fieldValue: '*',
          fieldsToQuery: '*',
          enableSSR: true,
          ssrKey: 'script_manager',
        });
      promises.push(scriptManagersPromise);
    }

    Promise.all(promises)
      .then((values) => {
        let page;

        if (isCMSPage) {
          page = values[0];
        } else {
          page = {
            Component: componentToLoad,
          };
        }
        if (!globalSettings) {
          if (isCMSPage) {
            globalSettings = values[1];
          } else {
            globalSettings = values[0];
          }
        }

        if (!scriptManager) {
          if (isCMSPage) {
            scriptManager = values[2]?.Data?.records;
          } else {
            scriptManager = values[1]?.Data?.records;
          }
        }

        //Task: Adding Script to from the Script Manager based on the page/template
        //Where: Script will be added as per specified in record
        pageScriptManager(scriptManager, page.content_model_internal_name);

        if (globalSettings) {
          page.globalSettings = globalSettings;
          // page.menu_id_esi = globalSettings.header_com[0].navigation_menu_id_et;
        }

        if (scriptManager) {
          page.scriptManager = scriptManager;
        }
        // TODO : This is temporary fix, remove it later
        if (page.is_visible_ebi === false) {
          throw new Error('Product not visible');
        }
        // handling the etl field page wise
        handleScriptAndStyleFields(page);
        setSEODetails(page);
        expLocalizedChannelTags(page?.domain_urls);
        const pageEditorField = Object.keys(page).find((item) => {
          // _epe we are getting from the v1 response, in v2 we will be getting key as 'content_content', for now we are receiving only 'content' so related handling added
          return item.endsWith('_content') || item.endsWith('_epe');
        });
        if (pageEditorField) {
          try {
            const pageEditorCSS = JSON.parse(page[pageEditorField])[
              '__style_tag__'
            ];
            if (pageEditorCSS) {
              if (IsCMSApp) {
                const styleTag = document.createElement('style');
                styleTag.textContent = pageEditorCSS;
                styleTag.id = '__gjs_exp_style__';
                window.document.head.append(styleTag);
              } else {
                setTimeout(() => {
                  if (window.editor) {
                    window.editor.Css.addRules(pageEditorCSS);
                  }
                }, 7000);
              }
            }
          } catch (e) {
            console.error(e);
          }
        }

        if (page.template) {
          // Check current_channel wise templates and template exists or not
          if (
            current_channel &&
            templates[current_channel?.channel_id] &&
            templates[current_channel?.channel_id][current_channel?.language] &&
            templates[current_channel?.channel_id][current_channel?.language][
              getTemplateName(page.template)
            ]
          ) {
            const current_channel_templates =
              templates[current_channel?.channel_id][current_channel?.language];
            if (current_channel_templates[getTemplateName(page.template)]) {
              page.Component =
                current_channel_templates[getTemplateName(page.template)][
                  'component'
                ];
            }
          } else {
            // Fallback if current channel OR template not found for channel templates OR template not exists in channel templates

            if (templates?.default) {
              templates = templates.default;
            }
            if (templates[getTemplateName(page.template)]) {
              page.Component =
                templates[getTemplateName(page.template)]['component'];
            } else if (defaultTemplate) {
              page.Component = defaultTemplate['component'];
            }
          }
        } else if (!page.Component) {
          const defaultTemplateModelMapping = [];

          // Default template key found then only.
          if (templates?.default) {
            for (const templateName in templates?.default) {
              const template = templates?.default[templateName];
              if (template?.contentModel) {
                defaultTemplateModelMapping[template.contentModel] = template;
              }
              if (template?.isDefault) {
                defaultTemplate = template;
              }
            }
          }

          // Check for the channel templates in templateModelMapping
          if (
            templateModelMapping[
              getTemplateName(page.content_model_internal_name)
            ]
          ) {
            page.Component =
              templateModelMapping[
                getTemplateName(page.content_model_internal_name)
              ]['component'];
          }
          // When template not found in channel specific tempaltes then check in default templates
          else if (
            defaultTemplateModelMapping[
              getTemplateName(page.content_model_internal_name)
            ]
          ) {
            page.Component =
              defaultTemplateModelMapping[
                getTemplateName(page.content_model_internal_name)
              ]['component'];
          } else if (defaultTemplate) {
            page.Component = defaultTemplate['component'];
          }
        }

        page.STORE_HASH = CommonUtilities.getStoreHash();
        setTimeout(function () {
          document.body.setAttribute('class', '');
          document.body.classList.add('group/body');
          if (page?.title) {
            const pageTitleClass = (
              page?.title?.replace(/[^a-zA-Z0-9 ]/g, '') || ''
            )
              .split(' ')
              .join('-')
              .toLowerCase();
            document.body.classList.add(pageTitleClass);
          }
          let pageType = '';
          if (page.content_model_internal_name) {
            pageType = getTemplateName(page.content_model_internal_name)
              .split('_')
              .join('-');
          } else {
            if (componentToLoad && componentToLoad.name) {
              pageType = componentToLoad.name.toLowerCase();
            }
          }
          document.body.classList.add('page-type-' + pageType);
        }, 0);
        loadPage(page);
      })
      .catch(async (e) => {
        console.error(e);
        try {
          if (!globalSettings) {
            globalSettings = await ContentService.getSingleTypeContentV2({
              modelName: 'global_settings',
              componentId: 'gs_cmp',
              ssrKey: 'global_scmp',
              enableSSR: true,
              versionId: null,
            });
          }
          if (!scriptManager) {
            const scriptManagerData =
              await ContentService.searchContentModelRecordsByFieldKeyValueGETV2(
                {
                  modelInternalName: 'script_manager',
                  fieldKey: 'id',
                  fieldValue: '*',
                  fieldsToQuery: '*',
                  enableSSR: false,
                }
              );
            scriptManager = scriptManagerData?.Data?.records;
          }

          //Task: Adding Script to from the Script Manager based on the page/template
          //Where: Script will be added as per specified in record
          pageScriptManager(
            scriptManager,
            pageData.content_model_internal_name
          );
          const page = {
            Component: templates['__404_page__']['component'],
            template: '__404_page__',
            globalSettings,
            scriptManager,
          };
          handleScriptAndStyleFields(page);
          document.body.classList.add('group/body');
          document.body.classList.add('page-type-404');
          loadPage(page);
        } catch (e) {
          console.error('error from initPage', e);
        }
      });
  }

  function getTemplateName(template) {
    if (template.startsWith('ecommerce_')) {
      const templateSplit = template.split('_');
      return `${templateSplit[0]}_${templateSplit[1]}`;
    } else {
      return template;
    }
  }

  function loadPage(page) {
    window.__pageData__ = page;
    document.dispatchEvent(new Event('PAGE_DATA_LOADED'));
    const page_data_loaded = new CustomEvent('EXP_RENDER', {
      detail: {
        pageData: page,
      },
    });
    document.dispatchEvent(page_data_loaded);

    if (!isPageLoaded) {
      setPageData(page);
    }
    ContentService.setPageData(page);
    AnalyticsService.trackPageView({
      pageTitle: page?.title,
      pageUrl: page?.page_slug,
    });
    if (
      page.content_model_internal_name?.startsWith('ecommerce_product') &&
      process.env.REACT_APP_TRACK_GLOBAL_PRODUCT_VIEW_EVENT !== 'false'
    ) {
      let analyticsProductData: any;
      const mode = queryParams.get('m');
      let localstorageAnalyticsData = [];
      if (localStorage.getItem(`${mode}_a_d_`)) {
        localstorageAnalyticsData = JSON.parse(
          localStorage.getItem(`${mode}_a_d_`) as string
        );
      }
      if (localstorageAnalyticsData.length) {
        analyticsProductData = localstorageAnalyticsData?.find(
          (analyticsProduct: any) => analyticsProduct?.sku === page?.sku_esi
        );
      }
      const modeDetails: any = {
        search_term: queryParams.get('st'),
        search_location: analyticsProductData?.search_location,
        category: queryParams.get('c') || analyticsProductData?.category,
        is_primary_algorithm: analyticsProductData?.is_primary_algorithm,
        is_secondary_algorithm: analyticsProductData?.is_secondary_algorithm,
        algorithm: analyticsProductData?.algorithm,
        is_merchandising: analyticsProductData?.is_merchandising,
        rule: analyticsProductData?.rule,
        rule_type: analyticsProductData?.rule_type,
        widget_id: analyticsProductData?.widget_id,
        context_type: analyticsProductData?.context_type,
        context_data: analyticsProductData?.context_data,
        variant: analyticsProductData?.variant,
        rules: analyticsProductData?.rules,
      };
      const productOptions: any = [];
      try {
        if (process.env.REACT_APP_STORE?.toLowerCase() === 'shopify') {
          if (page?.variant_options_ej?.length) {
            page?.variant_options_ej?.forEach((productOption: any) => {
              const tempOption: any = {};
              tempOption['name'] = productOption?.name;
              tempOption['value'] = productOption?.values?.[0];
              productOptions.push(tempOption);
            });
          }
        } else if (process.env.REACT_APP_STORE?.toLowerCase() === 'magento') {
          if (page?.variant_options_ej?.length) {
            page?.variant_options_ej?.forEach((productOption: any) => {
              const tempOption: any = {};
              tempOption['name'] = productOption?.label;
              tempOption['value'] =
                productOption?.values?.[productOption?.id]?.[0]?.value_label;
              productOptions.push(tempOption);
            });
          }
          if (page?.provider_specific_data_ej?.modifiers?.length) {
            page?.provider_specific_data_ej?.modifiers?.forEach(
              (productModifier: any) => {
                const tempModifier: any = {};
                tempModifier['name'] = productModifier?.title;
                if (productModifier?.values?.length) {
                  tempModifier['value'] = productModifier?.values?.[0]?.title
                    ? productModifier?.values?.[0]?.title
                    : '';
                } else {
                  tempModifier['value'] = '';
                }
                productOptions.push(tempModifier);
              }
            );
          }
        } else {
          if (page?.variant_options_ej?.length) {
            page?.variant_options_ej?.forEach((productOption: any) => {
              const tempOption: any = {};
              let defaultSelected = productOption?.option_values?.filter(
                (opt: any) => {
                  return opt?.is_default;
                }
              );
              if (defaultSelected?.length === 0) {
                defaultSelected = productOption?.option_values[0];
              } else {
                defaultSelected = defaultSelected[0];
              }
              tempOption['name'] = productOption?.display_name;
              tempOption['value'] = defaultSelected?.label;
              productOptions.push(tempOption);
            });
          }
          if (page?.provider_specific_data_ej?.modifiers?.length) {
            page?.provider_specific_data_ej?.modifiers?.forEach(
              (productModifier: any) => {
                const tempModifier: any = {};
                let defaultSelected = productModifier?.option_values?.filter(
                  (opt: any) => {
                    return opt?.is_default;
                  }
                );
                if (defaultSelected?.length === 0) {
                  defaultSelected = productModifier?.option_values[0];
                } else {
                  defaultSelected = defaultSelected[0];
                }
                tempModifier['name'] = productModifier?.display_name;
                tempModifier['value'] = defaultSelected?.label;
                productOptions.push(tempModifier);
              }
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
      AnalyticsService.trackProductViewed({
        sku: page?.sku_for_analytics_esli,
        price: page.calculated_price_efi,
        searchTerm: queryParams.get('st'),
        search_location: analyticsProductData?.search_location,
        mode: queryParams.get('m') ? queryParams.get('m') : 'direct',
        category: queryParams.get('c') || analyticsProductData?.category,
        brand: page.brand_esi,
        name: page.name_esi,
        productCategories: page?.category_meta_ej,
        is_primary_algorithm: analyticsProductData?.is_primary_algorithm,
        is_secondary_algorithm: analyticsProductData?.is_secondary_algorithm,
        algorithm: analyticsProductData?.algorithm,
        is_merchandising: analyticsProductData?.is_merchandising,
        rule: analyticsProductData?.rule,
        rule_type: analyticsProductData?.rule_type,
        widget_id: analyticsProductData?.widget_id,
        context_type: analyticsProductData?.context_type,
        context_data: analyticsProductData?.context_data,
        variant: analyticsProductData?.variant,
        rules: analyticsProductData?.rules,
        mode_details: modeDetails,
        product_option: productOptions,
      });
    }
    goToTop();
    isPageLoaded = true;
  }

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
};
export { Page };
