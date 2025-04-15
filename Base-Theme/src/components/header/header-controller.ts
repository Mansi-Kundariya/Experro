import { useEffect, useState, useRef } from 'react';
import {
  AnalyticsService,
  AuthService,
  CommonUtilities,
  EcommerceService,
  useNavigate,
} from 'experro-storefront';
import { logoutFromB2bNinja } from '../../utils';

interface SelectedCurrencyState {
  id: number;
  is_default: boolean;
  last_updated: string;
  country_iso2: null;
  default_for_country_codes: any[];
  currency_code: string;
  currency_exchange_rate: string;
  name: string;
  token: string;
  auto_update: boolean;
  token_location: string;
  decimal_token: string;
  thousands_token: string;
  decimal_places: number;
  enabled: boolean;
  is_transactional: boolean;
  use_default_name: boolean;
}
declare let window: any;

const HeaderController = () => {
  const language = CommonUtilities.getLanguage();
  const userDetails = AuthService.getUserDetails();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  const searchController = useRef<any>(null);
  const searchCountController = useRef<any>(null);
  const autoSuggestController = useRef<any>(null);

  const [searchResult, setSearchResult] = useState<any>([]);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isLoginPopOpen, setisLoginPopOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currencyData, setCurrncyData] = useState<any>([]);
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [selectedCurrency, setSelectedCurrency] =
    useState<SelectedCurrencyState>();
  const [isOpenCartPreview, setIsOpenCartPreview] = useState<boolean>(false);
  const [userLoggedInStatus, setUserLoggedInStatus] = useState<boolean>(false);

  const languages = CommonUtilities.getChannelsInfo();
  const currentLanguage = CommonUtilities.getCurrentChannelInfo();

  //below block of code is used to make the header stickey.
  let prevScrollpos = window.scrollY;
  window.onscroll = function () {
    const scrlOffset = 300;
    if (prevScrollpos > scrlOffset) {
      if (prevScrollpos > window.scrollY) {
        document.body.classList.remove('sticky-header');
      } else {
        document.body.classList.add('sticky-header');
      }
    } else {
      document.body.classList.remove('sticky-header');
    }
    prevScrollpos = window.scrollY;
  };
  // end of stickey header script.

  const handleHeaderClass = (event: Event) => {
    const targetElement = event.target as Element;
    if (targetElement.closest('#search-icon') !== null) {
      return;
    }
    const targetElement1 = event.target as Element;
    if (
      targetElement1 &&
      targetElement1.closest('.header-search-section') === null
    ) {
      document.body.classList.remove('search-open');
    }
  };

  const closeSearchPreviewWhenClickOutSide = () => {
    document
      .querySelector('body')
      ?.addEventListener('click', (event: Event) => {
        const targetElement = event.target as Element;
        if (
          targetElement.closest('.search-open-icon') !== null ||
          targetElement.tagName === 'INPUT' ||
          targetElement.closest('.search-result-block')
        ) {
          return;
        }
        const targetElement1 = event.target as Element;
        if (
          targetElement1 &&
          targetElement1.closest('.search-bar-inner') === null
        ) {
          document.body.classList.remove('search-open');
          setShowPreview(false);
        }
      });
  };
  /*
  Handling event listners.
  It manages addEventListner and removeEventListner.
  */
  const eventListeners = (
    event: 'addEventListener' | 'removeEventListener'
  ) => {
    document[event]('CART_REFRESH', () => {
      getCart();
    });

    document[event]('CURRENCY_UPDATE', () => {
      getCurrencyData();
    });

    document[event]('LOGIN_SUCCESSFUL', (e: any) => {
      checkUserLoggedInStatus(e.detail);
    });
  };

  // Form here we start initiating all event listeners.
  const initiateEventListeners = () => {
    closeSearchPreviewWhenClickOutSide();
    eventListeners('addEventListener');

    // As body object is possible null so it has to be done manually...
    document
      .querySelector('body')
      ?.addEventListener('click', (event: Event) => handleHeaderClass(event));

    return (() => {
      eventListeners('removeEventListener');
      document
        .querySelector('body')
        ?.removeEventListener('click', (event: Event) =>
          handleHeaderClass(event)
        );
    })();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  create signal for abort unnecessary search API call
    if (searchController?.current) {
      searchController?.current?.abort();
    }
    searchController.current = new AbortController();

    //  create signal for abort unnecessary searchCount API call
    if (searchCountController?.current) {
      searchCountController?.current?.abort();
    }
    searchCountController.current = new AbortController();

    //  create signal for abort unnecessary AutoSuggest API call
    if (autoSuggestController?.current) {
      autoSuggestController?.current.abort();
    }
    autoSuggestController.current = new AbortController();
    setSearchText(event.target.value);
  };

  const triggerProductSearchEvent = (searchResponse: any) => {
    if (searchResponse?.Data?.items) {
      searchResponse?.Data?.items?.forEach((element: any) => {
        element?.rule_details?.forEach((rule: any) => {
          delete rule?.rule_name;
          rule?.conditions?.forEach((condition: any) => {
            delete condition?.name;
          });
        });
      });
    }

    const skusForAnalyticsRules: any = [];
    searchResponse?.Data?.items?.forEach((item: any) => {
      const tempItem: any = {};
      tempItem['sku'] = item?.sku_for_analytics_esli;
      tempItem['rules'] = item?.rule_details;
      skusForAnalyticsRules.push(tempItem);
    });
    AnalyticsService.trackProductSearched({
      search_location: 'quick',
      searchTerm: searchText,
      noOfResults: searchResponse.Data.total_count,
      products_detail: skusForAnalyticsRules,
      sku: searchResponse?.Data?.items?.map(
        (elem: any) => elem?.sku_for_analytics_esli
      ),
    });
  };

  const getSearchedProducts = async () => {
    try {
      const fieldsToQuery =
        'brand_esi,brand_page_slug_esi,calculated_price_efi,categories_esai,custom_url,id,images_ej,name_esi,name_eti,page_slug_esi,price_efi,retail_price_ef,sale_price_efi,sku_esi,sku_for_analytics_esli';
      const searchObj = {
        body: {
          search_terms: searchText?.trim(),
        },
        skip: 0,
        limit: 6,
        fieldsToQuery,
        sortBy: 'relevance',
      };
      const searchPromise = [];
      const searchApiPromise = EcommerceService.search({
        searchObj,
        signal: searchController?.current?.signal,
      });
      searchPromise.push(searchApiPromise);
      const searchCountApiPromise = EcommerceService.getSearchCount({
        searchObj,
        key: 'header-search-count',
        componentId: 'exp-header-search-count',
        signal: searchCountController?.current?.signal,
      });
      searchPromise.push(searchCountApiPromise);
      const [searchResponse, searchCountResponse] = await Promise.all(
        searchPromise
      );

      if (searchResponse?.Status === 'success') {
        searchResponse.Data.total_count =
          searchCountResponse?.Data?.total_count;
      }

      if (searchResponse?.Status === 'success') {
        triggerProductSearchEvent(searchResponse);
        setShowPreview(true);
        setSearchResult(searchResponse?.Data);
      }
      setIsLoading(false);
    } catch (err: any) {
      if (
        err.message === 'AbortError: The user aborted a request.' ||
        err.message === 'AbortError: Fetch is aborted'
      ) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
        console.error(err);
      }
    }
  };

  const getAutoSuggesterData = async () => {
    try {
      const searchObj: any = {
        body: {
          search_term: searchText?.trim(),
        },
      };
      const response = await EcommerceService.searchAutoSuggest({
        searchObj,
        signal: autoSuggestController?.current?.signal,
      });
      if (response?.Status === 'success') {
        setSearchSuggestion(response?.Data?.auto_suggester);
      }
    } catch (err: any) {
      if (
        !(
          err.message === 'AbortError: The user aborted a request.' ||
          err.message === 'AbortError: Fetch is aborted'
        )
      ) {
        console.error(err);
      }
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (searchResult?.isRedirects && searchResult?.redirectURL) {
      navigate(searchResult?.redirectURL);
    } else if (searchResult?.total_count > 1) {
      navigate(`/search?q=${searchText}`);
      setSearchText('');
      removeClassToOpenSearch();
    } else if (searchResult?.total_count === 1) {
      navigate(
        `${searchResult?.items[0]?.page_slug_esi}?m=search&st=${searchText}&aq=true`
      );
      setSearchText('');
      removeClassToOpenSearch();
    }
  };

  const openSearchPreview = () => {
    setShowPreview(true);
    if (!searchSuggestion?.length && !searchText) {
      getAutoSuggesterData();
    }
    setIsLoading(false);
  };

  const openCartSlider = () => {
    // eslint-disable-next-line no-restricted-globals
    if (screen.width < 757) {
      navigate('/cart');
      return;
    } else {
      setIsOpenCartPreview(!isOpenCartPreview);
    }
  };

  const getCartQuantity = (cartObj: any) => {
    let quantity = 0;
    if (cartObj) {
      cartObj?.line_items?.physical_items.forEach((elem: any) => {
        quantity += elem.quantity;
      });
    }
    setCartQuantity(quantity);
  };

  const addClassToOpenSearch = () => {
    document.body.classList.add('search-open');
    searchInputRef.current && searchInputRef.current.focus();
    setShowPreview(true);
    if (!searchSuggestion?.length && !searchText) {
      getAutoSuggesterData();
    }
    setIsLoading(false);
  };

  const removeClassToOpenSearch = () => {
    document.body.classList.remove('search-open');
    setSearchText('');
    setShowPreview(false);
  };

  const addClassToOpenMobileMenu = () => {
    document.body.classList.add('group/body');
    document.body.classList.add('mobile-menu-open');
    document.body.classList.add('overflow-hidden');
  };

  const removeClassToCloseMobileMenu = () => {
    document.body.classList.remove('group/body');
    document.body.classList.remove('mobile-menu-open');
    document.body.classList.remove('overflow-hidden');
  };

  const handleMyAccountButtonClick = () => {
    const userDetails = AuthService.getUserDetails();
    if (userDetails?.userInfo?.id) {
      navigate('/my-account/');
    } else {
      setisLoginPopOpen(true);
    }
  };

  const getDefaultCurrencyFromLocalStorage = () => {
    if (process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true') {
      const defaultCurrency = AuthService.getUserDetails()?.defaultCurrency;
      if (defaultCurrency) {
        setSelectedCurrency(defaultCurrency);
      }
    }
  };

  const handleCurrencyChange = (currencyObj: any) => {
    if (currencyObj) {
      const userDetails = AuthService.getUserDetails();
      setSelectedCurrency(currencyObj);
      userDetails.defaultCurrency = currencyObj;
      AuthService.setUserDetails(userDetails);
      document.dispatchEvent(new Event('CURRENCY_UPDATE'));
    }
  };

  const getCart = () => {
    const userDetails = AuthService.getUserDetails();
    getCartQuantity(userDetails?.userCartObj);
  };

  const getCurrencyData = () => {
    const userDetails = AuthService.getUserDetails();
    if (userDetails && userDetails?.currencyObj) {
      setCurrncyData(userDetails?.currencyObj);
      getDefaultCurrencyFromLocalStorage();
    }
  };

  useEffect(() => {
    if (searchText && searchText.length > 1) {
      setIsLoading(true);
      getSearchedProducts();
    }
    if (searchText.length === 0) {
      setShowPreview(false);
      setSearchResult([]);
    }
    if (searchText?.length > 1) {
      getAutoSuggesterData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const checkUserLoggedInStatus = (userDetails: any = false) => {
    const userObj = userDetails ? userDetails : AuthService.getUserDetails();
    if (userObj?.userInfo?.id) {
      setUserLoggedInStatus(true);
    } else {
      setUserLoggedInStatus(false);
    }
  };

  const handleLanguageChange = (language: string) => {
    document.dispatchEvent(
      new CustomEvent('LANGUAGE_CHANGE', {
        detail: {
          language,
        },
      })
    );
  };

  const handleLogout = async () => {
    try {
      const logoutResponse = await AuthService.logout();
      if (logoutResponse?.Status !== 'failure') {
        AuthService.setUserDetails({});
        checkUserLoggedInStatus();
        document.dispatchEvent(new Event('CART_REFRESH'));
        logoutFromB2bNinja();
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setShowPreview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

  useEffect(() => {
    initiateEventListeners();
    checkUserLoggedInStatus();
    getCurrencyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    userDetails,
    selectedCurrency,
    isLoading,
    cartQuantity,
    searchText: searchText,
    showSearchPreview: showPreview,
    searchResult: searchResult,
    setSearchText,
    searchSuggestion,
    handleSubmit,
    handleSearchChange,
    handleMyAccountButtonClick,
    addClassToOpenSearch: addClassToOpenSearch,
    removeClassToOpenSerch: removeClassToOpenSearch,
    addClassToOpenMobileMenu,
    removeClassToCloseMobileMenu,
    openCartSlider,
    handleCurrencyChange,
    currencyData,
    isOpenCartPreview,
    setIsOpenCartPreview,
    userLoggedInStatus,
    handleLogout,
    searchInputRef,
    basketRef,
    openSearchPreview,
    language,
    handleLanguageChange,
    languages,
    currentLanguage,
    isLoginPopOpen,
    setisLoginPopOpen,
  };
};

export { HeaderController };
