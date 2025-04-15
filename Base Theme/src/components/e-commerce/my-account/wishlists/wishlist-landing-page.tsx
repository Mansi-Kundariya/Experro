import ExpWishlistLandingPageController from './wishlist-landing-page-controller';
import { IconWarning } from '../../../../assets/icons/warning-icon';
import { useTranslation } from 'react-i18next';
import { ExpProductCell } from '../../product-cell';

const ExpWishlistLandingPage = () => {
  const { t } = useTranslation();
  const { wishlistProducts, isLoading, wishlistName } =
    ExpWishlistLandingPageController();

  if (isLoading) {
    return (
      <div className="loading-section is-loading">
        <div className="loader-wrapper">
          <div className="loader-icon flex" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="py-12">
        <div className="container">
          <div className="wishlist-share-heading text-center mb-10">
            <h5 className="text-lg md:text-3xl">
              {t('common.txt_wish_list')}: {wishlistName}
            </h5>
          </div>
          <div className="product-listing grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {wishlistProducts?.length > 0 &&
              wishlistProducts?.map((item: any, index: number) => (
                <>
                  <div className="product-card relative">
                    <ExpProductCell
                      key={index.toString()}
                      productDetails={item}
                      showActionButtons={false}
                      mode={'direct'}
                      productCellIndex={index}
                    />
                  </div>
                </>
              ))}

            {wishlistProducts?.length === 0 && (
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
          </div>
        </div>
      </div>
    );
  }
};

export default ExpWishlistLandingPage;
