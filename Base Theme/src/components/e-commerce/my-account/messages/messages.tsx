import ExpMessagesController from './messages-controller';
import { getFormattedDateTime } from '../../../../utils';
import { useTranslation } from 'react-i18next';
import React from 'react';
interface ExpMessagesProps {
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
  getOrderData: any;
}
const ExpMessages = (props: ExpMessagesProps) => {
  const { isOrderListLoading, orderDataResponse, getOrderData } = props;
  const { userDetail } = ExpMessagesController(getOrderData);
  const { t } = useTranslation();

  return (
    <>
      {isOrderListLoading ? (
        <div
          className={`loading-section ${isOrderListLoading ? 'is-loading' : ''
            }`}>
          <div className="loader-wrapper">
            <div className="loader-icon flex" />
          </div>
        </div>
      ) : (
        <>
          {orderDataResponse?.Status === 'success' && (
            <>
              <p className="text-2xl font-secondary pb-3 mb-6 border-b border-gray-200 account-heading">{t('common.txt_message')}</p>
              <ul className="account-list">
                {orderDataResponse?.Data?.orders?.length &&
                  orderDataResponse?.Data?.orders?.map((order: any) =>
                    order?.messages?.map((message: any, index: number) => (
                      <React.Fragment key={index.toString()}>
                        <li className="account-listItem border-b border-gray-200 py-5 relative">
                          <div className="account-message">
                            <div className="account-orderStatus text-right float-right">
                              <span className="text-gray-900 text-sm">
                                {getFormattedDateTime(message?.date_created)}
                              </span>
                            </div>
                            <h5 className="account-product-title is-read mb-1 text-gray-600 font-medium uppercase text-base">
                              {message?.subject}
                            </h5>
                            <p className="is-read mb-6 text-gray-600 text-sm">
                              <span>
                                {message?.type === 'customer' && 'You said:'}
                                {message?.message}
                              </span>
                            </p>
                          </div>
                        </li>
                      </React.Fragment>
                    ))
                  )}
              </ul>
            </>
          )}
        </>
      )}
      <iframe
        src={`${userDetail?.ecommStoreBaseUrl}/account.php?action=inbox`}
        className="my-account-iframe"
        style={{ minHeight: '800px' }}
        title="My-Account"
        id="my-account-page"
        height="0"
        width="100%"></iframe>
    </>
  );
};

export default ExpMessages;
