import { Link, useNavigate } from 'experro-storefront';
import { ExpProductPrice } from '../product-price';

interface ExpSearchPreviewProps {
  productData: any;
  isLoading: boolean;
  handleSubmit: any;
  searchText: string;
  searchSuggestion?: any;
  setSearchText?: any;
}

const ExpSearchPreview = (props: ExpSearchPreviewProps) => {
  const {
    productData,
    isLoading,
    handleSubmit,
    searchText,
    searchSuggestion,
    setSearchText,
  } = props;
  const navigate = useNavigate();

  const onSearchProduct = (product: any) => {
    setSearchText('');
    const analyticsData: any = {
      mode: 'search',
      search_location: 'quick',
      sku: product?.sku_esi,
      sku_for_analytics_esli: product?.sku_for_analytics_esli,
    };
    if (product?.rule_details) {
      analyticsData['rules'] = product?.rule_details;
    }
    let localstorageAnalyticsData = [];
    if (localStorage.getItem('search_a_d_')) {
      localstorageAnalyticsData = JSON.parse(
        localStorage.getItem('search_a_d_') as string
      );
    }

    let isProductid: any;
    if (localstorageAnalyticsData.length) {
      isProductid = localstorageAnalyticsData?.find(
        (analyticsProduct: any) => analyticsProduct?.sku === product?.sku_esi
      );
    }
    if (!isProductid) {
      localstorageAnalyticsData.push(analyticsData);
    }
    localStorage.setItem(
      'search_a_d_',
      JSON.stringify(localstorageAnalyticsData)
    );
  };
  return (
    <>
      <div className="search-result-list flex flex-wrap w-full">
        <div className="left-block basis-full lg:basis-[290px] h-auto lg:h-full lg:pr-6 lg:border-1 lg:border-r lg:border-r-solid lg:border-r-neutral-200">
          <h6 className="text-lg font-secondary border-1 border-b border-b-solid border-b-neutral-200 mb-4 pb-4">
            Popular Searches
          </h6>
          {!!searchSuggestion?.length && (
            <ul className="list-style-none mb-2">
              {searchSuggestion?.map((item: string, index: number) => (
                <li key={index.toString()}>
                  <span
                    className="cursor-pointer hover:text-primary"
                    onClick={() => {
                      navigate(
                        `/search?q=${item?.replace(
                          /(<([^>]+)>)/gi,
                          ''
                        )}&ac=true`
                      );
                      setSearchText('');
                    }}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {!isLoading ? (
          <>
            {productData?.items?.length ? (
              <div className="right-block h-auto lg:h-full flex flex-wrap basis-full lg:basis-[calc(100%_-_290px)] custom-scrollbar lg:pl-8">
                <div className="search-item-inner flex flex-wrap w-full max-h-[350px] lg:max-h-none overflow-auto lg:-mx-4 pt-6 mt-6 lg:mt-0 lg:pt-0 g:border-1 border-t border-t-solid border-t-neutral-200  lg:border-t-none lg:border-t-solid lg:border-t-transparent">
                  {productData?.items?.map((product: any, index: number) => (
                    <div
                      key={index?.toString()}
                      className="search-item md:basis-6/12 px-4 flex flex-wrap mb-4">
                      <div className="search-item-image w-[6.25rem] h-[6.25rem]">
                        <Link
                          onClick={() => onSearchProduct(product)}
                          to={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}
                          className="has-image-fill h-full flex flex-wrap items-center justify-center">
                          <img
                            src={
                              product?.images_ej?.length
                                ? `${product?.images_ej[0]?.url_zoom.replace(
                                    'https://cdn11.bigcommerce.com',
                                    'https://product-images.experro.app'
                                  )}&width=160`
                                : 'https://via.placeholder.com/736x450.png?text=Image+coming+soon'
                            }
                            alt={product?.name_eti}
                            title={product?.name_eti}
                            loading={'lazy'}
                            width={75}
                            height={75}
                            className="max-w-20 object-contain mix-blend-multiply max-h-full"
                          />
                        </Link>
                      </div>

                      <div className="search-item-detail px-4 w-[calc(100%_-_6.25rem)]">
                        <p className="search-product-title brand-title mb-2">
                          <Link
                            className="reverse-color brand-link uppercase"
                            to={`${product?.brand_page_slug_esi}`}>
                            {product?.brand_esi}
                          </Link>
                        </p>

                        <p className="search-product-title capitalize mb-2">
                          <Link
                            className="reverse-color hover:text-primary"
                            onClick={() => onSearchProduct(product)}
                            to={`${product?.page_slug_esi}?m=search&st=${searchText}&aq=true`}>
                            {product?.name_eti}
                          </Link>
                        </p>

                        <div className="price-section">
                          <span className="price-item">
                            <ExpProductPrice productDetails={product} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {!!(!isLoading && productData?.items?.length) ? (
                  <div className="search-result-message text-center w-full pt-6">
                    <span
                      onClick={handleSubmit}
                      className="button-primary uppercase cursor-pointer">
                      More result {productData?.total_count > 1 ? '' : ''} (
                      {productData?.total_count})
                      {productData?.total_count === 1 ? '' : ''}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : searchText?.length < 1 ? (
              <>
                <div className="right-block flex items-center basis-full lg:basis-[calc(100%_-_290px)] justify-center pl-8">
                  <p className="text-gray-900">Start typing to search.</p>
                </div>
              </>
            ) : (
              !isLoading &&
              productData?.items?.length === 0 && (
                <div className="right-block flex flex-wrap items-center  basis-full lg:basis-[calc(100%_-_290px)] custom-scrollbar no-product-found h-auto lg:h-[23.875rem]">
                  <h5 className="text-center no-product mt-30 mb-30 w-full">
                    No Products Found...
                  </h5>
                </div>
              )
            )}
          </>
        ) : (
          <div className="loader-wrapper">
            <div className="loader-main flex">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ExpSearchPreview;
