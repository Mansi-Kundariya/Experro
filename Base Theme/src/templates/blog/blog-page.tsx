import { DraggableArea, Link } from 'experro-storefront';
import ExpBlogListing from './blog-listing';
import { IconBreadcrumbarrow } from '../../assets/icons/breadcrumb-arrow';
import { useCallback, useState } from 'react';
import ExpLatestBlog from './latest-blog';
import ExpBlogCategories from './blog-categories';
import { ContentService } from 'experro-storefront';

export interface BlogPageProps {
  pageData: any;
  components: any;
}
const BlogPage = (props: BlogPageProps) => {
  const { pageData, components } = props;
  const [_pageData, setPageData] = useState<any>(pageData);
  const [latestPost, setLatestPost] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const redirectToPageSlug = useCallback(async (slug: any) => {
    if (slug === window.location.pathname) {
      return;
    }
    window.history.replaceState(null, '', slug);
    const response = await ContentService.getPageDataBySlug({
      pageSlug: slug,
    });
    setPageNumber(1);
    setPageData(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="page-body blog-list-page-template">
        <div className="py-28 bg-neutral-50 mb-6 page-header-section">
          <div className="container text-center">
            <h1 className="text-center font-secondary text-2xl lg:text-4xl text-black page-title">
              {window.location.pathname === '/blog/'
                ? 'Blog'
                : _pageData?.page_title_esi}
            </h1>
          </div>
        </div>
        <div className="mt-6 mb-12 breadcrumb-section">
          <div className="container">
            <ul className="flex items-center *:text-sm breadcrumb">
              <li>
                <Link
                  to={'/'}
                  className="text-sm text-gray-700 hover:text-secondary font-normal">
                  Home
                </Link>
              </li>

              {window.location.pathname !== '/blog/' ? (
                <>
                  <li className="flex items-center">
                    <span className="mx-1">
                      <i className="flex w-3 h-3 icon">
                        <IconBreadcrumbarrow />
                      </i>
                    </span>
                    <div
                      className="text-sm text-gray-700 hover:text-secondary font-normal"
                      onClick={() => {
                        redirectToPageSlug('/blog/');
                      }}>
                      Blog
                    </div>
                  </li>
                  <li className="flex items-center text-sm text-secondary font-normal">
                    <span className="mx-1">
                      <i className="flex w-3 h-3 icon">
                        <IconBreadcrumbarrow />
                      </i>
                    </span>
                    {_pageData?.page_title_esi}
                  </li>
                </>
              ) : (
                <li className="flex items-center text-sm text-secondary font-normal">
                  <span className="mx-1">
                    <i className="flex w-3 h-3 icon">
                      <IconBreadcrumbarrow />
                    </i>
                  </span>
                  Blog
                </li>
              )}
            </ul>
          </div>
        </div>

        <DraggableArea
          style={{ width: 'auto' }}
          cssClass={''}
          id={'blog-page-drop1'}
          components={components}
          modelField={''}
          pageData={_pageData}
        />
        <ExpLatestBlog
          latestPost={latestPost}
          setLatestPost={setLatestPost}></ExpLatestBlog>
        <ExpBlogCategories
          setCategoriesData={''}
          redirectToPageSlug={redirectToPageSlug}
        />
        {/* ------ Blog-Listing --------------*/}

        <ExpBlogListing
          _pageData={_pageData}
          setPageData={setPageData}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />

        <DraggableArea
          style={{ width: 'auto' }}
          cssClass={''}
          id={'blog-page-drop2'}
          components={components}
          modelField={''}
          pageData={_pageData}
        />
      </div>
    </div>
  );
};

export default BlogPage;
