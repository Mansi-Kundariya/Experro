import React from 'react';
import { Link } from 'experro-storefront';
import ExpCartPageController from './cart-page-controller';
import ExpCartLineItem from './cart-line-item';
import ExpLinkParser from '../../../utils/link-parser';
import { convertCurrency, CurrencyFormat } from '../../../utils';
import { IconBreadcrumbarrow } from '../../../assets/icons/breadcrumb-arrow';
import { ExpRecommendationManager } from '../recommendation-manager';
import { useExpCommonCheckout } from '../../../utils';

const ExpCartPage = () => {
  const {
    defaultCurrency,
    coupon,
    couponCode,
    quantityTotal,
    cartObj,
    isLoading,
    isLoadingUpdatedItems,
    showB2bNinjaButton,
    deleteItem,
    setCoupon,
    setCouponCode,
    handleProductQuantityUpdate,
    applyCouponCode,
    removeCouponCode,
    cartToQuote,
    setIsCheckoutLoading,
    isCheckoutLoading,
  } = ExpCartPageController();

  const { onCheckoutClick } = useExpCommonCheckout({ setIsCheckoutLoading });

  return (
    <>
      {isLoading ? (
        <div className="relative flex justify-center items-center h-dvh">
          <div className="w-14 h-14 rounded-full absolute border-2 border-solid border-gray-100"></div>
          <div className="w-14 h-14 rounded-full animate-spin absolute border-2 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : (
        <>
          {cartObj?.line_items?.physical_items?.length > 0 ? (
            <div className="page-body cart-page-template">
              <div className="mt-6 mb-4 lg:mb-12 breadcrumb-section">
                <div className="container">
                  <ul className="flex items-center *:text-sm breadcrumb">
                    <li>
                      <ExpLinkParser
                        to={'/'}
                        className="text-gray-700 hover:text-secondary font-normal">
                        Home
                      </ExpLinkParser>
                    </li>
                    <li className="flex items-center text-secondary font-normal">
                      <span className="mx-1">
                        <i className="flex w-3 h-3 icon">
                          <IconBreadcrumbarrow />
                        </i>
                      </span>
                      Your Cart
                    </li>
                  </ul>
                </div>
              </div>

              <div className="py-8 lg:py-12 page-header-section">
                <div className="container">
                  <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title text-center">
                    Your Cart ({quantityTotal}{' '}
                    {quantityTotal < 2 ? 'Item' : 'Items'})
                  </h1>
                </div>
              </div>

              <div
                className={`cart-table ${
                  isLoadingUpdatedItems ? 'is-loading' : ''
                }`}>
                <div className="container relative">
                  <table className="w-full border-collapse cart">
                    <thead className="hidden lg:block bg-primary cart-header">
                      <tr className="flex">
                        <th
                          className="basis-6/12 text-sm text-white font-bold py-3 px-5 text-left cart-header-item"
                          colSpan={2}>
                          Product
                        </th>
                        <th className="basis-2/12 text-sm text-white font-bold py-3 px-5 text-right cart-header-item">
                          Price
                        </th>
                        <th className="basis-2/12 text-sm text-white font-bold py-3 px-5 text-center cart-header-item">
                          Quantity
                        </th>
                        <th className="basis-2/12 text-sm text-white font-bold py-3 px-5 text-center cart-header-item">
                          Total
                        </th>
                      </tr>
                    </thead>

                    <tbody className="pt-5 lg:pt-0 border-t block border-gray-200 lg:border-t-0 cart-list">
                      {cartObj?.line_items?.physical_items?.map(
                        (item: any, index: number) => (
                          <React.Fragment key={index.toString()}>
                            <ExpCartLineItem
                              isLoadingUpdatedItems={isLoadingUpdatedItems}
                              cartItem={item}
                              deleteItem={deleteItem}
                              changeProductQuantity={
                                handleProductQuantityUpdate
                              }
                              defaultCurrency={defaultCurrency}
                            />
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cart-bottom section-gap">
                <div className="container">
                  <div className="flex flex-wrap justify-end">
                    <div className="basis-full md:basis-8/12 lg:basis-7/12 xl:basis-5/12">
                      <ul className="mb-10 cart-totals">
                        <li className="py-5 flex flex-wrap border-b border-gray-200 cart-total">
                          <p className="flex items-center text-sm font-medium text-secondary basis-6/12 cart-total-label">
                            Subtotal:
                          </p>
                          <p className="basis-6/12 text-right cart-total-value">
                            <CurrencyFormat
                              value={
                                process.env.REACT_APP_MULTI_CURRENCY_ENABLE ===
                                  'true' &&
                                defaultCurrency?.currency_exchange_rate
                                  ? convertCurrency(
                                      cartObj?.base_amount,
                                      defaultCurrency?.currency_exchange_rate
                                    )
                                  : cartObj?.base_amount
                              }
                              thousandSeparator={','}
                              decimalSeparator={'.'}
                              prefixSymbol={
                                process.env.REACT_APP_MULTI_CURRENCY_ENABLE ===
                                  'true' && defaultCurrency?.token
                                  ? defaultCurrency?.token
                                  : '$'
                              }
                            />
                          </p>
                        </li>

                        <li
                          className={`group py-5 flex flex-wrap border-b border-gray-200 cart-total ${
                            coupon ? 'is-expanded' : ''
                          }`}>
                          {!cartObj.coupons.length ? (
                            <>
                              <div className="w-full flex flex-wrap add-coupon-field">
                                <p className="flex items-center text-sm font-medium text-secondary basis-6/12 cart-total-label">
                                  Coupon Code:
                                </p>
                                <div className="basis-6/12 text-sm text-right cart-total-value">
                                  <button
                                    className="coupon-code-add"
                                    onClick={() => setCoupon(!coupon)}>
                                    <span className="underline text-gray-900 hover:text-secondary group-[.is-expanded]:hidden open-form">
                                      Add Coupon
                                    </span>
                                    <span className="hidden group-[.is-expanded]:flex underline label-cancel">
                                      Cancel
                                    </span>
                                  </button>
                                </div>
                              </div>

                              <div className="hidden group-[.is-expanded]:block mt-4 w-full coupon-form">
                                <form
                                  action=""
                                  onSubmit={applyCouponCode}
                                  className="flex flex-wrap -mx-2">
                                  <div className="px-2 basis-full md:basis-8/12 lg:basis-9/12 form-field">
                                    <input
                                      onChange={(e) =>
                                        setCouponCode(e.target.value)
                                      }
                                      value={couponCode}
                                      type="text"
                                      className="form-input form-input-large"
                                      placeholder="Enter your coupon code"
                                      name="Add Coupon"
                                    />
                                  </div>

                                  <div className="mt-3 lg:mt-0 px-2 basis-full md:basis-4/12 lg:basis-3/12 form-submit">
                                    <button
                                      type="submit"
                                      className="button-primary button-large w-full">
                                      <div>Apply</div>
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </>
                          ) : (
                            <div className="flex add-coupon-field">
                              <div className="cart-total-label">
                                <strong>
                                  Coupon (
                                  {cartObj?.coupons &&
                                    cartObj?.coupons[0]?.code}
                                  )
                                </strong>
                                <div onClick={removeCouponCode}>Remove</div>
                              </div>

                              <div className="cart-total-value">
                                <span>
                                  -
                                  {cartObj?.coupons && (
                                    <CurrencyFormat
                                      value={
                                        process.env
                                          .REACT_APP_MULTI_CURRENCY_ENABLE ===
                                          'true' &&
                                        defaultCurrency?.currency_exchange_rate
                                          ? convertCurrency(
                                              cartObj?.coupons[0]
                                                ?.discounted_amount,
                                              defaultCurrency?.currency_exchange_rate
                                            )
                                          : cartObj?.coupons[0]
                                              ?.discounted_amount
                                      }
                                      thousandSeparator={','}
                                      decimalSeparator={'.'}
                                      prefixSymbol={
                                        process.env
                                          .REACT_APP_MULTI_CURRENCY_ENABLE ===
                                          'true' && defaultCurrency?.token
                                          ? defaultCurrency?.token
                                          : '$'
                                      }
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                          )}
                        </li>

                        <li className="py-5 flex flex-wrap border-b border-gray-200 cart-total">
                          <p className="flex items-center text-sm font-medium text-secondary basis-6/12 cart-total-label">
                            Grand total:
                          </p>
                          <p className="basis-6/12 text-right font-bold text-gray-900 cart-total-value">
                            <CurrencyFormat
                              value={
                                process.env.REACT_APP_MULTI_CURRENCY_ENABLE ===
                                  'true' &&
                                defaultCurrency?.currency_exchange_rate
                                  ? convertCurrency(
                                      cartObj?.cart_amount ||
                                        cartObj?.cart_amount_ex_tax,
                                      defaultCurrency?.currency_exchange_rate
                                    )
                                  : cartObj?.cart_amount ||
                                    cartObj?.cart_amount_ex_tax
                              }
                              thousandSeparator={','}
                              decimalSeparator={'.'}
                              prefixSymbol={
                                process.env.REACT_APP_MULTI_CURRENCY_ENABLE ===
                                  'true' && defaultCurrency?.token
                                  ? defaultCurrency?.token
                                  : '$'
                              }
                            />
                          </p>
                        </li>
                      </ul>

                      <div className="flex -mx-2 cart-actions">
                        {process.env.REACT_APP_B2B_NINJA_APP_ENABLE ===
                          'true' &&
                          showB2bNinjaButton && (
                            <div className="px-2 basis-6/12">
                              <button
                                onClick={cartToQuote}
                                className="button-secondary button-large w-full">
                                Cart to Quote
                              </button>
                            </div>
                          )}
                        <div
                          className={`px-2 ${
                            process.env.REACT_APP_B2B_NINJA_APP_ENABLE ===
                            'true'
                              ? 'basis-6/12'
                              : 'basis-full'
                          }`}>
                          {/* <Link
                            to={'/checkout/'}
                            className="button-primary button-large w-full">
                            Checkout
                          </Link> */}
                          <button
                            disabled={isCheckoutLoading}
                            onClick={() => onCheckoutClick()}
                            className="button-primary button-large w-full">
                            {isCheckoutLoading ? (
                              <div className="min-h-12 relative flex justify-center items-center ml-4">
                                <div className="w-3 h-3 rounded-full absolute border-2 border-solid border-primary"></div>
                                <div className="w-3 h-3 rounded-full animate-spin absolute border-2 border-solid border-gray-50 border-t-transparent"></div>
                              </div>
                            ) : (
                              'Checkout'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ExpRecommendationManager location={'Cart Page'} pageData={''} />
            </div>
          ) : (
            <div className="page-body mt-8">
              <div className="py-8 lg:py-11 text-center page-header-section">
                <div className="container">
                  <h1 className="text-2xl lg:text-4xl text-secondary font-secondary page-title page-title">
                    Your Cart is Empty
                  </h1>
                </div>
              </div>
              <div className="page-content">
                <div className="container">
                  <p className="text-center text-sm">
                    <Link
                      to="/"
                      className="underline text-gray-900 transition-colors hover:text-secondary">
                      Click here to continue shopping
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExpCartPage;
