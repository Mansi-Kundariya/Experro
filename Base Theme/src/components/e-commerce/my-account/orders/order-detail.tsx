import ExpOrderDetailController from './order-detail-controller';
import Placeholder from '../../../../assets/images/order-placeholder.png';
import { useTranslation } from 'react-i18next';
import { IconCheck } from '../../../../assets/icons/check';

export interface ExpOrderDetailProps {
  itemData: any;
}

const ExpOrderDetail = (props: ExpOrderDetailProps) => {
  const { itemData } = props;
  const { handleReOrder, isLoading, handleItemSelection, products } =
    ExpOrderDetailController({ itemData });
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
        <div className="flex flex-wrap justify-between">
          <div className="basis-full lg:basis-7/12 account-content account-content-small">
            <h3 className="text-3xl account-heading font-semibold mb-0 pb-2 border-b border-b-solid border-b-neutral-200 m-b-0">
              {t('common.txt_ord_content')}
            </h3>
            <ul className="account-list list-style-none m-b-0">
              <li className="account-listshipping">
                <h5 className="heading-font-16 font-primary font-normal mb-8 text-lg">
                  {t('common.txt_item_shipped_to')}{' '}
                  {itemData?.shipping_addresses[0]?.street_1}
                  &nbsp;
                  {itemData?.shipping_addresses[0]?.street_2},&nbsp;
                  {itemData?.shipping_addresses[0]?.city},&nbsp;
                  {itemData?.shipping_addresses[0]?.state}&nbsp;
                  {itemData?.shipping_addresses[0]?.zip},&nbsp;
                  {itemData?.shipping_addresses[0]?.country}
                </h5>
              </li>

              {!!products.length &&
                products?.map((ele: any, index: number) => (
                  <li className="account-listitem py-4 border-b border-b-solid border-b-neutral-200" key={index.toString()}>
                    <div className="account-product flex items-center relative pl-6">
                      <div className="account-product-checkitem absolute w-4 left-0 top-2/4 -translate-y-2/4">
                        <input
                          type="checkbox"
                          className="form-checkbox peer relative h-4 w-4 cursor-pointer appearance-none border border-neutral-300 transition-all checked:border-neutral-900 checked:border-primary checked:bg-primary group-[.facet-block]:w-full group-[.facet-block]:h-full group-[.facet-block]:opacity-0 group-[.facet-block]:top-0 is-selected "
                          id={`account-prod-${index.toString()}`}
                          onClick={() => {
                            handleItemSelection(ele);
                          }}
                          checked={ele?.isSelected}
                        />
                        <i className="icon absolute text-white transition-opacity opacity-0 pointer-events-none top-[5px] left-[3px]  peer-checked:opacity-100">
                            <IconCheck />
                        </i>
                        <label
                          htmlFor={`account-prod-${index.toString()}`}
                          className="form-label hidden tracking-wider text-neutral-700 pl-2">
                          &nbsp;
                        </label>
                      </div>

                      <div className="account-product-figure w-[4.375rem] min-w-[4.375rem]">
                        <img
                          src={ele?.image ? ele?.image : Placeholder}
                          alt="product-img"
                          title="product-img"
                        />
                      </div>

                      <div className="account-product-body relative pl-5 pr-24 w-[calc(100%_-_4.375rem)]">
                      <span className="account-product-price absolute right-0 top-0">
                          ${Number(ele?.price_inc_tax)?.toFixed(2)}
                        </span>

                        <h5 className="text-base font-primary font-medium uppercase account-product-title mb-1 leading-none">
                          {ele?.quantity} × {ele?.name}
                        </h5>

                        <dl className="definitionlist m-t-10 flex">
                          {ele?.product_options?.map((option: any) => (
                            <>
                              <dt className="prod-definition-key mr-1.5">
                                {option?.display_name}:
                              </dt>
                              <dd className="prod-defination-value">
                                {option?.display_value}
                              </dd>
                            </>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <dl className="account-ordertotal float-right w-full md:w-[60%]">
              <dt className="ordertotal-key float-left py-5">{t('common.txt_subtotal')}:</dt>
              <dd className="ordertotal-value text-right py-5 border-b border-b-solid border-b-neutral-200">
                ${Number(itemData?.subtotal_inc_tax)?.toFixed(2)}
              </dd>
              <dt className="ordertotal-key float-left py-5">Grand Total:</dt>
              <dd className="ordertotal-value text-right py-5 text-xl font-semibold">
                ${Number(itemData?.total_inc_tax)?.toFixed(2)}
              </dd>
            </dl>
          </div>

          <div className="basis-full lg:basis-4/12 account-sidebar">
            <div className="sidebar-block">
            <h3 className="text-3xl account-heading font-semibold pb-2 border-b border-b-solid border-b-neutral-200 mb-5">
                {t('common.txt_ord_details')}
              </h3>
              <dl className="definitionlist mb-7">
                {itemData?.custom_status && (
                  <>
                    <dt className="prod-definition-key float-left mr-2">
                      {t('common.txt_ord_status')}:
                    </dt>
                    <dd className="prod-defination-value">
                      {itemData?.custom_status}
                    </dd>
                  </>
                )}

                {itemData?.date_created && (
                  <>
                    <dt className="prod-definition-key float-left mr-2">
                      {t('common.txt_ord_data')}:
                    </dt>
                    <dd className="prod-defination-value">
                      {new Date(itemData?.date_created)?.toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        }
                      )}
                    </dd>
                  </>
                )}

                {itemData?.total_inc_tax && (
                  <>
                    <dt className="prod-definition-key float-left mr-2">
                      {t('common.txt_ord_total')}:
                    </dt>
                    <dd className="prod-defination-value">
                      ${Number(itemData?.total_inc_tax)?.toFixed(2)}
                    </dd>
                  </>
                )}

                {itemData?.payment_method && (
                  <>
                    <dt className="prod-definition-key float-left mr-2">
                      {t('common.txt_payment_method')}:
                    </dt>
                    <dd className="prod-defination-value">
                      {itemData?.payment_method}
                    </dd>
                  </>
                )}

                {itemData?.payment_status && (
                  <>
                    <dt className="prod-definition-key float-left mr-2">
                      {t('common.txt_payment_status')}:
                    </dt>
                    <dd className="prod-defination-value">
                      {itemData?.payment_status}
                    </dd>
                  </>
                )}
              </dl>
            </div>

            <div className="sidebar-block">
              <h3 className="text-3xl account-heading font-semibold pb-2 border-b border-b-solid border-b-neutral-200 mb-5">
                {t('common.txt_ship_to')}
              </h3>
              <ul className="account-order-address list-style-none mb-7">
                <li>
                  {itemData?.shipping_addresses[0]?.first_name}&nbsp;
                  {itemData?.shipping_addresses[0]?.last_name}
                </li>
                <li>{itemData?.shipping_addresses[0]?.company}</li>
                <li>{itemData?.shipping_addresses[0]?.street_1}</li>
                <li>{itemData?.shipping_addresses[0]?.street_2}</li>
                <li>
                  {itemData?.shipping_addresses[0]?.city},
                  {itemData?.shipping_addresses[0]?.state}
                  {itemData?.shipping_addresses[0]?.zip}
                </li>
                <li>{itemData?.shipping_addresses[0]?.country}</li>
              </ul>
            </div>

            <div className="sidebar-block">
              <h3 className="text-3xl account-heading font-semibold pb-2 border-b border-b-solid border-b-neutral-200 mb-5">
                {t('common.txt_bill_to')}
              </h3>
              <ul className="account-order-address list-style-none mb-7">
                <li>
                  {itemData?.billing_address?.first_name}&nbsp;
                  {itemData?.billing_address?.last_name}
                </li>
                <li>{itemData?.billing_address?.company}</li>
                <li>{itemData?.billing_address?.street_1}</li>
                <li>{itemData?.billing_address?.street_2}</li>
                <li>
                  {itemData?.billing_address?.city},
                  {itemData?.billing_address?.state}&nbsp;
                  {itemData?.billing_address?.zip}
                </li>
                <li>{itemData?.billing_address?.country}</li>
              </ul>
            </div>

            <div className="sidebar-block">
              <h3 className="text-3xl account-heading font-semibold pb-2 border-b border-b-solid border-b-neutral-200 mb-5">
                {t('common.txt_action')}
              </h3>
              <button
                onClick={(e) => handleReOrder(e)}
                className="button button-secondary">
                {t('common.txt_reorder')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpOrderDetail;
