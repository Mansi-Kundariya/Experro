import { useEffect, useState } from 'react';

import {
  convertCurrency,
} from '../../../utils';
import { AuthService } from 'experro-storefront';

interface ExpProductPriceControllerProps {
  selectedVariant: any;
  productDetails: any;
  selectedModifiers: any;
}

const ExpProductPriceController = (props: ExpProductPriceControllerProps) => {
  const { selectedVariant, productDetails, selectedModifiers } = props;

  let price;
  let salePrice;
  let retailPrice;
  const [defaultCurrency, setDefaultCurrency] = useState<any>({});

  if (
    process.env.REACT_APP_MULTI_CURRENCY_ENABLE === 'true' &&
    defaultCurrency?.currency_exchange_rate
  ) {
    if (!selectedVariant) {
      price = convertCurrency(
        productDetails.price_efi,
        defaultCurrency?.currency_exchange_rate
      );
      salePrice = convertCurrency(
        productDetails.sale_price_efi,
        defaultCurrency?.currency_exchange_rate
      );
      retailPrice = convertCurrency(
        productDetails.retail_price_ef,
        defaultCurrency?.currency_exchange_rate
      );
    } else {
      price = selectedVariant.price
        ? convertCurrency(
            selectedVariant.price,
            defaultCurrency?.currency_exchange_rate
          )
        : convertCurrency(
            productDetails.price_efi,
            defaultCurrency?.currency_exchange_rate
          );

      salePrice = selectedVariant.sale_price
        ? convertCurrency(
            selectedVariant.sale_price,
            defaultCurrency?.currency_exchange_rate
          )
        : convertCurrency(
            productDetails.sale_price_efi,
            defaultCurrency?.currency_exchange_rate
          );

      retailPrice = selectedVariant.retail_price
        ? convertCurrency(
            selectedVariant.retail_price,
            defaultCurrency?.currency_exchange_rate
          )
        : convertCurrency(
            productDetails.retail_price_ef,
            defaultCurrency?.currency_exchange_rate
          );
    }
  } else {
    if (!selectedVariant) {
      price = productDetails.price_efi;
      salePrice = productDetails.sale_price_efi;
      retailPrice = productDetails.retail_price_ef;
    } else {
      price = selectedVariant.price
        ? selectedVariant.price
        : productDetails.price_efi;
      salePrice = selectedVariant.sale_price
        ? selectedVariant.sale_price
        : productDetails.sale_price_efi;
      retailPrice = selectedVariant.retail_price
        ? selectedVariant.retail_price
        : productDetails.retail_price_ef;
    }
  }

  if (!salePrice) {
    if (price > 0) {
      salePrice = price;
    } else if (retailPrice > 0) {
      salePrice = retailPrice;
    }
  }

  if (selectedModifiers) {
    for (const modifierId in selectedModifiers) {
      const optionId = selectedModifiers[modifierId];
      const modifier = productDetails.provider_specific_data_ej?.modifiers.find(
        (modifier: any) => {
          return Number(modifierId) === modifier.id;
        }
      );
      const option = modifier.option_values.find((opt: any) => {
        return opt.id === optionId;
      });
      if (option && option.adjusters && option.adjusters.price) {
        if (option.adjusters.price.adjuster === 'percentage') {
          salePrice =
            salePrice +
            (salePrice * option.adjusters.price.adjuster_value) / 100;
        } else {
          salePrice = salePrice + option.adjusters.price.adjuster_value;
        }
      }
    }
  }

  const displayMSRP =
    retailPrice > 0 && retailPrice !== salePrice && retailPrice !== price;
  const displayWas = price > 0 && salePrice > 0 && salePrice !== price;
  const displayNow =
    (retailPrice > 0 || price > 0) && (displayMSRP || displayWas);
  const displayPrice = !displayNow && salePrice > 0;
  let priceSaved = 0;
  if (salePrice > 0 && price > 0) {
    if (salePrice > 0) {
      priceSaved = retailPrice - salePrice;
    } else {
      // TODO: Change the logic not necessary condition
      priceSaved = retailPrice - price;
    }
  }

  const getCurrencyData = () => {
    const currenyObj = AuthService.getUserDetails()?.defaultCurrency;
    if (currenyObj) {
      setDefaultCurrency(currenyObj);
    }
  };

  /*
  Handling event listners. 
  It manages addEventListner and removeEventListner.
  */
  const initiateEventListners = (
    event: 'addEventListener' | 'removeEventListener'
  ) => {
    document[event]('CURRENCY_UPDATE', () => getCurrencyData());
  };

  useEffect(() => {
    initiateEventListners('addEventListener');
    getCurrencyData();

    return initiateEventListners('removeEventListener');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    defaultCurrency,
    displayPrice,
    priceSaved,
    displayMSRP,
    retailPrice,
    price,
    displayWas,
    displayNow,
    salePrice,
  };
};

export default ExpProductPriceController;
