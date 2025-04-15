import { Fragment } from 'react';

import ExpLinkParser from '../../utils/link-parser';
import { ExpImage } from '../../components/common-components/exp-image';
import { getFormattedDate } from '../../utils/get-formatted-date';
import placeHolderBlogImage from '../../assets/images/blog-placeholder.png';

export interface ExpBlogItemProps {
  blogItemData: any;
}

const ExpBlogItem = (props: ExpBlogItemProps) => {
  const { blogItemData } = props;

  const options: any = [
    {
      width: 380,
    },
    {
      width: 308,
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
      <div className="lg:basis-4/12 md:basis-6/12 basis-full blog-list-item mb-8 md:mb-12 px-6">
        <div className="blog-list-image aspect-[3/2.2] overflow-hidden rounded-lg">
          <ExpLinkParser
            to={`${blogItemData?.page_slug}`}
            className="h-full block">
            {blogItemData?.thumbnail_image_media_emd ? (
              <ExpImage
                src={
                  blogItemData?.thumbnail_image_media_emd
                    ? blogItemData?.thumbnail_image_media_emd[0]
                    : ''
                }
                options={options}
                height={270}
                width={380}
                name={`ExpBlogItem_${blogItemData?.page_slug}`}
                className="h-full w-full max-w-none overflow-hidden object-cover"
                alt={blogItemData?.page_title_esi}
                title={blogItemData?.page_title_esi}
              />
            ) : (
              <img
                src={placeHolderBlogImage}
                height="626"
                width="862"
                alt={blogItemData?.page_title_esi}
                title={blogItemData?.page_title_esi}
              />
            )}
          </ExpLinkParser>
        </div>
        <div className="blog-list-caption">
          <div className="blog-list-caption-inner pt-[1.875rem] bg-white">
            <div className="category-post flex mb-1">
              {blogItemData?.categories_exp_rel ? (
                <p className="mb-0 hidden">
                  <strong className="mr-1 hidden">
                    {blogItemData?.categories_esai?.length > 1
                      ? 'Categories'
                      : 'Category'}
                    :
                  </strong>
                  {blogItemData?.categories_exp_rel?.map(
                    (item: any, index: number) => (
                      <Fragment key={index.toString()}>
                        <ExpLinkParser to={`${item?.page_slug}`}>
                          <span className="uppercase font-medium">
                            {item?.title}
                          </span>
                        </ExpLinkParser>
                      </Fragment>
                    )
                  )}
                </p>
              ) : (
                ''
              )}
              {blogItemData?.publish_date_edsi ? (
                <p className="mb-0 pl-0 posted relative">
                  <span className="text-gray-800">
                    {getFormattedDate(blogItemData?.publish_date_edsi)}
                  </span>
                </p>
              ) : (
                ''
              )}
            </div>
            <h5 className="mb-4 font-semi-bold text-[1.375rem] font-secondary leading-8">
              <ExpLinkParser
                to={`${blogItemData?.page_slug}`}
                className="text-[#191919]">
                {blogItemData?.page_title_esi}
              </ExpLinkParser>
            </h5>
            <p
              className="mb-4 description text-gray-900 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: blogItemData?.summary_et }}
            />
            {blogItemData?.author_exp_rel &&
            blogItemData?.author_exp_rel[0]?.title?.length ? (
              <div className="blog-list-author">
                <p className="m-b-0 author position-relative">
                  <span className="dark-color">
                    {blogItemData?.author_exp_rel[0]?.title}
                  </span>
                </p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpBlogItem;
