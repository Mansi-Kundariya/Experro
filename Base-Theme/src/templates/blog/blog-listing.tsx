import { Fragment, useCallback, useEffect, useState } from 'react';
import { ContentService } from 'experro-storefront';
import ExpBlogItem from './blog-item';
import { ExpPagination } from '../../components/common-components/pagination';

export interface ExpBlogListingProps {
  _pageData: any;
  setPageData?: any;
  setPageNumber?: any;
  pageNumber?: any;
}

const ExpBlogListing = (props: ExpBlogListingProps) => {
  const { _pageData, pageNumber, setPageNumber } = props;
  const [postData, setPostData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getFilterString = () => {
    let filter = '';
    if (_pageData?.content_model_internal_name === 'categories') {
      filter += `categories_exp_rel:(${_pageData?.content_model_data_id})`;
    }
    if (_pageData?.content_model_internal_name === 'author') {
      filter += `author_exp_rel:(${_pageData?.content_model_data_id})`;
    }
    if (_pageData?.content_model_internal_name === 'tags') {
      filter += `tags_exp_rel:(${_pageData?.content_model_data_id})`;
    }
    return filter;
  };
  const getAPIQueryObject = () => {
    let queryObject: any = {
      modelInternalName: 'posts',
      fieldsToQuery:
        'summary_et,page_slug,page_title_eti,thumbnail_image_media_emd,publish_date_edsi,categories_exp_rel,created_at,categories_esai',
      sortBy: 'created_at',
      orderBy: 'desc',
      relationField: 'categories_exp_rel,author_exp_rel,tags_exp_rel', // need to give the relation field name to get the data, e.g. here we want to get relation data for categories so need to pass it
      relationFieldDataToQuery: 'page_slug,title',
      skip: (pageNumber - 1) * 2,
      limit: 2,
      filter: '',
    };

    if (window.location.pathname !== '/blog/') {
      queryObject = {
        ...queryObject,
        filter: getFilterString(),
      };
      queryObject = {
        ...queryObject,
        fieldKey:
          _pageData?.content_model_internal_name === 'tags'
            ? 'tags_exp_rel'
            : 'categories_exp_rel',
        fieldValue: `*${_pageData?.content_model_data_id}*`,
      };
    } else {
      queryObject = { ...queryObject, fieldKey: 'id', fieldValue: '*' };
    }
    return queryObject;
  };

  //Get post Data by category wise
  const getPostData = useCallback(async () => {
    try {
      let apiPostListingData =
        await ContentService.searchContentModelRecordsByFieldKeyValueGET(
          getAPIQueryObject()
        );
      setTotalCount(apiPostListingData?.Data?.total_record);

      apiPostListingData = apiPostListingData?.Data?.items?.sort(
        (item1: any, item2: any) =>
          item1.created_at > item2.created_at
            ? 1
            : item1.created_at < item2.created_at
            ? -1
            : 0
      );
      if (apiPostListingData) {
        setPostData([...apiPostListingData]);
      } else {
        setPostData([]);
      }
      setIsLoading(false);
    } catch (error: any) {
      //TODO: add proper error message
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, _pageData, pageNumber]);

  useEffect(() => {
    // Determine the conditions for calling getPostData

    getPostData(); // Call on page number or _pageData change, or on initial render

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, _pageData]);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="flex flex-wrap -mx-6 gap-y-6">
            <div className="lg:basis-4/12 md:basis-6/12 basis-full blog-list-item mb-8 md:mb-12 px-6 animate-pulse">
              <div className="blog-list-image h-[300px] overflow-hidden rounded-lg block">
                <div className="h-full w-full rounded-lg bg-gray-200"></div>
              </div>
              <div className="blog-list-caption">
                <div className="blog-list-caption-inner pt-[1.875rem] bg-white">
                  <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-2/3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:basis-4/12 md:basis-6/12 basis-full blog-list-item mb-8 md:mb-12 px-6 animate-pulse">
              <div className="blog-list-image h-[300px] overflow-hidden rounded-lg block">
                <div className="h-full w-full rounded-lg bg-gray-200"></div>
              </div>
              <div className="blog-list-caption">
                <div className="blog-list-caption-inner pt-[1.875rem] bg-white">
                  <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-2/3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:basis-4/12 md:basis-6/12 basis-full blog-list-item mb-8 md:mb-12 px-6 animate-pulse">
              <div className="blog-list-image h-[300px] overflow-hidden rounded-lg block">
                <div className="h-full w-full rounded-lg bg-gray-200"></div>
              </div>
              <div className="blog-list-caption">
                <div className="blog-list-caption-inner pt-[1.875rem] bg-white">
                  <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-2/3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:basis-4/12 md:basis-6/12 basis-full blog-list-item mb-8 md:mb-12 px-6 animate-pulse">
              <div className="blog-list-image h-[300px] overflow-hidden rounded-lg block">
                <div className="h-full w-full rounded-lg bg-gray-200"></div>
              </div>
              <div className="blog-list-caption">
                <div className="blog-list-caption-inner pt-[1.875rem] bg-white">
                  <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-2/3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:basis-4/12 md:basis-6/12 basis-full blog-list-item mb-8 md:mb-12 px-6 animate-pulse">
              <div className="blog-list-image h-[300px] overflow-hidden rounded-lg block">
                <div className="h-full w-full rounded-lg bg-gray-200"></div>
              </div>
              <div className="blog-list-caption">
                <div className="blog-list-caption-inner pt-[1.875rem] bg-white">
                  <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                  <div className="h-10 w-2/3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : postData?.length === 0 ? (
        <div className="container">
          <h6 className='text-center font-primary'>No Blogs Found</h6>
        </div>
      ) : (
        <>
          <div className="page-content">
            <div className="container">
              {/* Desktop Category */}

              <div className="flex flex-wrap -mx-6 gutter-large ">
                {postData?.map((item: any) => (
                  <Fragment key={item.id}>
                    <ExpBlogItem blogItemData={item} />
                  </Fragment>
                ))}
              </div>

              {totalCount > 2 && (
                <>
                  <ExpPagination
                    itemList={postData}
                    setPageNumber={setPageNumber}
                    totalCount={totalCount}
                    skip={2}
                    pageNumber={pageNumber}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExpBlogListing;
