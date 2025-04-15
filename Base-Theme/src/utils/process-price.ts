/**
 * Calculates and returns the final sale price for a product, taking into account selected variants and modifiers.
 * @param productDetails - The details of the product.
 * @param selectedVariant - The selected variant of the product.
 * @param selectedModifiers - The selected modifiers for the product.
 * @returns Final sale price of the product.
 */
const processPrice = (
  productDetails: any,
  selectedVariant: any,
  selectedModifiers: any
) => {
  let price; // Default Price
  let salePrice; // Sales Price
  let retailPrice; // Retail Price
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

  if (salePrice === 0) {
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
  return salePrice;
};

export default processPrice;
