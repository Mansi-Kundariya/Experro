import { lazy } from 'react';
const ExpCompareButton = lazy(() => import('../compare-button/compare-button'));
import { ExpPagination } from '../../../common-components/pagination';
import { ExpProductCell } from '../../product-cell';
import ExpProductListingController from './product-listing-controller';

export interface ExpProductListingProps {
  changeQueryParamFilter: any;
  setSearchResults: (value: any) => void;
  categoryTree?: any;
  pageData?: any;
  convertAmountToBaseCurrency: any;
}

const ExpProductListing = (props: ExpProductListingProps) => {
  const {
    changeQueryParamFilter,
    setSearchResults,
    categoryTree,
    pageData,
    convertAmountToBaseCurrency,
  } = props;

  const {
    mode,
    product,
    productList,
    pageNumber,
    setPageNumber,
    showClearFiltersButton,
    handleSortByChange,
    handleProductCompare,
    clearAllFilters,
    setScrollPositionToSessionStorage,
  } = ExpProductListingController({
    changeQueryParamFilter,
    pageData,
    setSearchResults,
    convertAmountToBaseCurrency,
  });

  const productPlaceholder = (numOfTimes: number) => {
    const result = [];

    for (let i = 0; i < numOfTimes; i++) {
      result.push(
        <div className="product-card" key={i.toString()}>
          <div className="card-inner">
            <div className="image card-figure w-full h-[21.625rem] bg-gray-200 dark:bg-gray-200 mb-4"></div>
            <div className="card-brand-rating flex flex-wrap align-center justify-between mb-2">
              <p className="mb-0 h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-3/12"></p>
              <p className="mb-0 h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 w-3/12"></p>
            </div>
            <div className="card-title">
              <h4 className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 mt-2 mb-6"></h4>
              <div className="description h-2.5 bg-gray-200 rounded-full dark:bg-gray-200 mb-4 w-3/12"></div>
            </div>
          </div>
        </div>
      );
    }
    return result;
  };

  return (
    <>
      <div className="product-sorting-section pb-6 mb-6 border-b border-b-solid border-b-gray-200">
        <div className="flex items-center justify-between">
          <div className="basis-4/12">
            {!product?.isLoading && product?.data?.total_count > 0 ? (
              <span className="product-result-count text-sm text-gray-900">
                <span className="dark-color">
                  {product?.data?.total_count}&nbsp;
                </span>
                results
              </span>
            ) : (
              ''
            )}
          </div>

          {!!(product?.data?.items?.length && !product?.isLoading) && (
            <div className="basis-8/12 text-right hidden lg:block">
              <form action="" className="form-style form-sort m-b-0">
                <div className="flex form-field m-b-0 items-center justify-end">
                  <ExpCompareButton />
                  <div className="flex items-center select-wrapper px-4 border border-solid border-gray-200">
                    <label
                      htmlFor="sort"
                      className="form-label text-black text-sm mb-0">
                      Sort by:
                    </label>
                    <select
                      className="form-select border-none bg-transparent focus:outline-none w-auto"
                      value={productList?.sortBy}
                      id="sort"
                      name="sort"
                      onChange={handleSortByChange}>
                      <option value="relevance">Relevance</option>
                      <option value="is_featured_ebi:desc">
                        Featured Items
                      </option>
                      <option value="name_esi:asc">A to Z</option>
                      <option value="name_esi:desc">Z to A</option>
                      <option value="calculated_price_efi:asc">
                        Price low to high
                      </option>
                      <option value="calculated_price_efi:desc">
                        Price high to low
                      </option>
                      <option value="date_created_edti:desc">
                        Newest Items
                      </option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {!!(product?.data?.items?.length && !product?.isLoading) && (
        <>
          <div
            className="product-listing grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8"
            onClick={setScrollPositionToSessionStorage}>
            {product?.data?.items?.map((product: any, index: number) => (
              <ExpProductCell
                productCompareSkus={productList?.productCompareSku}
                handleProductCompare={handleProductCompare}
                key={index.toString()}
                productDetails={product}
                categoryTree={categoryTree}
                showActionButtons={false}
                mode={mode}
                category={pageData?.title}
                productCellIndex={index}
                productcardclassname=""
              />
            ))}
          </div>
          {!product?.isLoading && product?.data?.total_count > 12 ? (
            <ExpPagination
              itemList={product?.data?.items}
              setPageNumber={setPageNumber}
              totalCount={product?.data?.total_count}
              skip={12}
              pageNumber={pageNumber}
              usingQueryParams={{
                changeQueryParamFilter,
                useQueryParams: true,
              }}
            />
          ) : (
            ''
          )}
        </>
      )}

      {!!(!product?.data?.items?.length && product?.isLoading) && (
        <div className="product-listing animate-pulse grid grid-cols-2 md:grid-cols-3 gap-8 skeleton-loading">
          {productPlaceholder(6)}
        </div>
      )}

      {!product?.data?.items?.length && !product?.isLoading && (
        <div className="alert-message style-info">
          <p className="text-center">
            No products found!
            <button
              className="reverse-color text-underline"
              onClick={clearAllFilters}>
              <strong>{showClearFiltersButton && 'Clear all filters'}</strong>
            </button>
          </p>
        </div>
      )}
    </>
  );
};

export default ExpProductListing;
