import ExpOrderDetail from './order-detail';
import ExpOrdersController from './orders-controller';
import Placeholder from '../../../../assets/images/order-placeholder.png';
import { IconWarning } from '../../../../assets/icons/warning-icon';
import { useTranslation } from 'react-i18next';

interface ExpOrdersProps {
  isOrderListLoading: boolean;
  orderDataResponse: {
    Status: string;
    Data: {
      meta: {
        total: Number;
        totalPages: Number;
      };
      orders: [];
    };
  };
}
const ExpOrders = (props: ExpOrdersProps) => {
  const { isOrderListLoading, orderDataResponse } = props;

  const {
    ordersData,
    isLoading,
    isDetailPageVisible,
    handleDetailPage,
    itemData,
  } = ExpOrdersController(isOrderListLoading, orderDataResponse);
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <div className={`loading-section ${isLoading ? 'is-loading' : ''}`}>
          <div className="loader-wrapper">
            <div className="loader-icon flex" />
          </div>
        </div>
      ) : (
        <>
          {isDetailPageVisible ? (
            <ExpOrderDetail itemData={itemData} />
          ) : (
            <>
              {!!ordersData?.length ? (
                <div className="account-body">
                  <div className="account-content">
                    <h5 className="account-heading mb-4">
                      {t('common.txt_orders')}
                    </h5>

                    <ul className="account-list list-style-none mb-5">
                      {!!ordersData.length &&
                        ordersData?.map((item: any, index: number) => (
                          <li
                            className="account-listitem py-5 border-t border-t-solid border-t-neutral-200 last:border-b last:border-b-solid last:border-b-neutral-200"
                            key={index.toString()}>
                            <div className="account-product flex">
                              <div className="account-product-figure w-[4.37rem] min-w-[4.37rem] float-left">
                                <img
                                  src={
                                    item?.products[0].image
                                      ? item?.products[0].image
                                      : Placeholder
                                  }
                                  alt="product-img"
                                  title="product-img"
                                />
                              </div>

                              <div className="account-product-body relative w-full pl-6 pb-8 mf:pb-0">
                                <div className="ac-orderstatus text-right absolute bottom-0 left-6 md:static md:float-right">
                                  <h6 className="account-orderstatus-label mb-2 font-primary font-normal bg-neutral-300 text-xs px-2 py-1 text-black">
                                    {item?.custom_status}
                                  </h6>
                                </div>

                                <h5 className="account-product-title text-base cursor-pointer font-semibold mb-2 leading-none">
                                  <span onClick={() => handleDetailPage(item)}>
                                    {t('common.txt_order')} #{item?.id}
                                  </span>
                                </h5>
                                {item?.products && item?.total_inc_tax ? (
                                  <>
                                    <p className="account-product-description text-sm mb-6">
                                      {item?.products && item?.products?.length}{' '}
                                      {t('common.txt_product_totaling')} $
                                      {Number(item?.total_inc_tax)?.toFixed(2)}
                                    </p>
                                  </>
                                ) : (
                                  ''
                                )}

                                <div className="flex flex-wrap -mx-4 account-product-details">
                                  <div className="px-4 basis-full mb-4 md:mb-0 md:basis-3/12 lg:basis-2/12 account-product-detail">
                                    <h6 className="account-product-detail-heading font-primary text-xs font-semibold mb-1 text-gray-900">
                                      {t('common.txt_order_placed')}
                                    </h6>
                                    <span className='text-sm text-gray-900'>
                                      {new Date(
                                        item?.date_created
                                      )?.toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                      })}
                                    </span>
                                  </div>

                                  <div className="px-4 mb-4 md:mb-0 basis-full md:basis-3/12 lg:basis-2/12 account-product-detail">
                                    <h6 className="account-product-detail-heading font-primary text-xs font-semibold mb-1 text-gray-900">
                                      {t('common.txt_last_update')}
                                    </h6>
                                    <span className='text-sm text-gray-900'>
                                      {new Date(
                                        item?.date_created
                                      )?.toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="alertbox p-4 table my-8 mx-auto bg-neutral-100">
                  <div className="alertbox-icon table-cell pr-5">
                  <i className="icon inline-block align-middle min-w-6">
                      <IconWarning />
                    </i>
                  </div>

                  <p className="alertbox-message font-bold mb-0">
                    {t('common.txt_ord_msg')}
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ExpOrders;
