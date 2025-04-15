import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { ContentService } from 'experro-storefront';
import ExpLinkParser from '../../utils/link-parser';
import { ExpImage } from '../../components/common-components/exp-image';
import { getFormattedDate } from '../../utils/get-formatted-date';
import placeHolderBlogImage from '../../assets/images/blog-placeholder.png';

const ExpLatestBlog: React.FC<any> = (props: any) => {
  const { latestPost, setLatestPost } = props;
  const [isLoading, setIsLoading] = useState(true);

  //Function to get all the posts
  const getLatestPostData = useCallback(async () => {
    try {
      const apiDataForPosts =
        await ContentService.searchContentModelRecordsByFieldKeyValueGET({
          modelInternalName: 'posts',
          fieldKey: 'set_as_a_featured_ebi',
          fieldValue: 'true',
          fieldsToQuery: '*',
          sortBy: 'modified_at',
          orderBy: 'desc',
          relationField: 'categories_exp_rel,author_exp_rel', // need to give the relation field name to get the data, e.g. here we want to get relation data for categories so need to pass it
          relationFieldDataToQuery: 'page_slug,title',
          limit: '1',
          skip: '0',
        });
      setLatestPost(apiDataForPosts?.Data?.items[0]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      //TODO: add proper error message
      // eslint-disable-next-line no-console
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestPost]);

  useEffect(() => {
    getLatestPostData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: any = [
    {
      width: 487,
    },
    {
      width: 388,
    },
    {
      width: 344,
    },
    {
      width: 536,
    },
    {
      width: 418,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="flex flex-wrap -mx-6 items-center latestBlog mb-4 sm:mb-10 animate-pulse">
            <div className="lg:basis-5/12 md:basis-6/12 basis-full blog-list-item px-6">
              <div className="blog-list-image aspect-[3/2.2] overflow-hidden rounded-lg">
                <div className="h-full block">
                  <div className="h-full w-full max-w-none overflow-hidden object-cover bg-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="lg:basis-7/12 md:basis-6/12 basis-full blog-list-caption px-6 mt-6 md:mt-0">
              <div className="category-post flex mb-1.5">
                <div className="hidden"></div>
                <p className="mb-0 relative h-4 bg-gray-200 rounded"></p>
              </div>
              <h5 className="mb-4 font-semi-bold font-secondary text-[2rem] font-bold h-8 bg-gray-200 rounded"></h5>
              <div className="mb-4 text-base overflow-hidden text-gray-900 description h-8 bg-gray-200 rounded"></div>
              <div className="blog-list-author">
                <p className="m-b-0 author position-relative h-4 bg-gray-200 rounded"></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !!latestPost?.page_slug && (
          <div className="container">
            <div className="flex flex-wrap -mx-6 items-center latestBlog mb-4 sm:mb-10">
              <div className="lg:basis-5/12 md:basis-6/12 basis-full blog-list-item px-6">
                <div className="blog-list-image aspect-[3/2.2] overflow-hidden rounded-lg">
                  <ExpLinkParser
                    to={latestPost?.page_slug}
                    className="h-full block">
                    {latestPost?.thumbnail_image_media_emd ? (
                      <ExpImage
                        src={
                          latestPost?.thumbnail_image_media_emd
                            ? latestPost?.thumbnail_image_media_emd[0]
                            : ''
                        }
                        options={options}
                        height={346}
                        width={487}
                        name={`ExpBlogItem_${latestPost?.page_title_esi}`}
                        className="h-full w-full max-w-none overflow-hidden object-cover"
                        alt={latestPost?.page_title_esi}
                        title={latestPost?.page_title_esi}
                      />
                    ) : (
                      <img
                        src={placeHolderBlogImage}
                        height="346"
                        width="487"
                        alt={latestPost?.page_title_esi}
                        title={latestPost?.page_title_esi}
                      />
                    )}
                  </ExpLinkParser>
                </div>
              </div>
              <div className="lg:basis-7/12 md:basis-6/12 basis-full blog-list-caption px-6 mt-6 md:mt-0">
                <div className="category-post flex mb-1.5">
                  <p className="hidden">
                    {latestPost?.categories_exp_rel &&
                      latestPost?.categories_exp_rel?.map(
                        (item: any, index: number) => (
                          <Fragment key={index.toString()}>
                            <ExpLinkParser to={item?.page_slug}>
                              <span className="uppercase font-medium">
                                {item?.title}
                              </span>
                            </ExpLinkParser>
                          </Fragment>
                        )
                      )}
                  </p>
                  <p className="mb-0 relative">
                    <span className="text-gray-700">
                      {getFormattedDate(latestPost?.publish_date_edsi)}
                    </span>
                  </p>
                </div>
                <h5 className="mb-4 font-semi-bold font-secondary text-[2rem] font-bold">
                  <ExpLinkParser to={latestPost?.page_slug} className="">
                    {latestPost?.page_title_esi}
                  </ExpLinkParser>
                </h5>

                {latestPost?.summary_et && (
                  <p
                    className="mb-4 text-base overflow-hidden text-gray-900 description"
                    dangerouslySetInnerHTML={{ __html: latestPost?.summary_et }}
                  />
                )}
                {latestPost?.author_exp_rel &&
                  latestPost?.author_exp_rel[0]?.title?.length && (
                    <div className="blog-list-author">
                      <p className="m-b-0 author position-relative">
                        <span className="dark-color">
                          {latestPost?.author_exp_rel[0]?.title}
                        </span>
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ExpLatestBlog;
