import ExpAddWhishlist from './add-wishlist';
import ExpWhishlistsController from './wishlists-controller';
import ExpWishlistItemsCell from './wishlist-items-cell';
import { IconWarning } from '../../../../assets/icons/warning-icon';
import { useTranslation } from 'react-i18next';

const ExpWhishLists = ({
  wishListData,
  getWishListData,
  isWishListLoading,
}: any) => {
  const { t } = useTranslation();
  const {
    handleCreateWishList,
    handleEditWishList,
    updateWishList,
    setUpdateWishList,
    openWishListModal,
    setOpenWishListModal,
    handleEditWishListButton,
    handleDeleteWishList,
    handleWishListButtonClick,
    tabSelected,
  } = ExpWhishlistsController(getWishListData);

  if (!tabSelected) {
    return (
      <>
        {isWishListLoading ? (
          <div
            className={`loading-section ${isWishListLoading ? 'is-loading' : ''
              }`}>
            <div className="loader-wrapper">
              <div className="loader-icon flex" />
            </div>
          </div>
        ) : (
          <>
            {openWishListModal ? (
              <ExpAddWhishlist
                handleCreateWishList={handleCreateWishList}
                setOpenWishListModal={setOpenWishListModal}
                updateWishList={updateWishList}
                handleEditWishListButton={handleEditWishListButton}
              />
            ) : (
              <>
                {wishListData && wishListData.length ? (
                  <table className="my-8 w-full wishlist-table">
                    <thead className="bg-primary text-white table-head">
                      <tr>
                        <th className='pl-5 py-3 font-medium text-left text-sm'>{t('common.txt_wishlist_name')}</th>
                        <th className='py-3 font-medium text-center text-sm'>{t('common.txt_items')}</th>
                        <th className='py-3 font-medium text-center text-sm'>{t('common.txt_shared')}</th>
                        <th className='pr-5 py-3 font-medium text-right text-sm'>{t('common.txt_action')}</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {wishListData.map((items: any, index: number) => (
                        <tr className='border-b border-gray-200' key={index.toString()}>
                          <>
                            <td className='pl-5 py-3 font-medium text-left text-sm'>
                              <span
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleWishListButtonClick(items?.id, false);
                                }}
                                className="account-link hover:text-primary underline underline-offset-4 text cursor-pointer inline-block">
                                {items?.name}
                              </span>
                            </td>
                            <td className='py-3 text-gray-900 font-medium text-center text-sm'>{items?.items?.length}</td>
                            <td className='py-3 text-gray-900 font-medium text-center text-sm'>{items?.is_public ? 'Yes' : 'No'}</td>
                            <td className="pr-5 py-3 font-medium text-right text-sm table-actions">
                              <div className="flex justify-end flex-wrap gap-3 form-actions">
                                {items?.is_public && (
                                  <button
                                    onClick={() =>
                                      handleWishListButtonClick(items?.id, true)
                                    }
                                    className="button button-secondary button-small">
                                    {t('common.txt_share')}
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    handleEditWishList(e, items);
                                  }}
                                  className="button button-secondary button-small">
                                  {t('common.txt_edit')}
                                </button>
                                <button
                                  className="button button-secondary button-small"
                                  onClick={() => {
                                    handleDeleteWishList(items);
                                  }}>
                                  {t('common.txt_delete')}
                                </button>
                              </div>
                            </td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="alertbox p-4 table my-8 mx-auto bg-neutral-100">
                    <div className="alertbox-icon table-cell pr-5">
                      <i className="icon inline-block align-middle min-w-6">
                        <IconWarning />
                      </i>
                    </div>
                    <p className="alertbox-message font-bold mb-0">
                      {t('common.txt_wish_list_add_msg')}
                    </p>
                  </div>
                )}

                <div className="form-actions text-center m-t-24">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenWishListModal(true);
                      setUpdateWishList([]);
                    }}
                    className="button-primary button-large">
                    {t('common.txt_new_wish_list')}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  } else {
    return <ExpWishlistItemsCell getWishListData={getWishListData} />;
  }
};

export default ExpWhishLists;
