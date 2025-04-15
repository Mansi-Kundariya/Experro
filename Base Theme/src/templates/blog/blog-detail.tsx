import { Fragment, useCallback, useEffect, useState } from 'react';
import {
  ContentService,
  DraggableArea,
  IsCMSApp,
  Link,
} from 'experro-storefront';

import { IconFacebook } from '../../assets/icons/facebook';
import { IconTwitter } from '../../assets/icons/twitter';
import { ExpImage } from '../../components/common-components/exp-image';
import { getFormattedDate } from '../../utils/get-formatted-date';
import placeHolderBlogImage from '../../assets/images/blog-placeholder.png';
import { IconBreadcrumbarrow } from '../../assets/icons/breadcrumb-arrow';
import { schemaInjector } from '../../utils/schema-org/schema-org';

export interface BlogDetailProps {
  pageData: any;
  components: any;
}

const BlogDetail = (props: BlogDetailProps) => {
  const { pageData, components } = props;

  const [categoryList, setCategoryList] = useState<any>([]);
  const [authorName, setAuthorName] = useState<any>();

  //get Filter Object
  const getFilterString = (filterFor: string) => {
    let filter = '';
    if (pageData?.categories_exp_rel && filterFor === 'c') {
      filter += `content_model_data_id:(${pageData?.categories_exp_rel.join(
        ','
      )})`;
    }
    if (pageData?.author_exp_rel && filterFor === 'a') {
      filter += `content_model_data_id:(${pageData?.author_exp_rel.join(',')})`;
    }
    return filter;
  };

  // Get Author Name
  const getAuthorName = useCallback(async () => {
    if (pageData?.author_exp_rel) {
      try {
        const apiAuthorName =
          await ContentService.searchContentModelRecordsByFieldKeyValueGET({
            fieldKey: 'id',
            fieldValue: '*',
            modelInternalName: 'author',
            fieldsToQuery: 'page_title_esi,page_slug',
            sortBy: 'created_at',
            orderBy: 'asc',
            filter: getFilterString('a'),
          });
        setAuthorName(apiAuthorName?.Data?.items);
        const blog_schema_data = {
          author_details: apiAuthorName?.Data?.items?.[0],
          blog_data: pageData,
        };
        schemaInjector({ type: 'Blog', data: blog_schema_data });
      } catch (error: any) {
        //TODO: add proper error message
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set the Categories Data
  const getContentLibraryData = useCallback(async () => {
    try {
      let apiCategoriesListingData =
        await ContentService.searchContentModelRecordsByFieldKeyValueGET({
          fieldKey: 'id',
          fieldValue: '*',
          modelInternalName: 'categories',
          fieldsToQuery: 'page_title_esi,page_slug',
          sortBy: 'created_at',
          orderBy: 'asc',
          filter: getFilterString('c'),
        });

      apiCategoriesListingData = apiCategoriesListingData?.Data?.items?.sort(
        (item1: any, item2: any) =>
          item1.created_at > item2.created_at
            ? 1
            : item1.created_at < item2.created_at
            ? -1
            : 0
      );
      setCategoryList(apiCategoriesListingData);
    } catch (error: any) {
      //TODO: add proper error message
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      await getContentLibraryData();
      await getAuthorName();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="page-body blog-post-page-template">
          <div className="mt-6 mb-12 breadcrumb-section">
            <div className="container">
              <ul className="flex items-center *:text-sm breadcrumb">
                <li className="text-gray-700 hover:text-secondary font-normal">
                  <Link to={'/'}>Home</Link>
                </li>
                {pageData?.seo_com &&
                pageData?.seo_com[0]?.show_breadcrumb_eb &&
                pageData?.breadcrumb_com?.[0]?.page_title_et?.length ? (
                  pageData?.breadcrumb_com?.map((item: any) => {
                    if (
                      item?.page_title_et?.length &&
                      item?.page_link_et?.length
                    ) {
                      return (
                        <li
                          key={item?.id?.toString()}
                          className="flex items-center">
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
                  })
                ) : (
                  <li className="flex items-center text-gray-700 hover:text-secondary font-normal">
                    <span className="mx-1">
                      <i className="flex w-3 h-3 icon">
                        <IconBreadcrumbarrow />
                      </i>
                    </span>
                    <Link
                      to={'/blog/'}
                      className="text-sm text-gray-700 hover:text-secondary font-normal">
                      Blog
                    </Link>
                  </li>
                )}

                <li className="flex items-center text-sm text-secondary font-normal">
                  <span className="mx-1">
                    <i className="flex w-3 h-3 icon">
                      <IconBreadcrumbarrow />
                    </i>
                  </span>
                  {pageData?.page_title_esi}
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content">
            <div className="container">
              <div className="blog-list-item mb-16">
                <div className="blog-list-caption text-center mb-10">
                  <div className="blog-list-caption-inner my-0 mx-auto max-w-[45.625rem]">
                    <div className="category-post text-center mb-1">
                      {categoryList && (
                        <p className="mb-0 text-base">
                          <strong className="mr-1 hidden">
                            {categoryList?.length > 1
                              ? 'Categories'
                              : 'Category'}
                            :
                          </strong>
                          {categoryList?.map((item: any, index: number) => (
                            <Fragment key={index?.toString()}>
                              <span className="uppercase font-medium primary-color">
                                {item?.page_title_esi}
                              </span>
                            </Fragment>
                          ))}
                        </p>
                      )}
                    </div>
                    <h4 className="mb-4 font-medium font-secondary text-[#191919]">
                      {pageData?.page_title_esi}
                    </h4>
                    <div className="blog-list-author flex justify-center">
                      {authorName && (
                        <p className="mb-0 author text-base pl-5">
                          {authorName?.map((item: any, index: number) => (
                            <Fragment key={index?.toString()}>
                              <span className="text-gray-700">
                                {item?.page_title_esi}
                              </span>
                            </Fragment>
                          ))}
                        </p>
                      )}
                      <p className="mb-0 posted text-base relative pl-5 before:bg-gray-200 before:block before:absolute before:h-0.5 before:w-2 before:left-1.5 before:top-2.5">
                        <span className="text-gray-700">
                          {getFormattedDate(pageData?.publish_date_edsi)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="blog-list-image overflow-hidden rounded-lg">
                  {pageData?.thumbnail_image_media_emd ? (
                    <ExpImage
                      src={
                        pageData?.thumbnail_image_media_emd
                          ? pageData?.thumbnail_image_media_emd[0]
                          : ''
                      }
                      options={[
                        {
                          width: 1480,
                          aspect_ratio: '16:8',
                          crop_gravity: 'center',
                        },
                        {
                          width: 1024,
                          aspect_ratio: '16:9',
                          crop_gravity: 'center',
                        },
                        {
                          width: 708,
                          aspect_ratio: '16:8',
                          crop_gravity: 'center',
                        },
                        {
                          width: 536,
                          aspect_ratio: '16:10',
                          crop_gravity: 'center',
                        },
                        {
                          width: 414,
                          aspect_ratio: '16:11',
                          crop_gravity: 'center',
                        },
                      ]}
                      height={626}
                      width={862}
                      name="ExpBlogLatest"
                      className="h-full w-full max-w-none overflow-hidden object-cover"
                      alt={pageData?.page_title_esi}
                      title={pageData?.page_title_esi}
                    />
                  ) : (
                    <img
                      src={placeHolderBlogImage}
                      height="297"
                      width="528"
                      alt={pageData?.page_title_esi}
                      title={pageData?.page_title_esi}
                    />
                  )}
                </div>
              </div>
              <DraggableArea
                style={{ width: 'auto' }}
                cssClass={''}
                id={'blog-detail-drop4'}
                components={components}
                modelField={''}
                pageData={pageData}
              />
              <div className="blog-post-container flex justify-center">
                <div className="px-4 lg:basis-8/12 basis-full">
                  <DraggableArea
                    style={{ width: 'auto' }}
                    cssClass={''}
                    id={'blog-detail-drop2'}
                    components={components}
                    modelField={''}
                    pageData={pageData}
                  />
                  <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: pageData?.post_body_et }}
                  />
                  <DraggableArea
                    style={{ width: 'auto' }}
                    cssClass={''}
                    id={'blog-detail-drop3'}
                    components={components}
                    modelField={''}
                    pageData={pageData}
                  />
                  <div className="blog-post-bottom-section border-t border-[#d8d8d8] mt-10 pt-4">
                    <ul className="social-icon-list mb-0 flex">
                      <li>
                        <a
                          href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}`}
                          rel="noreferrer"
                          target={'_blank'}>
                          <i className="icon w-8 h-8">
                            <IconFacebook className="fill-black max-h-full max-w-full" />
                          </i>
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(
                            pageData?.page_title_esi
                          )}&url=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Twitter">
                          <i className="icon w-8 h-8 p-1.5">
                            <IconTwitter className="fill-black max-h-full max-w-full" />
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DraggableArea
              style={{ width: 'auto' }}
              cssClass={''}
              id={'blog-detail-drop1'}
              components={components}
              modelField={''}
              pageData={pageData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
