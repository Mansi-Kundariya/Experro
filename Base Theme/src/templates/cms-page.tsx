/* eslint-disable*/
// TODO: Disabled eslint due to component is not used anywhere
import { useEffect } from 'react';
import { DraggableArea } from 'experro-storefront';
import { ExpImage } from '../components/common-components/exp-image';
import { expImageOption } from '../interfaces/exp-image.interface';
import { ExpBreadcrumb } from '../components/common-components/breadcrumb';
export interface CmsPageProps {
  pageData: any;
  components: any;
}
const CmsPage = (props: CmsPageProps) => {
  const { pageData, components } = props;
  const options: expImageOption[] = [
    {
      width: 1903,
      aspect_ratio: '16:5',
    },
    {
      width: 1280,
      aspect_ratio: '16:10',
    },
    {
      width: 768,
      aspect_ratio: '16:10',
      crop_gravity: 'center',
    },
    {
      width: 568,
      aspect_ratio: '16:9',
      crop_gravity: 'center',
    },
    {
      width: 450,
      aspect_ratio: '16:11',
      crop_gravity: 'center',
    },
  ];
  useEffect(() => {
    if (
      pageData?.featured_image_media_emd ||
      (pageData?.seo_com && pageData?.seo_com[0]?.show_page_title_eb)
    ) {
      document.body.classList.add('page-with-landing-banner');
    }
    return () => document.body.classList.remove('page-with-landing-banner');
  }, []);
  return (
    <div className="page-body">
      {(pageData?.featured_image_media_emd ||
        (pageData?.page_title_esi &&
          pageData?.seo_com &&
          pageData?.seo_com[0]?.show_page_title_eb)) && (
        <div className="py-28 bg-neutral-50 mb-6 page-header-section">
          {!!pageData?.featured_image_media_emd && (
            <div className="category-image-overlay has-image-fill">
              <ExpImage
                options={options}
                src={
                  pageData?.featured_image_media_emd
                    ? pageData?.featured_image_media_emd[0]
                    : ''
                }
                height={500}
                width={1920}
                name={pageData?.page_title_esi}
                alt={pageData?.page_title_esi}
                title={pageData?.page_title_esi}
              />
            </div>
          )}
          {pageData?.seo_com?.length &&
            pageData?.seo_com[0]?.show_page_title_eb &&
            pageData?.page_title_esi && (
              <div className="container">
                <h1
                  className="text-center font-secondary text-2xl lg:text-4xl text-black page-title"
                  dangerouslySetInnerHTML={{
                    __html: pageData?.page_title_esi,
                  }}
                />
              </div>
            )}
        </div>
      )}
      <DraggableArea
        style={{ width: 'auto' }}
        cssClass={''}
        id={'cms-page-drop1'}
        components={components}
        modelField={''}
        pageData={pageData}
      />
      <ExpBreadcrumb pageData={pageData} isCMSPage={true} />
      <div className="page-content">
        <div className="container">
          {pageData?.description_eti && (
            <div
              className="mt-10 page-content-style"
              dangerouslySetInnerHTML={{
                __html: pageData?.description_eti,
              }}
            />
          )}
        </div>
        <DraggableArea
          style={{ width: 'auto' }}
          cssClass={''}
          id={'cms-page-drop2'}
          components={components}
          modelField={''}
          pageData={pageData}
        />
      </div>
    </div>
  );
};
export default CmsPage;
