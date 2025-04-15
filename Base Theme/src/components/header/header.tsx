import { Link } from 'experro-storefront';
import ExpMenu from '../menu';
import ExpLinkParser from '../../utils/link-parser';
import { IconBasket } from '../../assets/icons/basket';
import { IconSearch } from '../../assets/icons/search';
import { IconUser } from '../../assets/icons/user';
// import { IconArrowDown } from "../../assets/icons/arrow-down";
import { IconHemburger } from '../../assets/icons/hemburger';
import { IconArrowDownFill } from '../../assets/icons/arrow-down-fill';
import { IconCross } from '../../assets/icons/cross';
import { ExpSearchPreview } from '../e-commerce/search-preview';
import { HeaderController } from './header-controller';
import ExpCartPreview from '../e-commerce/cart/cart-preview';
import { ExpImageParser } from '../../utils/image-parser';
import ExpLoginModel from '../../utils/login-pop-up-modal';

interface CurrencyObj {
  id: number;
  is_default: boolean;
  last_updated: string;
  country_iso2: null | string;
  default_for_country_codes: string[];
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

const Header = ({ pageData }: { pageData: any }) => {
  const {
    selectedCurrency,
    isLoading,
    cartQuantity,
    searchText,
    showSearchPreview,
    searchResult,
    searchSuggestion,
    setSearchText,
    handleSubmit,
    handleSearchChange,
    handleMyAccountButtonClick,
    addClassToOpenSearch,
    removeClassToOpenSerch,
    addClassToOpenMobileMenu,
    removeClassToCloseMobileMenu,
    openCartSlider,
    handleCurrencyChange,
    currencyData,
    isOpenCartPreview,
    setIsOpenCartPreview,
    userLoggedInStatus,
    handleLogout,
    // searchInputRef,
    basketRef,
    openSearchPreview,
    handleLanguageChange,
    languages,
    currentLanguage,
    isLoginPopOpen,
    setisLoginPopOpen,
  } = HeaderController();

  return (
    <>
      <header className="header-section-main">
        <div className="header-top-section bg-sand-200">
          <div className="container">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-8/12 text-secondary text-xs text-center md:text-left md:text-sm font-medium py-2">
                <p
                  className="[&>a]:underline hover:[&>a]:no-underline"
                  dangerouslySetInnerHTML={{
                    __html:
                      pageData?.globalSettings?.header_com?.length &&
                      pageData?.globalSettings?.header_com[0]
                        ?.pencil_banner_text_et,
                  }}
                />
              </div>
              {currencyData?.length > 1 && (
                <>
                  <div className="hidden md:flex w-2/12 justify-end items-center leading-none relative currency-selector">
                    <div className="group flex items-center h-full cursor-pointer">
                      <p className="link-wrap text-right">
                        <span className="text-sm font-medium">
                          {selectedCurrency?.currency_code}
                        </span>
                        <i className="inline-block w-[10px] h-[10px] ml-[2px] icon [&>svg]:p-[1px]">
                          <IconArrowDownFill />
                        </i>
                      </p>
                      <ul className="currency-list hidden group-hover:flex flex-col gap-2 absolute top-full right-0 bg-white border border-gray-300 px-4 py-3 z-[11] w-52 *:text-sm *:font-normal">
                        {currencyData?.map((elem: CurrencyObj) => (
                          <li
                            onClick={() => handleCurrencyChange(elem)}
                            key={elem?.id}
                            className="cursor-pointer *:transition-colors *:hover:text-primary">
                            <span>{elem?.currency_code}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
              {Boolean(languages?.length) && (
                <>
                  <div className="hidden md:flex w-2/12 justify-end items-center leading-none relative language-selector">
                    <div className="group flex items-center h-full cursor-pointer">
                      <p className="link-wrap text-right">
                        <span className="text-sm font-medium">
                          {currentLanguage?.display_name}
                        </span>
                        <i className="inline-block w-[10px] h-[10px] ml-[2px] icon [&>svg]:p-[1px]">
                          <IconArrowDownFill />
                        </i>
                      </p>
                      <ul className="languages-list hidden group-hover:flex flex-col gap-2 absolute top-full right-0 bg-white border border-gray-300 px-4 py-3 z-[11] w-52 *:text-sm *:font-normal">
                        {languages?.map((lang: any) => (
                          <li
                            onClick={handleLanguageChange.bind(this, lang)}
                            className="cursor-pointer *:transition-colors *:hover:text-primary">
                            <span>{lang.display_name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bg-sand-50 header-middle-main">
          <div className="container">
            <div className="flex flex-wrap justify-between header-middle-wrapper relative py-4 lg:py-0">
              <div className="w-10/12 flex items-center lg:w-2/12 header-logo">
                <div className="inline-block lg:hidden leading-[0] mr-6 hamburger-icon">
                  <i
                    onClick={addClassToOpenMobileMenu}
                    className="icon w-6 h-6 cursor-pointer">
                    <IconHemburger />
                  </i>
                </div>
                <ExpLinkParser
                  to="/"
                  title="Header Logo"
                  ariaLabel="Header Logo"
                  className="flex items-center">
                  <img
                    src={
                      ExpImageParser(
                        pageData?.globalSettings.site_com?.length &&
                          pageData?.globalSettings.site_com[0]?.logo_media_emd
                          ? pageData?.globalSettings.site_com[0]?.logo_media_emd[0]
                          : ''
                      )?.imageUrl
                    }
                    height="30"
                    width="92"
                    alt="Excore Logo"
                    fetchPriority={'high'}
                  />
                </ExpLinkParser>
              </div>
              <div className="w-full mt-4 lg:mt-0 lg:w-8/12 order-3 lg:order-2 lg:py-4 header-search-section">
                <div className="flex justify-center header-search-bar">
                  <form
                    action=""
                    onSubmit={handleSubmit}
                    className="relative w-full max-w-[750px]">
                    <input
                      type="text"
                      className="form-input input-small focus:outline-none"
                      placeholder="Search the store"
                      onChange={handleSearchChange}
                      value={searchText}
                      onClick={openSearchPreview}
                    />
                    {showSearchPreview && (
                      <i
                        onClick={removeClassToOpenSerch}
                        className="w-6 absolute h-4 right-4 top-2/4 [&>svg]:stroke-secondary -translate-y-[50%] cursor-pointer icon">
                        <IconCross />
                      </i>
                    )}
                    {!showSearchPreview && (
                      <i
                        onClick={addClassToOpenSearch}
                        className="absolute right-4 top-2/4 -translate-y-[50%] cursor-pointer icon">
                        <IconSearch />
                      </i>
                    )}
                  </form>
                </div>
                {showSearchPreview && (
                  <div className="search-result-block absolute top-full shadow-md left-0 right-0 bottom-0 mt-[1.0625rem] min-h-[490px] overflow-auto z-[31]">
                    <div className="search-result-block-wrap p-4 bg-white flex max-h-[490px] overflow-auto flex-wrap justify-between h-full">
                      <ExpSearchPreview
                        setSearchText={setSearchText}
                        searchSuggestion={searchSuggestion}
                        productData={searchResult}
                        isLoading={isLoading}
                        handleSubmit={handleSubmit}
                        searchText={searchText}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="w-2/12 flex flex-wrap items-center justify-end gap-6 lg:order-3 header-action-block">
                <div className="group/user h-full items-center justify-center relative hidden lg:flex user-block leading-[0]">
                  <span
                    onClick={handleMyAccountButtonClick}
                    className="inline-block">
                    <i className="group relative cursor-pointer icon">
                      <IconUser />
                    </i>
                  </span>
                  <ul className="hidden group-hover/user:flex shadow-lg absolute top-full left-[50%] -translate-x-[50%] flex-col min-w-40 bg-white text-center z-[11]">
                    <li className="h-full text-xs py-3 border-t border-gray-200 first:border-t-0">
                      <Link to="/my-account/" className="hover:text-primary">
                        My Account
                      </Link>
                    </li>
                    <li className="h-full text-xs py-3 border-t border-gray-200">
                      {userLoggedInStatus ? (
                        <span
                          onClick={handleLogout}
                          className="cursor-pointer hover:text-primary">
                          Log Out
                        </span>
                      ) : (
                        <p
                          onClick={() => setisLoginPopOpen(true)}
                          className="hover:text-primary">
                          Login
                        </p>
                      )}
                    </li>
                  </ul>
                </div>
                <div className="relative cart-block leading-[0]">
                  <span
                    onClick={openCartSlider}
                    className="cart-link inline-block"
                    ref={basketRef}>
                    <i className="group relative cursor-pointer icon has-tooltip">
                      <IconBasket />
                      <span className="absolute -right-[5px] -top-[5px] flex items-center justify-center bg-primary text-white rounded-[50%] w-4 h-4 text-[10px] not-italic cart-count">
                        {cartQuantity}
                      </span>
                      <span className="hidden lg:group-hover:inline-block absolute top-8 left-2/4 -translate-x-2/4 px-2 py-1 bg-secondary rounded text-white text-sm not-italic font-normal leading-6 tooltip before:border-[6px] before:border-transparent before:border-t-0 before:border-b-secondary before:absolute before:-top-2 before:left-2/4 before:-translate-x-2/4 before:w-2 before:h-2 z-[11] tooltip">
                        Cart
                      </span>
                    </i>
                  </span>
                  <ExpCartPreview
                    isCartPreview={isOpenCartPreview}
                    setIsCartPreview={setIsOpenCartPreview}
                    basketRef={basketRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-navigation-main lg:min-h-[3.875rem] border-y border-gray-200 fixed top-0 left-0 -translate-x-full transition-transform duration-300 group-[.mobile-menu-open]/body:translate-x-0 lg:-translate-x-0 bg-white w-full h-full lg:relative z-10">
          <div className="container">
            <div className="mobile-menu-top-bar flex justify-between py-4 px-5 border-b border-gray-200 lg:hidden">
              <i
                onClick={removeClassToCloseMobileMenu}
                className="icon cursor-pointer flex items-center justify-center w-6 h-6 [&>svg]:stroke-black [&>svg]:w-3 [&>svg]:h-3 menu-close-button">
                <IconCross />
              </i>
              <div className="mobile-account-link flex items-center">
                <i className="icon mr-2 [&>svg]:w-5 [&>svg]:h-5">
                  <IconUser />
                </i>
                {!userLoggedInStatus ? (
                  <p className="text-sm text-gray-900">
                    <Link to="/login/" className="">
                      Log In &nbsp;
                    </Link>
                    /
                    <Link to="/sign-up/" className="">
                      &nbsp; Create account
                    </Link>
                  </p>
                ) : (
                  <>
                    <span
                      onClick={handleLogout}
                      className="text-sm text-gray-900">
                      Log Out &nbsp;
                    </span>
                    /
                    <Link to="/my-account/" className="text-sm text-gray-900">
                      &nbsp; My account
                    </Link>
                  </>
                )}
              </div>
            </div>
            <nav className="overflow-auto p-4 lg:p-0 lg:overflow-visible h-[calc(100vh_-_60px)] lg:h-auto">
              <ExpMenu
                menuLinkObj={pageData?.globalSettings?.header_com}
                ulClasses="flex flex-wrap items-center justify-center flex-col z-[2] lg:flex-row lg:gap-7 xl:gap-x-12 gap-y-0 lg:gap-y-3 relative *:text-sm *:font-normal"
                liClasses="group nav-item w-full border-b border-gray-200 lg:border-b-0 lg:w-auto"
                linkNameClasses="flex justify-between lg:justify-start items-center py-4 w-full lg:w-auto lg:py-5 transition-colors group-hover:text-primary"
                keyValueForMenu="primary_navigation_menu_id_et"
                iconForNavChild={''}
                index={0}
              />
            </nav>
          </div>
        </div>
        {isLoginPopOpen && (
          <ExpLoginModel
            isOpen={isLoginPopOpen}
            onClose={() => setisLoginPopOpen(false)}
          />
        )}
      </header>
    </>
  );
};

export default Header;
