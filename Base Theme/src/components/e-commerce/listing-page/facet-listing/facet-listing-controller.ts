/* eslint-disable array-callback-return */
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AuthService,
  EcommerceService,
  toast,
  useSearchParams,
} from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import { convertCurrency } from '../../../../utils';

declare let window: any;

export interface ExpFacetListingControllerProps {
  pageData: any;
  changeQueryParamFilter: any;
  convertAmountToBaseCurrency: any;
  disableFacteMode?: boolean;
}

const ExpFacetListingController = (props: ExpFacetListingControllerProps) => {
  const {
    pageData,
    changeQueryParamFilter,
    convertAmountToBaseCurrency,
    disableFacteMode = false,
  } = props;

  const [queryParams] = useSearchParams();
  const [facetListResponse, setFacetListResponse] = useState<any>();
  const [rawFacets, setRawFacets] = useState<any>({});
  const [facets, setFacets] = useState<any>([]);
  const [mobileViewSelectedFacets, setMobileViewSelectedFactes] = useState<any>(
    []
  );
  const [selectedFacets, setSelectedFacets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [minMaxRangeFacets, setMinMaxRangeFacets] = useState<any>();
  const [sliderFacetsData, setSliderFacetsData] = useState<any>();
  const [rangeInitialFacets, setRangeInitialFacets] = useState<any>({});
  const [isFacetDisabled, setIsFacetDisabled] = useState<boolean>(false);
  const [allFacets, setAllFacets] = useState<any>({});

  const { t } = useTranslation();

  const _fs = useMemo(() => queryParams.getAll('_fs'), [queryParams]);
  const _fsr = useMemo(() => queryParams.getAll('_fsr') || [], [queryParams]);
  const _q = useMemo(() => queryParams.get('_q') || [], [queryParams]);

  const handleFacetsLoadMore = (facetData: any) => {
    const tmpFacetData = [...facets];
    tmpFacetData.forEach((_fd: any) => {
      if (facetData?.field_internal_name === _fd?.field_internal_name) {
        _fd.limit += 10;
      }
    });
    setFacets(tmpFacetData);
  };

  const rangeFacets = (getConvertedAmount: boolean) => {
    let rangeFacet: any = [];
    if (queryParams.has('_fsr')) {
      rangeFacet = queryParams.getAll('_fsr').map((_f: any) => {
        const tmp = _f.split(';;');
        if (getConvertedAmount) {
          return {
            field_internal_name: tmp[0],
            min: convertAmountToBaseCurrency(tmp[1]) || '*',
            max: convertAmountToBaseCurrency(tmp[2]) || '*',
          };
        } else {
          return {
            field_internal_name: tmp[0],
            min: tmp[1] || '*',
            max: tmp[2] || '*',
          };
        }
      });
    }
    return rangeFacet;
  };

  const checkedFacet = () => {
    let checkedFacets: any = [];
    if (queryParams.has('_fs')) {
      checkedFacets = queryParams.getAll('_fs').map((_f: any) => {
        const tmp = _f.split(';;');
        return {
          field_internal_name: tmp[0],
          value: tmp[1],
        };
      });
    }
    return checkedFacets;
  };

  const handleSliderValueOnChange = (facet: any, value: any) => {
    setSliderFacetsData({
      ...sliderFacetsData,
      [facet?.field_internal_name]: {
        ...sliderFacetsData[facet?.field_internal_name],
        value: value,
      },
    });
  };

  const handleSliderValueAfterChange = (facet: any, value: any) => {
    const tempRangeFacet = rangeFacets(false)?.filter(
      (elem: any) => elem.field_internal_name !== facet.field_internal_name
    );
    tempRangeFacet.push({
      field_internal_name: facet.field_internal_name,
      min: value[0],
      max: value[1],
    });
    changeQueryParamFilter({
      _fsr: tempRangeFacet.map((facet: any) => {
        return `${facet?.field_internal_name?.toString()};;${facet?.min?.toString()};;${facet?.max?.toString()}`;
      }),
    });
  };

  const processCheckedFacets = (facets: any, checkedFacets: any) => {
    facets?.forEach((_fs: any) => {
      checkedFacets?.forEach((_cf: any) => {
        if (_fs.field_internal_name === _cf.field_internal_name) {
          const foundValue = _fs.facet_list?.find(
            (_f: any) => _cf.value?.toString() === _f.val?.toString()
          );
          if (!foundValue) {
            _fs.facet_list?.push({
              val: _cf.value,
              count: 0,
              is_selected: true,
            });
          }
        }
      });
    });
  };

  const processRangeFacets = (facet: any) => {
    const rangeFacet = rangeFacets(false);
    const facetFound = rangeFacet.find(
      (_f: any) => _f.field_internal_name === facet.field_internal_name
    );
    setMinMaxRangeFacets((prevState: any) => {
      return {
        ...prevState,
        [facet.field_internal_name]: {
          min: facetFound && facetFound.min !== '*' ? facetFound.min : '',
          max: facetFound && facetFound.max !== '*' ? facetFound.max : '',
        },
      };
    });
  };

  const getMinMaxValueForRangeFacets = (facetsObject: any) => {
    const minMax = {
      min: 0,
      max: 0,
    };
    Object.keys(facetsObject)?.forEach((elem: any) => {
      if (elem?.toLowerCase()?.includes('min')) {
        minMax['min'] = +facetsObject[elem];
      } else if (elem?.toLowerCase()?.includes('max')) {
        minMax['max'] = +facetsObject[elem];
      }
    });
    return minMax;
  };

  const getSliderFacetToUse = (facet: any, initialFacet: any) => {
    if (facet?.min?.toString() && facet?.max?.toString() && !initialFacet) {
      return facet;
    } else if (
      facet &&
      initialFacet &&
      initialFacet[facet.field_internal_name] &&
      initialFacet[facet.field_internal_name][facet?.display_name]
    ) {
      const minMaxObject = getMinMaxValueForRangeFacets(
        initialFacet[facet.field_internal_name][facet?.display_name]
      );
      facet.min = minMaxObject?.min;
      facet.max = minMaxObject?.max;
      return facet;
    }
  };

  const handleMultiCurrencyForSliderValues = (value: any) => {
    const currencyObj = AuthService.getUserDetails()?.defaultCurrency;
    if (currencyObj && process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true') {
      const { currency_exchange_rate } = currencyObj;
      const convertedCurrency = convertCurrency(value, currency_exchange_rate);
      return convertedCurrency;
    } else {
      return value;
    }
  };

  const processSliderFacets = (facet: any, initialFacet: any) => {
    const rangeFacet = rangeFacets(false);
    let sliderMin: any;
    let sliderMax: any;
    const sliderValue = rangeFacet?.find(
      (_f: any) => facet?.field_internal_name === _f.field_internal_name
    );
    const processedSliderFace = getSliderFacetToUse(facet, initialFacet);
    if (facet.field_internal_name === 'calculated_price_efi') {
      sliderMin = handleMultiCurrencyForSliderValues(processedSliderFace.min);
      sliderMax = handleMultiCurrencyForSliderValues(processedSliderFace.max);
    } else {
      sliderMin = processedSliderFace.min;
      sliderMax = processedSliderFace.max;
    }
    const marks: any = {};
    let step = 0.5;
    let value = [sliderMin, sliderMax];
    const diff = (sliderMax - sliderMin) / 4;

    if (processedSliderFace.round_off_value) {
      processedSliderFace.round_down &&
        (sliderMin =
          Math.floor(sliderMin / processedSliderFace.round_down) *
          processedSliderFace.round_down);
      processedSliderFace.round_up &&
        (sliderMax =
          Math.ceil(sliderMax / processedSliderFace.round_up) *
          processedSliderFace.round_up);
    }
    if (processedSliderFace.range_select === 'manuallyDefine') {
      processedSliderFace.slider_max_value &&
        (sliderMax = handleMultiCurrencyForSliderValues(
          processedSliderFace.slider_max_value
        ));
      processedSliderFace.slider_min_value &&
        (sliderMin = handleMultiCurrencyForSliderValues(
          processedSliderFace.slider_min_value
        ));
      processedSliderFace.slider_step_size &&
        (step = processedSliderFace.slider_step_size);
    }

    if (sliderMin % 1 !== 0)
      marks[sliderMin] = parseFloat(sliderMin).toFixed(2);
    else marks[sliderMin] = sliderMin;

    if (sliderMax % 1 !== 0)
      marks[sliderMax] = parseFloat(sliderMax).toFixed(2);
    else marks[sliderMax] = sliderMax;

    if (diff !== 0) {
      for (let i = sliderMin; i <= sliderMax; i += diff) {
        if (i % 1 !== 0) marks[i] = parseFloat(i).toFixed(2);
        else marks[i] = i;
      }
    }

    if (processedSliderFace.range_select === 'manuallyDefine') {
      value = [sliderValue?.min ?? sliderMin, sliderValue?.max ?? sliderMax];
    } else if (sliderValue) {
      value = [sliderValue.min, sliderValue.max];
    }

    setSliderFacetsData((prevState: any) => ({
      ...prevState,
      [facet.field_internal_name]: {
        min: sliderMin,
        max: sliderMax,
        marks,
        step,
        value,
      },
    }));
  };

  const roundToNearestMultipleOfTen = (input: any) => {
    return Math.ceil(input / 10) * 10;
  };

  const processFacets = (
    facetResponse: any,
    checkedFacets: any,
    facetList: any,
    initialFacet: any,
    minMAxFacets: any,
    originalFacets: any
  ) => {
    const facetListToUse = disableFacteMode
      ? facetList
      : Object.keys(facetResponse)?.length > 0
        ? facetList
        : minMAxFacets;
    const facetResponsrToUse = disableFacteMode
      ? originalFacets
      : Object.keys(facetResponse)?.length > 0
        ? facetResponse
        : initialFacet;
    const finalFacets: any = [];
    if (facetListToUse && facetResponsrToUse) {
      facetListToUse?.forEach((facet: any) => {
        const applicableFacet = facetResponsrToUse[facet?.field_name];
        const minMaxObject = getMinMaxValueForRangeFacets(
          applicableFacet[facet.display_name]
        );
        if (applicableFacet) {
          applicableFacet['order'] = facet?.order;
          applicableFacet['limit'] = facet?.is_show_facet || 10;
          applicableFacet['order_item'] = facet?.order_item;
          applicableFacet['default_collapse'] = facet?.default_collapse;
          applicableFacet['facet_type'] = facet?.facet_type;
          applicableFacet['field_internal_name'] = facet?.field_name;
          applicableFacet['facet_list'] =
            applicableFacet[facet.display_name]?.buckets;
          applicableFacet['sort_order'] = facet?.sort_order;
          applicableFacet['count'] = facet?.count;
          applicableFacet['show_count'] = facet?.show_count;
          applicableFacet['type'] = facet?.type;
          applicableFacet['display_name'] = facet?.display_name;
          applicableFacet['min'] = minMaxObject?.min;
          applicableFacet['max'] = minMaxObject?.max;
          applicableFacet['round_off_value'] = facet?.round_off_value;
          applicableFacet['round_up'] = facet?.round_up;
          applicableFacet['round_down'] = facet?.round_down;
          applicableFacet['range_select'] = facet?.range_select;
          applicableFacet['slider_max_value'] = facet?.slider_max_value;
          applicableFacet['slider_min_value'] = facet?.slider_min_value;
          applicableFacet['slider_step_size'] = facet?.slider_step_size;
          if (applicableFacet.facet_type === 'range') {
            processRangeFacets(applicableFacet);
          } else if (applicableFacet.facet_type === 'slider') {
            processSliderFacets(applicableFacet, initialFacet);
          }

          if (applicableFacet.order === 'custom') {
            applicableFacet?.facet_list?.forEach((_fs: any) => {
              const foundFacet = applicableFacet?.order_item?.find(
                (_f: any) => {
                  if (_fs?.val === _f?.name) {
                    return _f;
                  }
                }
              );
              if (foundFacet) {
                _fs.index = foundFacet?.index;
              }
            });
            applicableFacet?.facet_list?.sort(
              (a: any, b: any) => a?.index - b?.index
            );
          }

          applicableFacet.facet_list.forEach((_fs: any, index: number) => {
            let is_enabled = false;
            const facetFound = checkedFacets.find((_f: any) => {
              if (
                _f.value?.toString() === _fs.val?.toString() &&
                _f.field_internal_name === facet?.field_name
              ) {
                return _f;
              }
            });
            if (facetFound) {
              _fs['is_selected'] = true;
              is_enabled = true;
              if (index > applicableFacet.limit) {
                applicableFacet.limit = roundToNearestMultipleOfTen(index);
              }
            } else {
              _fs['is_selected'] = false;
              if (disableFacteMode) {
                const facetObjToUse = facetResponse[facet.field_name];
                if (facetObjToUse && facetObjToUse[facet.display_name]) {
                  const enableFacet = facetObjToUse[
                    facet.display_name
                  ]?.buckets?.find((_f: any) => _f.val === _fs.val);
                  if (enableFacet) {
                    is_enabled = true;
                  }
                }
              }
            }
            _fs['is_enabled'] = is_enabled;
          });
          finalFacets?.push(applicableFacet);
        }
      });

      processCheckedFacets(finalFacets, checkedFacets);
      finalFacets?.sort((a: any, b: any) => a.sort_order - b.sort_order);
      const filteredFacets = finalFacets?.filter((facet: any) => {
        if (facet?.facet_list?.length > 0) {
          return facet;
        }
      });
      setFacets(filteredFacets);
    } else {
      setFacets([]);
      setIsLoading(false);
    }
  };

  const getFacetApiCallRequestObj = () => {
    const checkedFacets: any = checkedFacet();
    const rangeFacet: any = rangeFacets(true);

    const facetReqObj: any = {
      skip: 0,
      limit: 1000,
      body: {},
      fieldsToQuery: '',
    };
    if (
      pageData?.content_model_internal_name?.indexOf('ecommerce_brand') > -1
    ) {
      facetReqObj.body['filter'] = {
        fq: `brand_id_esi:${pageData?.provider_id_esi}`,
      };
    } else if (
      pageData?.title &&
      pageData?.content_model_data_id &&
      pageData?.content_model_internal_name?.indexOf('ecommerce_category') > -1
    ) {
      facetReqObj.body['categories'] = pageData?.title;
      facetReqObj.body['category_id'] = pageData?.content_model_data_id;
    } else if (queryParams.has('q')) {
      facetReqObj.body['search_terms'] = queryParams.get('q');
    } else {
      return;
    }
    facetReqObj.body['facets'] = [...checkedFacets, ...rangeFacet]; // selected facet with field and value
    setMobileViewSelectedFactes(checkedFacets);
    setSelectedFacets(checkedFacets);

    const facetFilds = facetListResponse.map((facet: any) => {
      return {
        field_name: facet.field_name,
        display_name: facet.display_name,
        type: facet.type,
        facet_type: facet.facet_type,
        limit: 1000,
        order: facet?.order === 'custom' ? 'index asc' : facet?.order,
      };
    });
    facetReqObj.body['facet_fields'] = facetFilds; // list of all facet's fields
    return facetReqObj;
  };

  const getFacetsDataFromFacetListResponse = async () => {
    try {
      const checkedFacets: any = checkedFacet();
      const rangeFacet: any = rangeFacets(false);
      const requestObj = getFacetApiCallRequestObj();
      let initialRangeFacets: any;
      let originalFacets: any = {};
      const minMAxFacets = requestObj?.body?.facet_fields.filter(
        (value: any) =>
          value.facet_type === 'slider' || value.facet_type === 'range'
      );
      if (
        disableFacteMode &&
        requestObj?.body?.facets?.length &&
        !Object.keys(allFacets)?.length
      ) {
        const tempRequestObj = JSON.parse(JSON.stringify(requestObj));
        tempRequestObj.body['facets'] = [];
        const ogFacetsReponse = await EcommerceService.facetedSearch({
          searchObj: tempRequestObj,
        });
        if (ogFacetsReponse?.Status === 'success') {
          originalFacets = ogFacetsReponse?.Data?.facets;
          setAllFacets(originalFacets);
        }
      } else if (
        // set range inital facet
        (rangeFacet.length || checkedFacets.length) &&
        minMAxFacets.length &&
        !Object.keys(rangeInitialFacets)?.length &&
        !disableFacteMode
      ) {
        const tempRequestBodyForRange = JSON.parse(JSON.stringify(requestObj)); // set only range filter, remove all other filters
        tempRequestBodyForRange.body['facet_fields'] = minMAxFacets;
        tempRequestBodyForRange.body['facets'] = [];
        initialRangeFacets = await EcommerceService.facetedSearch({
          // min max price range of category
          searchObj: tempRequestBodyForRange,
        });
        setRangeInitialFacets(initialRangeFacets?.Data?.facets); // set min max price as per response
      }
      if (requestObj) {
        const facetResponse = await EcommerceService.facetedSearch({
          // get options of every facet's fields of facet_fields
          searchObj: requestObj,
        });
        if (facetResponse?.Status === 'success') {
          setRawFacets(facetResponse?.Data?.facets);

          const initialFacet = Object.keys(rangeInitialFacets)?.length // sets default range if selected
            ? rangeInitialFacets
            : initialRangeFacets?.Data?.facets;
          if (
            disableFacteMode &&
            !Object.keys(originalFacets)?.length &&
            !Object.keys(allFacets)?.length
          ) {
            originalFacets = facetResponse?.Data?.facets;
            setAllFacets(originalFacets);
          }

          processFacets(
            facetResponse?.Data?.facets, // raw facet options data from EcommerceService.facetedSearch
            requestObj?.body?.facets, // selected facets from field and value array object
            facetListResponse, //facet's fields
            initialFacet, // min max range object from EcommerceService.facetedSearch
            minMAxFacets, // range facet array object (raw)
            Object.keys(originalFacets)?.length ? originalFacets : allFacets
          );
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error(t('toast_msg_error.something_went_wrong'));
    }
  };

  const selectFacet = useCallback(
    (fieldInternalName: any, value: any) => {
      const tempFacets = [...facets];
      for (let i = 0; i < tempFacets.length; i++) {
        if (tempFacets[i].field_internal_name === fieldInternalName) {
          for (let j = 0; j < tempFacets[i]?.facet_list?.length; j++) {
            if (
              tempFacets[i]?.facet_list[j]?.val?.toString() ===
              value?.toString()
            ) {
              tempFacets[i].facet_list[j].is_selected =
                !tempFacets[i].facet_list[j].is_selected;
            }
          }
        }
      }
      setFacets(tempFacets);
      let tmpFacets;
      // eslint-disable-next-line no-restricted-globals
      if (screen.width < 1024) {
        tmpFacets = [...mobileViewSelectedFacets];
      } else {
        tmpFacets = [...selectedFacets];
      }
      const facetFound = selectedFacets.find((_f: any) => {
        if (
          _f.field_internal_name === fieldInternalName &&
          _f.value?.toString() === value?.toString()
        ) {
          return _f;
        }
      });
      if (facetFound) {
        tmpFacets = tmpFacets.filter((_f: any) => {
          if (
            _f.field_internal_name !== fieldInternalName ||
            _f.value?.toString() !== value?.toString()
          ) {
            return _f;
          }
        });
      } else {
        tmpFacets = [
          ...tmpFacets,
          { field_internal_name: fieldInternalName, value: value },
        ];
      }
      // eslint-disable-next-line no-restricted-globals
      if (screen.width < 1024) {
        return setMobileViewSelectedFactes(tmpFacets);
      }
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
      changeQueryParamFilter({
        _fs: tmpFacets.map((facet: any) => {
          return `${facet?.field_internal_name?.toString()};;${facet?.value?.toString()}`;
        }),
      });
    },
    [changeQueryParamFilter, facets, mobileViewSelectedFacets, selectedFacets]
  );

  const removeFacet = (facetValue: any) => {
    const newFacets = selectedFacets.filter((facet: any) => {
      if (
        facet.field_internal_name !== facetValue.field_internal_name ||
        facet.value?.toString() !== facetValue.value?.toString()
      ) {
        return facet;
      }
    });
    changeQueryParamFilter({
      _fs: newFacets.map((facet: any) => {
        return `${facet?.field_internal_name?.toString()};;${facet?.value?.toString()}`;
      }),
    });
  };

  const clearAllCheckedFacets = () => {
    changeQueryParamFilter({ _fs: [] });
  };

  const toggleSideBar = (event: any) => {
    // window.$(event.target).parent().toggleClass('sidebar-expanded');
    event.target.parentElement.classList.toggle('sidebar-expanded');
  };

  const rangeFacetOnChange = (
    fieldInternalName: string,
    field: string,
    event: any
  ) => {
    const temp = { ...minMaxRangeFacets };
    temp[fieldInternalName][field] = event.target.value;
    setMinMaxRangeFacets(temp);
  };

  const updateRangeFacet = (facet: any) => {
    const rangeObj = {
      field_internal_name: facet.field_internal_name,
      min: minMaxRangeFacets[facet.field_internal_name]?.min,
      max: minMaxRangeFacets[facet.field_internal_name]?.max,
    };
    let rangeFacets = queryParams
      .getAll('_fsr')
      .map((_f: any) => {
        const temp = _f.split(';;');
        return {
          field_internal_name: temp[0],
          min: temp[1],
          max: temp[2],
        };
      })
      .filter(
        (_f: any) => _f.field_internal_name !== facet.field_internal_name
      );

    if (rangeObj.min || rangeObj.max) {
      rangeFacets = [...rangeFacets, rangeObj];
    }

    changeQueryParamFilter({
      _fsr: rangeFacets.map((facet: any) => {
        return `${facet.field_internal_name?.toString()};;${facet?.min?.toString()};;${facet?.max?.toString()}`;
      }),
    });
    window.$('body').removeClass('page-sidebar-open');
  };

  const handleRangeSliderValueReset = (facetValue: any) => {
    const rangeFacets = queryParams
      .getAll('_fsr')
      .map((_f: any) => {
        const temp = _f.split(';;');
        return {
          field_internal_name: temp[0],
          min: temp[1],
          max: temp[2],
        };
      })
      .filter(
        (_f: any) => _f.field_internal_name !== facetValue.field_internal_name
      );
    changeQueryParamFilter({
      _fsr: rangeFacets.map((facet: any) => {
        return `${facet.field_internal_name?.toString()};;${facet?.min?.toString()};;${facet?.max?.toString()}`;
      }),
    });
  };

  const handleApplyFilterButtonClick = () => {
    // sets params in mobile for filter
    changeQueryParamFilter({
      _fs: mobileViewSelectedFacets.map((facet: any) => {
        return `${facet.field_internal_name?.toString()};;${facet?.value?.toString()}`;
      }),
    });
    window.$('body').removeClass('page-sidebar-open');
  };

  const clearAllFacets = () => {
    // clear query params
    changeQueryParamFilter({ _fs: [], _fsr: [], _fss: [] });
    window.$('body').removeClass('page-sidebar-open');
  };

  useEffect(() => {
    if (facetListResponse?.length) {
      getFacetsDataFromFacetListResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facetListResponse, _fs, _fsr, _q]);

  useEffect(() => {
    (async () => {
      try {
        setIsFacetDisabled(true);
        let facetListResponse: any;
        if (pageData?.content_model_data_id) {
          facetListResponse = await EcommerceService.getFacetByCategoryName(
            pageData?.content_model_data_id
          );
        } else {
          facetListResponse =
            await EcommerceService.getFacetByCategoryName('All');
        }
        if (
          facetListResponse?.Status === 'success' &&
          facetListResponse?.Data?.item?.is_enabled === true
        ) {
          const enabledFacets = facetListResponse?.Data?.item?.facets?.filter(
            (facet: any) => facet.is_enabled
          );
          if (enabledFacets.length) {
            setFacetListResponse(enabledFacets); // facet's fields lists from getFacetByCategoryName
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
        setIsFacetDisabled(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        toast.error(t('toast_msg_error.something_went_wrong'));
        setIsFacetDisabled(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAllFacetsOnCurrencyUpdate = () => {
    if (queryParams.has('_fs') || queryParams.has('_fsr')) {
      clearAllFacets();
    } else {
      processFacets(rawFacets, [], facetListResponse, '', [], rawFacets);
    }
  };

  /*
  Handling event listners. 
  It manages addEventListner and removeEventListner.
  */
  const initiateEventListners = (
    event: 'addEventListener' | 'removeEventListener'
  ) => {
    document[event]('CURRENCY_UPDATE', (event: any) => {
      if (!event?.detail?.storefront) {
        clearAllFacetsOnCurrencyUpdate();
      }
    });
  };

  useEffect(() => {
    initiateEventListners('addEventListener');
    return initiateEventListners('removeEventListener');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawFacets]);

  return {
    facets,
    handleFacetsLoadMore,
    selectFacet,
    selectedFacets,
    removeFacet,
    clearAllCheckedFacets,
    toggleSideBar,
    minMaxRangeFacets,
    rangeFacetOnChange,
    updateRangeFacet,
    handleRangeSliderValueReset,
    sliderFacetsData,
    handleSliderValueOnChange,
    handleSliderValueAfterChange,
    isFacetDisabled,
    isLoading,
    handleApplyFilterButtonClick,
    clearAllFacets,
  };
};

export { ExpFacetListingController };
