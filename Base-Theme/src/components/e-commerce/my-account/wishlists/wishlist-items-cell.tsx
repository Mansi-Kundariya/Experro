import ExpWishListItemCellController from './wishlist-items-cell-controller';
import ExpWishListShareUrl from './wishlist-share-url';
import { IconCross } from '../../../../assets/icons/cross';
import { IconWarning } from '../../../../assets/icons/warning-icon';
import { useTranslation } from 'react-i18next';
import { ExpProductCell } from '../../product-cell';
import { ExpImage } from '../../../common-components/exp-image';

const ExpWishlistItemsCell = (getWishListData: any) => {
  const { t } = useTranslation();
  const {
    wishListProducts,
    wishListProductsLoading,
    deleteItemFromWishList,
    shareWishListFlag,
  } = ExpWishListItemCellController(getWishListData);

  if (wishListProductsLoading) {
    return (
      <div className="loading-section is-loading">
        <div className="loader-wrapper">
          <div className="loader-icon flex" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        {shareWishListFlag === 'true' && (
          <div className="wishlist-share-link border border-neutral-100 bg-neutral-100 p-6 md:p-8 mb-10">
            <h5 className="text-lg md:text-3xl text-center">
              {t('common.txt_share_wish_list_message')}:
            </h5>
            <div className="share-link-item text-center mt-4">
              <ExpWishListShareUrl />
            </div>
          </div>
        )}

        <div className="product-listing grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
          {wishListProducts?.length > 0 &&
            wishListProducts?.map((item: any, index: number) => (
              <>
                <div className="product-card relative">
                  {item?.isDiscontinued ? (
                    <>
                      {item?.isInStock ? (
                        <ExpProductCell
                          key={index.toString()}
                          productDetails={item}
                          showActionButtons={false}
                          mode={'direct'}
                          productCellIndex={index}
                        />
                      ) : (
                        <div className="cursor-not-allowed [&_.overlay-link]:pointer-events-none">
                          <ExpProductCell
                            nameSuffix="(Out of stock)"
                            key={index.toString()}
                            productDetails={item}
                            showActionButtons={false}
                            mode={'direct'}
                            productCellIndex={index}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="product-card">
                      <div className="card-inner relative h-full flex flex-col group overflow-hidden">
                        <div className="card-figure mb-4 relative">
                          <div className="card-image-item w-full h-full relative bg-gray-50 overflow-hidden before:bg-white before:transition-all before:absolute before:top-0 before:left-0 before:bottom-0 before:h-full before:w-full before:z-[1] before:opacity-0 group-hover:before:blur-[3px] group-hover:before:opacity-30">
                            <ExpImage
                              height={346}
                              width={346}
                              name="wishlist image"
                              src={''}
                            />
                          </div>
                        </div>
                        <div className="card-description flex flex-col">
                          <div className="card-description-info flex-1">
                            <div className="card-brand-rating flex flex-wrap align-center justify-between">
                              <h4 className="card-title capitalize text-base lg:text-lg font-normal mt-2 mb-6">
                                Product Not Available
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="cart-remove absolute top-2 right-3 z-10"
                    onClick={() =>
                      deleteItemFromWishList(
                        item.provider_id_esi
                          ? +item.provider_id_esi
                          : +item?.wishListDetail?.product_id
                      )
                    }>
                    <i className="icon w-3 h-3 group cursor-pointer">
                      <IconCross className="stroke-[#000] group-[.icon]:hover:stroke-primary" />
                    </i>
                  </div>
                </div>
              </>
            ))}
        </div>
        {wishListProducts?.length === 0 && (
          <div className="alertbox p-4 table my-8 mx-auto bg-neutral-100">
            <div className="alertbox-icon table-cell pr-5">
              <i className="icon inline-block align-middle min-w-6">
                <IconWarning />
              </i>
            </div>
            <p className="alertbox-message font-bold mb-0">
              {t('common.txt_wish_list_error_msg')}
            </p>
          </div>
        )}
      </>
    );
  }
};

export default ExpWishlistItemsCell;
