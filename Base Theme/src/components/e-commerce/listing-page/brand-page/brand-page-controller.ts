import { useCallback, useEffect, useState } from 'react';
import { AuthService, useSearchParams } from 'experro-storefront';
import { convertToBaseCurrency } from '../../../../utils';

const ExpBrandPageController = () => {
  const [queryParams, setQueryParam] = useSearchParams();
  const [searchResults, setSearchResults] = useState<any>({});
  const [mobileSortBy, setMobileSortBy] = useState('relevance');
  const convertAmountToBaseCurrency = (value: any) => {
    const currencyObj = AuthService.getUserDetails()?.defaultCurrencys;
    if (currencyObj && process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true') {
      const { currency_exchange_rate } = currencyObj;
      const convertedAmount = convertToBaseCurrency(
        value,
        currency_exchange_rate
      );
      return convertedAmount;
    } else {
      return value;
    }
  };

  const changeQueryParamFilter = useCallback(
    (query: any) => {
      const finalQuery: any = {
        ...{
          sort: queryParams.get('sort') || 'relevance',
          _fs: queryParams.getAll('_fs'),
          _fsr: queryParams.getAll('_fsr'),
          _fss: queryParams.getAll('_fss'),
          q: queryParams.get('q') || '',
          section: queryParams.get('section'),
        },
        ...query,
      };
      setQueryParam(finalQuery);
    },
    [queryParams, setQueryParam]
  );

  const togglePageSidebar = useCallback(() => {
    if (document.body.classList.contains('group/sidebar')) {
      document.body.classList.remove('group/sidebar');
    } else {
      document.body.classList.add('group/sidebar');
    }
    if (document.body.classList.contains('page-sidebar-open')) {
      document.body.classList.remove('page-sidebar-open');
    } else {
      document.body.classList.add('page-sidebar-open');
    }
  }, []);

  const toggleSortSlider = useCallback(() => {
    if (document.body.classList.contains('group')) {
      document.body.classList.remove('group');
    } else {
      document.body.classList.add('group');
    }
    if (document.body.classList.contains('sort-slider-open')) {
      document.body.classList.remove('sort-slider-open');
    } else {
      document.body.classList.add('sort-slider-open');
    }
  }, []);

  const handleMobileViewProductSorting = (value: string) => {
    changeQueryParamFilter({ sort: value });
  };

  useEffect(() => {
    if (queryParams.has('sort')) {
      const sortBy = queryParams.get('sort');
      setMobileSortBy(sortBy as string);
    }
  }, [queryParams]);

  return {
    togglePageSidebar,
    toggleSortSlider,
    handleMobileViewProductSorting,
    setSearchResults,
    mobileSortBy,
    searchResults,
    changeQueryParamFilter,
    convertAmountToBaseCurrency,
  };
};

export default ExpBrandPageController;
