import { useState, useCallback, useEffect, Fragment } from 'react';
import { ContentService } from 'experro-storefront';

interface ExpBlogCategoriesProps {
  setCategoriesData?: any;
  redirectToPageSlug?: any;
}
const ExpBlogCategories = (props: ExpBlogCategoriesProps) => {
  const { setCategoriesData, redirectToPageSlug } = props;

  const [categories, setCategories] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Function to get all the categories
  const getCategories = useCallback(async () => {
    try {
      let apiDataForCategories =
        await ContentService.searchContentModelRecordsByFieldKeyValueGET({
          modelInternalName: 'categories',
          fieldKey: 'id',
          fieldValue: '*',
          fieldsToQuery: 'page_title_esi,page_slug,content_model_data_id',
          relationField: 'blogs_exp_rel',
          relationFieldDataToQuery: 'page_slug,title',
          sortBy: '',
          orderBy: 'asc',
        });

      apiDataForCategories = apiDataForCategories?.Data?.items?.sort(
        (item1: any, item2: any) =>
          item1.created_at > item2.created_at
            ? 1
            : item1.created_at < item2.created_at
            ? -1
            : 0
      );
      setCategories(apiDataForCategories);
      if (setCategoriesData) {
        setCategoriesData(apiDataForCategories);
      }
      setIsLoading(false);
    } catch (error: any) {
      //TODO: add proper error message
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="container animate-pulse">
          <ul className="flex overflow-auto">
            <li className="mr-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
            <li className="mr-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
            <li className="mr-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
            <li className="mr-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
            <li className="mr-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
            <li className="mr-8">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </li>
          </ul>
        </div>
      ) : (
        categories && (
          <div className="container">
            <ul className="blog-category-list list-style-none mb-8 md:mb-12 lg:mb-16 flex overflow-auto">
              <li
                className={`${
                  window.location.pathname === '/blog/'
                    ? 'current-tab text-primary underline underline-offset-8'
                    : ''
                } blog-category-list-item mr-8 hover:text-primary cursor-pointer text-nowrap`}>
                <div
                  className="x-small-font"
                  onClick={() => redirectToPageSlug('/blog/')}>
                  All
                </div>
              </li>
              {categories &&
                categories?.map((c_obj: any) => (
                  <Fragment key={c_obj?.id?.toString()}>
                    <li
                      className={`${
                        window.location.pathname === c_obj?.page_slug
                          ? 'current-tab text-primary underline underline-offset-8'
                          : ''
                      } blog-category-list-item mr-8 last:mr-0 hover:text-primary cursor-pointer text-nowrap
                  `}>
                      <div
                        className="x-small-font"
                        onClick={() => redirectToPageSlug(c_obj?.page_slug)}>
                        {c_obj?.page_title_esi}
                        {c_obj?.blogs_exp_rel?.length && (
                          <span>
                            ({c_obj?.relation_fields?.blogs_exp_rel?.length})
                          </span>
                        )}
                      </div>
                    </li>
                  </Fragment>
                ))}
            </ul>
          </div>
        )
      )}
    </>
  );
};

export default ExpBlogCategories;
