import { IsCMSApp, Link, useSearchParams } from 'experro-storefront';
import { IconBreadcrumbarrow } from '../../../assets/icons/breadcrumb-arrow';

interface ExpBreadcrumbProps {
  pageData: any;
  categoryPage?: boolean;
  isCMSPage?: boolean;
}

const ExpBreadcrumb = (props: ExpBreadcrumbProps) => {
  const { pageData, categoryPage, isCMSPage = false } = props;

  let crumbArray: any = [];
  const [params_query] = useSearchParams();

  const getParentId = (childId: any) => {
    const foundKey = pageData?.category_tree_ej?.find(
      (elem: any) => elem?.id === +childId
    );

    if (pageData?.provider_id_esi !== childId) {
      crumbArray[foundKey?.depth] = foundKey;
    }
    if (foundKey && foundKey?.parent_id !== 0) {
      getParentId(foundKey?.parent_id);
    }
  };

  if (params_query.get('c_id')) {
    getParentId(params_query.get('c_id'));
  } else if (categoryPage) {
    getParentId(pageData?.provider_id_esi);
  } else {
    if (pageData?.category_tree_ej?.length) {
      pageData?.category_tree_ej?.sort((a: any, b: any) => a.depth - b.depth);
      crumbArray = [...pageData.category_tree_ej];
    }
  }

  // Return null if no breadcrumb data is present
  const hasCMSPageBreadcrumbs =
    isCMSPage &&
    pageData?.seo_com?.[0]?.show_breadcrumb_eb &&
    pageData?.breadcrumb_com?.[0]?.page_title_et?.length;

  if (!hasCMSPageBreadcrumbs && crumbArray.length === 0) {
    return null;
  }

  // Should be in format - Home > [Intermediate Nodes] > Opened Page
  return (
    <div className="breadcrumb-section pt-6 pb-12">
      <div className="container">
        <ul className="breadcrumb flex items-center">
          {/* Home. */}
          <li>
            <Link
              to="/"
              className="text-sm text-gray-700 hover:text-secondary font-normal">
              Home
            </Link>
          </li>

          {/* If CMS page then will check there is SEO has show_breadcrumb_eb=> true and has data in breadcrumb_com then will process */}
          {!!(
            isCMSPage &&
            pageData?.seo_com &&
            pageData?.seo_com[0]?.show_breadcrumb_eb &&
            pageData?.breadcrumb_com?.[0]?.page_title_et?.length
          ) &&
            pageData?.breadcrumb_com?.map((item: any) => {
              if (item?.page_title_et?.length && item?.page_link_et?.length) {
                return (
                  <li key={item?.id?.toString()} className="flex items-center">
                    <span className="mx-1">
                      <i className="flex w-3 h-3 icon">
                        <IconBreadcrumbarrow />
                      </i>
                    </span>
                    {IsCMSApp ? (
                      <Link
                        to={`${item?.page_link_et}`}
                        className="text-sm text-gray-700 hover:text-secondary font-normal">
                        {item?.page_title_et}
                      </Link>
                    ) : (
                      <a
                        href={`${item?.page_link_et}`}
                        className="text-sm text-gray-700 hover:text-secondary font-normal">
                        {item?.page_title_et}
                      </a>
                    )}
                  </li>
                );
              }
            })}

          {/* Intermediate Nodes */}
          {crumbArray?.map((item: any) => {
            return (
              item?.name && (
                <li key={item.id} className="flex items-center">
                  <span className="mx-1">
                    <i className="icon">
                      {' '}
                      <IconBreadcrumbarrow />{' '}
                    </i>
                  </span>
                  <Link
                    to={`${item?.page_slug}`}
                    className="text-sm text-gray-700 hover:text-secondary font-normal">
                    {item?.name}
                  </Link>
                </li>
              )
            );
          })}

          {/* Opened Page */}
          {(pageData?.name_esi || pageData?.page_title_esi) && (
            <li className="flex items-center text-sm text-secondary font-normal">
              <span className="mx-1">
                <i className="icon">
                  <IconBreadcrumbarrow />
                </i>
              </span>
              {pageData?.page_title_esi
                ? pageData?.page_title_esi
                : pageData?.name_esi}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ExpBreadcrumb;
