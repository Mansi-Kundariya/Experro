import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconCheck } from '../../../../assets/icons/check';

export interface ExpAddWhishlistProps {
  handleCreateWishList: any;
  setOpenWishListModal: any;
  updateWishList: any;
  handleEditWishListButton: any;
}

const ExpAddWhishlist = (props: ExpAddWhishlistProps) => {
  const {
    handleCreateWishList,
    setOpenWishListModal,
    updateWishList,
    handleEditWishListButton,
  } = props;

  const { t } = useTranslation();
  const [wishListsName, setWishName] = useState('');
  const [buttonTextToEdit, setButtonTextToEdit] = useState(false);
  const [shareWishList, setShareWishList] = useState<boolean>(false);

  const onChange = (e: any, field: string) => {
    if (field === 'text') {
      setWishName(e.target.value);
    }
    if (field === 'checkbox') {
      setShareWishList(e.target.checked);
    }
  };

  useEffect(() => {
    if (updateWishList.name) {
      setWishName(updateWishList.name);
      setShareWishList(updateWishList.is_public);
      setButtonTextToEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-lg mx-auto wishlist-form">
      <div className="relative mb-3 form-field">
        <label htmlFor="wishlist" className="form-label">
          {t('common.txt_wishlist_name')}
          <span className="required">*</span>
        </label>

        <input
          className="form-input form-input-large"
          type="text"
          placeholder="Wish List Name"
          name="wishlist"
          value={wishListsName}
          required={true}
          onChange={(e) => onChange(e, 'text')}
        />
      </div>

      <div className="relative mb-8 form-field">
        <input
          type="checkbox"
          className="form-checkbox group peer absolute top-1 left-0  h-4 w-4 min-w-4 min-h-4 cursor-pointer appearance-none border border-gray-200 transition-all checked:border-primary checked:bg-primary  "
          name="publicwhishlist"
          id="publicwhishlist"
          checked={shareWishList}
          onChange={(e) => onChange(e, 'checkbox')}
        />
        <i className="icon absolute text-white transition-opacity opacity-0 pointer-events-none top-[8px] left-[3px]  peer-checked:opacity-100">
          <IconCheck />
        </i>
        <label htmlFor="publicwhishlist" className="form-label cursor-pointer text-gray-900 pl-6 mb-0">
          {t('common.txt_share_wish_list')}
        </label>
      </div>

      <div className="flex flex-wrap gap-4 justify-center form-actions text-center">
        <button
          onClick={(e) => {
            // eslint-disable-next-line no-lone-blocks
            {
              buttonTextToEdit
                ? handleEditWishListButton(e, {
                  name: wishListsName,
                  items: updateWishList.items,
                  is_public: shareWishList,
                  id: updateWishList.id,
                })
                : handleCreateWishList(e, {
                  name: wishListsName,
                  items: [],
                  is_public: shareWishList,
                });
            }
          }}
          className="button-primary button-large">
          {buttonTextToEdit ? 'Edit ' : 'Create '} {t('common.txt_wish_list')}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setOpenWishListModal(false);
          }}
          className="button-secondary button-large">
          {t('common.txt_cancel')}
        </button>
      </div>
    </div>
  );
};

export default ExpAddWhishlist;
