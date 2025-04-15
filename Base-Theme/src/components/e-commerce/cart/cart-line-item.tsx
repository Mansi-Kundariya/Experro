import React from 'react';
import { CommonUtilities, Link } from 'experro-storefront';
import { IconAdd } from '../../../assets/icons/add';
import { IconCross } from '../../../assets/icons/cross';
import { IconMinus } from '../../../assets/icons/minus-2';
import { convertCurrency, CurrencyFormat } from '../../../utils';

export interface ExpCartLineItemProps {
  cartItem: any;
  deleteItem: any;
  changeProductQuantity: any;
  isLoadingUpdatedItems: boolean;
  defaultCurrency?: any;
}

const ExpCartLineItem = (props: ExpCartLineItemProps) => {
  const {
    deleteItem,
    cartItem,
    changeProductQuantity,
    isLoadingUpdatedItems,
    defaultCurrency,
  } = props;

  let itemUrl: any = cartItem?.url
    .replace('https://', '')
    .split('/')
    .splice(1)
    .join('/');

  if (CommonUtilities.getEnvironmentType() !== 'PRODUCTION') {
    itemUrl = `${CommonUtilities.getStoreHash()}/${itemUrl}`;
  }

  return (
    <tr className="relative first:mt-0 mt-5 lg:mt-0 pl-24 lg:pl-0 border-b border-gray-200 flex flex-wrap cart-item">
      <td className="-ml-24 lg:-ml-0 p-0 lg:py-6 basis-[96px] lg:basis-1/12 flex cart-item-block cart-item-figure">
        <div className="pr-5 lg:pr-0  flex justify-center items-center w-full h-28 cart-img-bg">
          <Link
            to={`/${itemUrl}`}
            className="flex justify-center w-full h-full">
            <img
              src={cartItem.image_url}
              alt={cartItem?.name}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>
      </td>

      <td className="p-0 pr-8 lg:pr-0 lg:p-6 basis-full lg:basis-5/12 cart-item-block cart-item-title">
        <h4 className="text-base font-secondary hover:text-gray-900 mb-3 cart-item-name">
          <Link to={`/${itemUrl}`}>{cartItem?.name}</Link>
        </h4>

        <dl className="text-xs text-gray-900 definitionList">
          {cartItem.options &&
            cartItem.options.map((option: any, index: number) => (
              <React.Fragment key={index?.toString()}>
                <dt className="text-black float-left font-normal mr-3 definitionList-key">
                  {option.name}:
                </dt>
                <dd className="mb-1 definitionList-value">{option.value}</dd>
              </React.Fragment>
            ))}

          <dd className="definitionList-value" data-sku-product-id="111564">
            <span data-parent-sku="">
              {cartItem.product_sku
                ? `${cartItem.product_sku} / ${cartItem.sku}`
                : cartItem.sku}
            </span>
          </dd>
        </dl>
      </td>

      <td className="p-0 pt-3 lg:pt-0 lg:p-6 basis-full md:basis-4/12 lg:basis-2/12 text-right flex items-center justify-start lg:justify-end">
        <span className="text-left min-w-24 lg:min-w-full lg:hidden mb-0 cart-item-label form-label">
          Price
        </span>
        <p className="mb-0 text-sm text-gray-900 font-normal">
          <CurrencyFormat
            value={
              process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
              defaultCurrency?.currency_exchange_rate
                ? convertCurrency(
                    cartItem?.sale_price,
                    defaultCurrency?.currency_exchange_rate
                  )
                : cartItem?.sale_price
            }
            thousandSeparator={','}
            decimalSeparator={'.'}
            prefixSymbol={
              process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
              defaultCurrency?.token
                ? defaultCurrency?.token
                : '$'
            }
          />
        </p>
      </td>

      <td className="p-0 pt-3 lg:pt-0 lg:py-6 basis-full md:basis-4/12 lg:basis-2/12 flex items-center justify-start lg:justify-center">
        <label
          className="text-left min-w-24 lg:min-w-full lg:hidden mb-0 form-label cart-item-label"
          htmlFor="qty">
          Quantity:
        </label>
        <div className="max-w-28 relative form-increment">
          <button
            disabled={cartItem.quantity === 1 || isLoadingUpdatedItems}
            className={`absolute top-2/4 left-0 -translate-y-[50%] flex items-center justify-center w-8 h-full border-0 z-[2] ${
              cartItem.quantity === 1 ? 'cursor-not-allowed opacity-60' : ''
            } button-decrease`}
            onClick={changeProductQuantity.bind(this, 'dec', cartItem)}>
            <i className="w-4 h-4 icon [&>svg]:stroke-primary">
              <IconMinus />
            </i>
          </button>
          <input
            type="tel"
            id="qty"
            value={cartItem.quantity}
            min={1}
            readOnly
            className="py-2 lg:py-[13px] text-center form-input form-input-large text-primary border-secondary text-base px-8 form-input--incrementTotal cart-item-qty-input"
          />
          <button
            disabled={isLoadingUpdatedItems}
            className="absolute top-2/4 right-0 -translate-y-[50%] flex items-center justify-center w-8 h-full border-0 z-[2] button-increase"
            onClick={changeProductQuantity.bind(this, 'inc', cartItem)}>
            <i className="w-4 h-4 icon [&>svg]:stroke-primary">
              <IconAdd />
            </i>
          </button>
        </div>
      </td>

      <td className="pt-3 pb-6 lg:py-6 basis-full md:basis-4/12 lg:basis-2/12 flex items-center justify-start lg:justify-center text-center static lg:relative">
        <span className="text-left min-w-24 lg:min-w-full lg:hidden mb-0 cart-item-label form-label">
          Total
        </span>
        <strong className="mb-0 text-black lg:p-5 font-medium text-sm cart-item-value ">
          <CurrencyFormat
            value={
              process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
              defaultCurrency?.currency_exchange_rate
                ? convertCurrency(
                    cartItem?.extended_list_price,
                    defaultCurrency?.currency_exchange_rate
                  )
                : cartItem?.extended_list_price
            }
            thousandSeparator={','}
            decimalSeparator={'.'}
            prefixSymbol={
              process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
              defaultCurrency?.token
                ? defaultCurrency?.token
                : '$'
            }
          />
        </strong>

        <div className="top-0 lg:top-auto group w-6 h-6 absolute right-0 cursor-pointer cart-remove">
          <i
            className="rounded-full p-2 w-6 h-6 transition-all inline-block align-middle [&>svg]:stroke-black group-hover:bg-primary group-hover:[&>svg]:stroke-white icon"
            onClick={deleteItem.bind(this, cartItem)}>
            <IconCross />
          </i>
        </div>
      </td>
    </tr>
  );
};

export default ExpCartLineItem;
