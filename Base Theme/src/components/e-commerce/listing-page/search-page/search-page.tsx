import { IconFilter } from '../../../../assets/icons/filtersort';
import { IconFilterArrow } from '../../../../assets/icons/filter-arrow';
import { IconCross } from '../../../../assets/icons/cross';
import ExpBreadcrumb from '../../../common-components/breadcrumb/breadcrumb';
import ExpProductListing from '../product-listing/product-listing';
import ExpFacetListing from '../facet-listing/facet-listing';
import ExpSearchPageController from './search-page-controller';
import { ExpRecommendationManager } from '../../recommendation-manager';

declare const window: any;
const ExpSearchLandingPage = () => {
  const {
    togglePageSidebar,
    toggleSortSlider,
    handleMobileViewProductSorting,
    mobileSortBy,
    setSearchResults,
    searchResults,
    searchText,
    changeQueryParamFilter,
    convertAmountToBaseCurrency,
  } = ExpSearchPageController();

  const mobileViewSortingHandler = [
    {
      handlerName: 'relevance',
      spanText: 'Relevance',
    },
    {
      handlerName: 'is_featured_ebi:desc',
      spanText: 'Featured Items',
    },
    {
      handlerName: 'date_created_edti:asc',
      spanText: 'Newest Items',
    },
    {
      handlerName: 'name_esi:asc',
      spanText: 'A to Z',
    },
    {
      handlerName: 'name_esi:desc',
      spanText: 'Z to A',
    },
    {
      handlerName: 'calculated_price_efi:asc',
      spanText: ' Price: low to high',
    },
    {
      handlerName: 'calculated_price_efi:desc',
      spanText: ' Price: high to low',
    },
  ];

  return (
    <div className="page-body category-page-template">
      <div className="sort-slide-bottom lg:hidden bg-white fixed bottom-[-350px] left-0 right-0 z-20 transition-all group-[.sort-slider-open]:bottom-0 before:content[''] before:fixed before:left-0 before:right-0 before:top-0 before:h-screen before:bg-black before:bg-opacity-30 before:hidden before:backdrop-blur-sm group-[.sort-slider-open]:before:block">
        <div className="page-slide-bottom-inner pb-5 relative bg-white">
          <div className="container">
            <div
              className="sort-slider-title flex items-center justify-center text-center text-lg font-medium py-4 mb-4 border-b border-b-1 border-b-solid border-b-neutral-200 relative"
              onClick={toggleSortSlider}>
              Sort by
              <i className="icon w-2.5 h-2.5 pointer-events-none absolute right-0">
                <IconCross className="w-full h-full stroke-black" />
              </i>
            </div>

            <ul className="mobile-sort-list text-center list-style-none">
              {mobileViewSortingHandler.map((items: any, index: number) => {
                return (
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                  <li
                    className="mb-2"
                    key={index.toString()}
                    onClick={handleMobileViewProductSorting.bind(
                      this,
                      items.handlerName
                    )}>
                    <span
                      className={
                        items.handlerName === mobileSortBy ? 'is-selected' : ''
                      }>
                      {items.spanText}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {searchResults?.total_count && (
        <div className="page-header-section">
          <div className="relative min-h-[17.5rem] py-28 flex flex-col justify-center items-center bg-neutral-100">
            <div className="container relative z-1">
              <h1 className="text-2xl lg:text-4xl font-secondary text-black font-semibold text-center leading-56 tracking-2.5 mb-18">
                <span className="search-total-items">
                  {searchResults?.total_count}&nbsp;
                </span>
                {searchResults?.total_count && searchResults?.total_count < 2
                  ? 'Result'
                  : 'Results'}
                &nbsp;for
                <span className="search-text"> "{searchText}"</span>
              </h1>
            </div>
          </div>
        </div>
      )}

      <ExpBreadcrumb
        pageData={searchText?.length && { page_title_esi: 'Search' }}
        categoryPage={true}
      />

      {searchResults?.total_count > 0 && (
        <div className="mobile-sort-section lg:hidden mb-4 border-y border-y-1 border-y-solid border-y-neutral-200">
          <div className="flex">
            <div className="filter-col basis-6/12">
              <div className="filter-link p-4" onClick={togglePageSidebar}>
                <i className="icon mr-8 w-4 h-4 inline-block align-middle leading-[19px]">
                  <IconFilter className="w-full h-full" />
                </i>
                <span>Filters</span>
              </div>
            </div>
            <div className="filter-col basis-6/12 border-l border-l-1 border-l-solid border-l-neutral-200">
              <div className="filter-link p-4" onClick={toggleSortSlider}>
                <i className="icon mr-8 w-4 h-4 inline-block align-middle leading-[19px]">
                  <IconFilterArrow className="w-full h-full" />
                </i>
                <span>Sort by</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="page-content-with-sidebar flex -mx-4 mb-8">
          <ExpFacetListing
            togglePageSidebar={togglePageSidebar}
            changeQueryParamFilter={changeQueryParamFilter}
            convertAmountToBaseCurrency={convertAmountToBaseCurrency}
          />

          <div className="px-4 page-content basis-full lg:basis-[calc(100%_-378px)]">
            <ExpProductListing
              setSearchResults={setSearchResults}
              changeQueryParamFilter={changeQueryParamFilter}
              convertAmountToBaseCurrency={convertAmountToBaseCurrency}
            />
          </div>
        </div>
      </div>
      <ExpRecommendationManager location={'Search Page'} pageData={''} />
    </div>
  );
};

export default ExpSearchLandingPage;
