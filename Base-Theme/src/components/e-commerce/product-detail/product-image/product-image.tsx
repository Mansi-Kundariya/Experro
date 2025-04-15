import { memo } from 'react';
import Modal from 'react-modal';
import ExpProductImageController from './product-image-controller';
import placeHolderCard from '../../../../assets/images/placeholder-product-card.jpg';
import { ImageLens } from '../../../../utils';
import { ExpImage } from '../../../common-components/exp-image';
import { IconCross } from '../../../../assets/icons/cross';
import { IconProductLeft } from '../../../../assets/icons/product-left';
import { IconProductRight } from '../../../../assets/icons/product-right';

interface ExpProductImageProps {
  product: {
    name_eti: string;
    images_ej: any[];
    custom_fields_ej: any;
    retail_price_ef: any;
    price_efi?: any;
  };
  isInModalElement: boolean | undefined;
}

const ExpProductImage = (props: ExpProductImageProps) => {
  const { product, isInModalElement = false } = props;
  const {
    setIsImagePreviewOpen,
    isImagePreviewOpen,
    deviceWidth,
    scrollNext,
    scrollPrev,
    onThumbClick,
    emblaMainRef,
    emblaThumbsRef,
    selectedIndex,
    emblaMainApi,
  } = ExpProductImageController();

  return (
    <div className="px-4 basis-full lg:basis-5/12 w-full product-image-section">
      <div className="product-image-gallery">
        <div className="product-image-gallery-wrap max-w-[450px] m-auto lg:max-w-full">
          {!!product?.retail_price_ef &&
            product?.retail_price_ef !== product?.price_efi && (
              <div className="sale-flag uppercase">
                <span>Sale</span>
              </div>
            )}
          {product?.images_ej && product?.images_ej?.length > 0 ? (
            <>
              <div className="embla overflow-hidden relative">
                <div className="embla__viewport" ref={emblaMainRef}>
                  <div className="embla__container flex bg-gray-50">
                    {product?.images_ej &&
                      product?.images_ej?.map(
                        (image: { url_zoom: string }, index: number) => {
                          if (!isInModalElement && deviceWidth > 1023)
                            return (
                              <div
                                className="embla__slide min-w-0 shrink-0 grow-0 basis-full"
                                key={index}>
                                <div
                                  key={index?.toString()}
                                  className="product-gallery-main-item">
                                  <ImageLens
                                    imageUrl={`${image?.url_zoom.replace(
                                      'https://cdn11.bigcommerce.com',
                                      'https://product-images.experro.app'
                                    )}`}
                                    altText={product?.name_eti}
                                    customeFields={product?.custom_fields_ej}
                                    index={index}
                                    className="mix-blend-multiply"
                                  />
                                </div>
                              </div>
                            );
                          else
                            return (
                              <div
                                className="embla__slide min-w-0 shrink-0 grow-0 basis-full"
                                key={index}>
                                <div
                                  key={index?.toString()}
                                  className="product-gallery-main-item product-gallery-main-item-mobile"
                                  onClick={() =>
                                    deviceWidth < 767 &&
                                    setIsImagePreviewOpen(true)
                                  }>
                                  <ExpImage
                                    src={`${image?.url_zoom.replace(
                                      'https://cdn11.bigcommerce.com',
                                      'https://product-images.experro.app'
                                    )}`}
                                    height={388}
                                    width={388}
                                    options={[
                                      {
                                        width: 598,
                                        aspect_ratio: '1:1',
                                      },
                                      {
                                        width: 496,
                                        aspect_ratio: '1:1',
                                      },
                                      {
                                        width: 450,
                                        aspect_ratio: '1:1',
                                        crop_gravity: 'center',
                                      },
                                      {
                                        width: 450,
                                        aspect_ratio: '1:1',
                                        crop_gravity: 'center',
                                      },
                                      {
                                        width: 388,
                                        aspect_ratio: '1:1',
                                        crop_gravity: 'center',
                                      },
                                    ]}
                                    name={`ExpProductImage${product?.name_eti}_`}
                                    pictureClassName="flex items-center h-full justify-center max-h-full max-w-full relative w-full"
                                    alt={product?.name_eti}
                                    title={product?.name_eti}
                                  />
                                </div>
                              </div>
                            );
                        }
                      )}
                  </div>
                </div>
                <button
                  type="button"
                  className={`embla__prev embla__arrow focus:outline-none absolute top-2/4 -translate-y-2/4 left-6 ${
                    emblaMainApi?.canScrollPrev() ? '' : 'disabled opacity-30'
                  }`}
                  onClick={scrollPrev}>
                  <IconProductLeft />
                </button>
                <button
                  type="button"
                  className={`embla__next embla__arrow focus:outline-none absolute top-2/4 -translate-y-2/4 right-6 ${
                    emblaMainApi?.canScrollNext() ? '' : 'disabled opacity-30'
                  }`}
                  onClick={scrollNext}>
                  <IconProductRight />
                </button>
              </div>
            </>
          ) : (
            <img src={placeHolderCard} alt={'coming soon'} />
          )}
        </div>

        {product?.images_ej && product?.images_ej?.length > 0 && (
          <div className="product-gallery-thumbs mt-6">
            <div className="embla">
              <div
                className="embla__viewport overflow-hidden"
                ref={emblaThumbsRef}>
                <div className="embla__container flex -mx-3">
                  {product?.images_ej &&
                    product?.images_ej?.map(
                      (image: { url_zoom: string }, index: number) => (
                        <div
                          className="embla__slide px-3 min-w-0 shrink-0 grow-0 basis-6/12 sm:basis-[9.625rem] "
                          key={index}>
                          <div
                            key={index?.toString()}
                            className={`product-gallery-thumb-item cursor-pointer bg-gray-50 border hover:border-primary ${
                              selectedIndex === index
                                ? 'is-selected border-primary'
                                : 'border-transparent'
                            }`}
                            onClick={() => onThumbClick(index)}>
                            <ExpImage
                              className="mix-blend-multiply mx-auto"
                              src={`${image?.url_zoom.replace(
                                'https://cdn11.bigcommerce.com',
                                'https://product-images.experro.app'
                              )}`}
                              height={130}
                              width={130}
                              options={[
                                {
                                  width: 130,
                                  aspect_ratio: '1:1',
                                },
                                {
                                  width: 100,
                                  aspect_ratio: '1:1',
                                },
                                {
                                  width: 96,
                                  aspect_ratio: '1:1',
                                  crop_gravity: 'center',
                                },
                                {
                                  width: 96,
                                  aspect_ratio: '1:1',
                                  crop_gravity: 'center',
                                },
                                {
                                  width: 114,
                                  aspect_ratio: '1:1',
                                  crop_gravity: 'center',
                                },
                              ]}
                              alt={product?.name_eti}
                              title={product?.name_eti}
                              name={`ExpProductImage${product?.name_eti}_`}
                            />
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="modal">
        {isImagePreviewOpen && (
          <Modal
            isOpen={isImagePreviewOpen}
            className="mobile-view-image-popup w-full bg-white shadow-md max-h-full max-w-full overflow-hidden relative m-4"
            ariaHideApp={false}>
            <div className="popup-close-link cursor-pointer absolute right-5 top-7 z-10">
              <i
                onClick={() => setIsImagePreviewOpen(false)}
                className="icon h-4 w-4 block">
                <IconCross className="stroke-black" />
              </i>
            </div>
            <div className="modal-content flex items-center justify-center h-full w-full overflow-hidden p-4">
              <div className="embla">
                <div
                  className="embla__viewport overflow-hidden"
                  ref={emblaMainRef}>
                  <div className="embla__container flex -mx-3">
                    {product?.images_ej &&
                      product?.images_ej?.map(
                        (image: { url_zoom: string }, index: number) => (
                          <div className="embla__slide px-3 min-w-0 shrink-0 grow-0 w-full">
                            <div
                              key={index?.toString()}
                              className="product-main-image-item bg-gray-50">
                              <ExpImage
                                src={`${image?.url_zoom.replace(
                                  'https://cdn11.bigcommerce.com',
                                  'https://product-images.experro.app'
                                )}`}
                                height={590}
                                width={590}
                                options={[{ width: 590 }]}
                                name={`ExpProductImage${product?.name_eti}_`}
                                alt={product?.name_eti}
                                title={product?.name_eti}
                              />
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>

                <button
                  type="button"
                  className={`embla__prev embla__arrow focus:outline-none absolute top-2/4 -translate-y-2/4 left-6 ${
                    emblaMainApi?.canScrollPrev() ? '' : 'disabled opacity-30'
                  }`}
                  onClick={scrollPrev}>
                  <IconProductLeft />
                </button>
                <button
                  type="button"
                  className={`embla__next embla__arrow focus:outline-none absolute top-2/4 -translate-y-2/4 right-6 ${
                    emblaMainApi?.canScrollNext() ? '' : 'disabled opacity-30'
                  }`}
                  onClick={scrollNext}>
                  <IconProductRight />
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default memo(ExpProductImage);
