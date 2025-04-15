import React, { useEffect, useState } from 'react';
import { TraitInterface } from '../../interfaces/trait.interface';
import {
  ExpTextInput,
  ExpCheckboxInput,
  ExpTextAreaInput,
  ExpColorPickerInput,
  ExpDropDownInput,
  ExpDataSourceDropDown1,
  ExpContentModelListPopUp,
  ExpImageselector,
  ExpImagePicker,
  ExpColor,
} from '../../components/common-components';
import { handelEditDataOfContentLibraryFromUiBuilder } from '../../utilities';
import ExpProductCardWithTabsCustom from './product-card-with-tabs/prododuct-card-with-tabs-custom';

const ExperroStorefront: React.FC<any> = ({ value, changeHandler }) => {
  const compoents = {
    exp_text: ExpTextInput,
    exp_checkbox: ExpCheckboxInput,
    exp_textArea: ExpTextAreaInput,
    exp_colorPicker: ExpColorPickerInput,
    exp_color: ExpColor,
    exp_dropDown: ExpDropDownInput,
    exp_dataSourceDropDown: ExpDataSourceDropDown1,
    exp_contentModalPopUp: ExpContentModelListPopUp,
    exp_imageSelector: ExpImageselector,
    exp_image: ExpImagePicker,
    exp_productCard: ExpProductCardWithTabsCustom,
  };

  const [traitConfigToLoop, setTraitConfigToLoop] = useState<any>({});
  const [tabsIsExpanded, setTabsIsExpanded] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [traitData, setTraitData] = useState<any>(
    value?.length ? JSON.parse(value) : {}
  );
  const { traitConfig, dataSource, contentModel }: any = traitData;
  const getValueForCheckBox = (value) => {
    if (!value || value === 'off') {
      return 'on';
    } else if (value === 'on') {
      return 'off';
    }
  };

  const handelInputChange = (field: string, event: any, type?: string) => {
    if (field === 'editDataFlag' && type === 'exp_contentModalPopUp') {
      handelEditDataOfContentLibraryFromUiBuilder(
        traitData,
        setTraitData,
        event
      );
    } else if (field === 'dataSource' && type === 'exp_dataSourceDropDown') {
      setTraitData({
        ...traitData,
        ['contentModel']: '',
        [field]: event?.target?.value,
      });
    } else if (
      type === 'exp_colorPicker' ||
      type === 'exp_imageSelector' ||
      type === 'exp_image' ||
      type === 'exp_productCard' ||
      type === 'exp_color'
    ) {
      setTraitData({ ...traitData, [field]: event });
    } else if (type === 'exp_checkbox') {
      const value = getValueForCheckBox(traitData[field]);
      setTraitData({ ...traitData, [field]: value });
    } else if (
      type === 'exp_text' ||
      type === 'exp_contentModalPopUp' ||
      type === 'exp_textArea' ||
      type === 'exp_dropDown'
    ) {
      setTraitData({ ...traitData, [field]: event?.target?.value });
    }
  };

  const processDependancyConfig = (configData: any) => {
    try {
      if (configData.dependencyConfig?.operator === 'AND') {
        let returnValue = true;
        for (const config of configData.dependencyConfig.config) {
          const traitDataValue = traitData[config.name];
          if (!traitDataValue) {
            returnValue = false;
            break;
          } else if (
            traitDataValue &&
            config?.value?.length &&
            !config?.value.includes(traitDataValue)
          ) {
            returnValue = false;
            break;
          }
        }
        return returnValue;
      } else {
        let returnValue = false;
        for (const config of configData.dependencyConfig.config) {
          const traitDataValue = traitData[config.name];
          if (traitDataValue) {
            if (config?.value?.length) {
              if (config?.value.includes(traitDataValue)) {
                returnValue = true;
                break;
              }
            } else {
              returnValue = true;
              break;
            }
          }
        }
        return returnValue;
      }
    } catch (err) {
      return true;
    }
  };

  const handelComponentToShowOrNot = (configData: any) => {
    let returnValue = true;
    if (configData.dependent) {
      if (configData?.operator !== 'isNot') {
        if (!traitData[configData.dependent]) {
          returnValue = false;
        } else if (
          configData.subDependency &&
          configData.subDependency !== traitData[configData.dependent]
        ) {
          returnValue = false;
        }
      } else {
        if (traitData[configData.dependent] && !configData.subDependency) {
          returnValue = false;
        } else if (
          configData.subDependency &&
          configData.subDependency === traitData[configData.dependent]
        ) {
          returnValue = false;
        }
      }
    }
    if (configData.hideWhenContentLibrary && dataSource === 'contentLibrary') {
      returnValue = false;
    }
    if (configData.hideWhenFreeForm && dataSource === 'freeForm') {
      returnValue = false;
    }
    if (configData.dependencyConfig) {
      returnValue = processDependancyConfig(configData);
    }
    return returnValue;
  };

  const processTraitData = () => {
    const tempTraidDataToLoop: any = {};
    const isTraitCategoryPresent = traitConfig?.find((elem: any) => {
      if (elem.category) {
        return elem;
      }
    });
    if (isTraitCategoryPresent) {
      const defaultOpen = traitData.defaultOpen || 'Component Settings';
      traitConfig?.forEach((elem: any) => {
        if (!elem.category) {
          elem.category = 'Component Settings';
        }
        if (defaultOpen === elem.category) {
          setTabsIsExpanded((prevState) => {
            return { ...prevState, [elem?.category]: true };
          });
        } else {
          setTabsIsExpanded((prevState) => {
            return { ...prevState, [elem?.category]: false };
          });
        }
        const configPresentInTempObj = tempTraidDataToLoop[elem.category];
        if (configPresentInTempObj) {
          tempTraidDataToLoop[elem.category] = [
            ...tempTraidDataToLoop[elem.category],
            elem,
          ];
        } else {
          tempTraidDataToLoop[elem.category] = [elem];
        }
      });
    }
    setTraitConfigToLoop(tempTraidDataToLoop);
  };

  useEffect(() => {
    changeHandler(JSON.stringify(traitData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traitData]);

  useEffect(() => {
    processTraitData();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="custom-fields">
      {!isLoading && (
        <>
          {Object.keys(traitConfigToLoop)?.length ? (
            Object.keys(traitConfigToLoop)?.map((elem: any, index: number) => {
              const _traitConfig = traitConfigToLoop[elem];
              return (
                <>
                  <div
                    className={`gjs-sm-sector-title ${
                      tabsIsExpanded[elem] ? 'is-expanded' : ''
                    }`}
                    onClick={() =>
                      setTabsIsExpanded({
                        ...tabsIsExpanded,
                        [elem]: !tabsIsExpanded[elem],
                      })
                    }>
                    <span>{elem}</span>
                  </div>
                  {tabsIsExpanded[elem] && (
                    <div key={index} className="gjs-sm-sector-content">
                      {_traitConfig?.length &&
                        _traitConfig?.map((config: any) => {
                          const componentToShow =
                            handelComponentToShowOrNot(config);
                          const ComponentToRender = compoents[config.type];
                          return (
                            <>
                              {ComponentToRender && componentToShow ? (
                                <div key={config.internalName}>
                                  <ComponentToRender
                                    changeHandler={handelInputChange}
                                    field={config.internalName}
                                    label={config.displayName}
                                    inputValue={traitData[config.internalName]}
                                    type={config.type}
                                    defaultValue={config?.defaultValue}
                                    options={config.options}
                                    dataSource={dataSource}
                                    disableSource={config.disableSource}
                                    modelInternalName={config.modelInternalName}
                                    contentModalData={
                                      config.internalName
                                        ? traitData[config.internalName]
                                        : contentModel
                                    }
                                    multiSelect={config.multiSelect}
                                  />
                                </div>
                              ) : (
                                ''
                              )}
                            </>
                          );
                        })}
                    </div>
                  )}
                </>
              );
            })
          ) : (
            <>
              {traitConfig?.length &&
                traitConfig?.map((config: any) => {
                  const componentToShow = handelComponentToShowOrNot(config);
                  const ComponentToRender = compoents[config.type];
                  return (
                    <>
                      {ComponentToRender && componentToShow ? (
                        <div
                          className={
                            config.internalName
                              ? config.internalName?.toLowerCase()
                              : ''
                          }
                          key={config.internalName}>
                          <ComponentToRender
                            changeHandler={handelInputChange}
                            field={config.internalName}
                            label={config.displayName}
                            inputValue={traitData[config.internalName]}
                            type={config.type}
                            defaultValue={config?.defaultValue}
                            options={config.options}
                            dataSource={dataSource}
                            disableSource={config.disableSource}
                            modelInternalName={config.modelInternalName}
                            contentModalData={contentModel}
                            multiSelect={config.multiSelect}
                          />
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  );
                })}
            </>
          )}
        </>
      )}
    </div>
  );
};

const experroStorefront: TraitInterface = {
  traitName: 'experro-storefront',
  component: ExperroStorefront,
};

export default experroStorefront;
