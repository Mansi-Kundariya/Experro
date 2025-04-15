import ExpMyAccountSettingsController from './my-account-controller';
import { ExpOrders } from './orders';
import { ExpAddresses } from './addresses';
import { ExpWhishLists } from './wishlists';
import { ExpAccountSettings } from './account-settings';
import { ExpMessages } from './messages';
import { useTranslation } from 'react-i18next';

const ExpMyAccount = () => {
  const { t } = useTranslation();
  const {
    onTabChange,
    selectedTab,
    wishListData,
    getWishListData,
    isWishListLoading,
    isOrderListLoading,
    orderData,
    getOrderData,
  } = ExpMyAccountSettingsController();

  return (
    <div className="py-12 account-page">
      <div className="container">
        <div id="account" className="account max-w-full lg:max-w-[90%] xl:max-w-[70%] mx-auto">
          <div className="py-8 lg:py-12 page-header-section">
            <h1 className="text-2xl lg:text-3xl text-secondary text-center font-semibold capitalize font-secondary">
              {selectedTab === 'settings' || !selectedTab
                ? 'account settings'
                : selectedTab}
            </h1>
          </div>

          <nav className="navbar text-center mb-7">
            <ul className="navbar-section list-style-none mb-0 flex flex-wrap items-end justify-center">
              <li
                className={`navbar-item mx-3 mb-3.5 cursor-pointer  relative group ${selectedTab === 'orders' && 'is-active'
                  }`}>
                <div
                  className="navbar-action text-gray-900 before:absolute before:bg-primary before:top-full before:block before:h-0.5 before:left-0 before:mx-auto before:opacity-0 before:right-0 before:transition-all before:invisible before:w-0 group-hover:before:opacity-100 group-hover:before:transition-all group-hover:before:visible group-hover:before:w-full group-[.is-active]:before:opacity-100 group-[.is-active]:before:transition-all group-[.is-active]:before:visible group-[.is-active]:before:w-full group-[.is-active]:text-primary group-hover:text-primary"
                  onClick={() => onTabChange('orders')}>
                  {t('common.txt_orders')}
                </div>
              </li>
              <li
                className={`navbar-item mx-3 mb-3.5 cursor-pointer  relative group ${selectedTab === 'messages' && 'is-active'
                  }`}>
                <div
                  className="navbar-action text-gray-900 before:absolute before:bg-primary before:top-full before:block before:h-0.5 before:left-0 before:mx-auto before:opacity-0 before:right-0 before:transition-all before:invisible before:w-0 group-hover:before:opacity-100 group-hover:before:transition-all group-hover:before:visible group-hover:before:w-full group-[.is-active]:before:opacity-100 group-[.is-active]:before:transition-all group-[.is-active]:before:visible group-[.is-active]:before:w-full group-[.is-active]:text-primary group-hover:text-primary"
                  onClick={() => onTabChange('messages')}>
                  {t('common.txt_message')}
                </div>
              </li>
              <li
                className={`navbar-item mx-3 mb-3.5 cursor-pointer  relative group ${selectedTab === 'address' && 'is-active'
                  }`}>
                <div
                  className="navbar-action text-gray-900 before:absolute before:bg-primary before:top-full before:block before:h-0.5 before:left-0 before:mx-auto before:opacity-0 before:right-0 before:transition-all before:invisible before:w-0 group-hover:before:opacity-100 group-hover:before:transition-all group-hover:before:visible group-hover:before:w-full group-[.is-active]:before:opacity-100 group-[.is-active]:before:transition-all group-[.is-active]:before:visible group-[.is-active]:before:w-full group-[.is-active]:text-primary group-hover:text-primary"
                  onClick={() => onTabChange('address')}>
                  {t('common.txt_addresses')}
                </div>
              </li>

              <li
                className={`navbar-item mx-3 mb-3.5 cursor-pointer  relative group ${selectedTab === 'wishlist' && 'is-active'
                  }`}>
                <div
                  className="navbar-action text-gray-900 before:absolute before:bg-primary before:top-full before:block before:h-0.5 before:left-0 before:mx-auto before:opacity-0 before:right-0 before:transition-all before:invisible before:w-0 group-hover:before:opacity-100 group-hover:before:transition-all group-hover:before:visible group-hover:before:w-full group-[.is-active]:before:opacity-100 group-[.is-active]:before:transition-all group-[.is-active]:before:visible group-[.is-active]:before:w-full group-[.is-active]:text-primary group-hover:text-primary"
                  onClick={() => onTabChange('wishlist')}>
                  {t('common.txt_wish_lists')} ({wishListData.length})
                </div>
              </li>

              <li
                className={`navbar-item mx-3 mb-3.5 cursor-pointer  relative group ${(selectedTab === 'settings' || selectedTab === '') &&
                  'is-active'
                  }`}>
                <div
                  className="navbar-action text-gray-900 before:absolute before:bg-primary before:top-full before:block before:h-0.5 before:left-0 before:mx-auto before:opacity-0 before:right-0 before:transition-all before:invisible before:w-0 group-hover:before:opacity-100 group-hover:before:transition-all group-hover:before:visible group-hover:before:w-full group-[.is-active]:before:opacity-100 group-[.is-active]:before:transition-all group-[.is-active]:before:visible group-[.is-active]:before:w-full group-[.is-active]:text-primary group-hover:text-primary"
                  onClick={() => onTabChange('settings')}>
                  {t('common.txt_account_setteings')}
                </div>
              </li>
            </ul>
          </nav>

          {selectedTab === 'orders' && (
            <ExpOrders
              isOrderListLoading={isOrderListLoading}
              orderDataResponse={orderData}
            />
          )}

          {(selectedTab === 'settings' || selectedTab === '') && (
            <ExpAccountSettings />
          )}

          {selectedTab === 'address' && <ExpAddresses />}
          {selectedTab === 'messages' && (
            <ExpMessages
              isOrderListLoading={isOrderListLoading}
              orderDataResponse={orderData}
              getOrderData={getOrderData}
            />
          )}
          {selectedTab === 'wishlist' && (
            <ExpWhishLists
              wishListData={wishListData}
              getWishListData={getWishListData}
              isWishListLoading={isWishListLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpMyAccount;
