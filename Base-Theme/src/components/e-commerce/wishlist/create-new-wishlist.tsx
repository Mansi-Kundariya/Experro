import { useMemo, useState } from 'react';
import { EcommerceService, toast } from 'experro-storefront';
import { useTranslation } from 'react-i18next';
import { IconCheck } from '@icons/check';

export interface ExpCreateNewWishlistProps {
  setIsWishlistModalOpen: any;
  productDetails: any;
  setShowAddToWishlistPopup: any;
}

const ExpCreateNewWishlist = (props: ExpCreateNewWishlistProps) => {
  const { setIsWishlistModalOpen, productDetails, setShowAddToWishlistPopup } =
    props;

  const [wishListName, setWishlistName] = useState<string>('');
  const [shareWishlist, setShareWishlist] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleInputOnChange = (event: any) => {
    if (!event?.target?.value) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
    setWishlistName(event?.target?.value);
  };

  const handleOnBlur = (event: any) => {
    if (!event?.target?.value) {
      setShowErrorMessage(true);
    }
  };

  const isButtonValid = useMemo(() => Boolean(wishListName), [wishListName]);

  const handleCreateNewWishlistButtonClick = async (event: any) => {
    event.preventDefault();
    const searchObj = {
      name: wishListName,
      is_public: shareWishlist,
      items: [productDetails],
    };

    try {
      const response = await EcommerceService.createWishlist({
        body: searchObj,
      });
      if (response.Status === 'failure') {
        return toast.error(response.Error.message);
      }
      toast.success(t('toast_msg_success.whish_list_create'));
      setIsWishlistModalOpen(false);
      setShowAddToWishlistPopup(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <>
      <div className="modal-header border-b border-neutral-200 px-7 md:px-10 py-5">
        <h5 className="modal-title text-center text-lg md:text-3xl font-medium">
          {t('common.txt_new_wish_list')}
        </h5>
      </div>
      <div className="modal-content max-h-[75vh] min-h-[40vh] overflow-auto p-7 md:p-10 relative z-10">
        <div className="modal-body">
          <div className="flex justify-center">
            <div className="w-full lg:w-6/12">
              <p className="text-center text-sm mb-6">
                {t('common.txt_create_wish_list_message')}
              </p>

              <form action="">
                <div className="form-field mb-6 md:mb-8">
                  <label htmlFor="createNewWishListName" className="form-label">
                    {t('common.txt_wishlist_name')}:
                    <span className="required">*</span>
                  </label>

                  <input
                    className={`form-input ${
                      showErrorMessage ? 'isInvalid' : ''
                    }`}
                    value={wishListName}
                    onChange={handleInputOnChange}
                    type="text"
                    id="createsNewWishListName"
                    onBlur={handleOnBlur}
                  />

                  {showErrorMessage && (
                    <span className="form-error-message">
                      {t('common.txt_must_enter_wish_list_name')}
                    </span>
                  )}
                </div>

                <div className="relative mb-6 md:mb-8 form-field">
                  <input
                    type="checkbox"
                    className="form-checkbox group peer absolute top-1 left-0  h-4 w-4 min-w-4 min-h-4 cursor-pointer appearance-none border border-gray-200 transition-all checked:border-primary checked:bg-primary  "
                    name="publicwhishlist"
                    id="publicwhishlist"
                    checked={shareWishlist}
                    onChange={(e) => setShareWishlist(e?.target?.checked)}
                  />
                  <i className="icon absolute text-white transition-opacity opacity-0 pointer-events-none top-[8px] left-[3px]  peer-checked:opacity-100">
                    <IconCheck />
                  </i>
                  <label
                    htmlFor="publicwhishlist"
                    className="form-label cursor-pointer text-gray-900 pl-6 mb-0">
                    {t('common.txt_share_wish_list')}
                  </label>
                </div>

                <div className="form-submit">
                  <button
                    className="button-secondary"
                    onClick={handleCreateNewWishlistButtonClick}
                    disabled={!isButtonValid}>
                    {t('common.txt_create_wish_list')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpCreateNewWishlist;
