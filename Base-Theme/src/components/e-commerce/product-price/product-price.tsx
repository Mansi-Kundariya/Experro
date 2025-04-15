import ExpProductPriceController from "./product-price-controller";
import { CurrencyFormat } from "../../../utils";

interface ExpProductPriceProps {
  productDetails?: any;
  selectedVariant?: any;
  selectedModifiers?: any;
  salePriceClassName?: string;
  retailPriceClassName?: string;
  defaultPriceClassName?: string;
}

const ExpProductPrice = (props: ExpProductPriceProps) => {
  const {
    productDetails,
    selectedVariant,
    selectedModifiers,
    defaultPriceClassName,
    retailPriceClassName,
    salePriceClassName,
  } = props;

  const {
    defaultCurrency,
    displayPrice,
    priceSaved,
    displayMSRP,
    retailPrice,
    price,
    displayWas,
    displayNow,
    salePrice,
  } = ExpProductPriceController({
    productDetails,
    selectedModifiers,
    selectedVariant,
  });

  return (
    <div className="price-section">
      {displayMSRP && (
        <div className="price-item price-section--withoutTax rrp-price--withoutTax hidden">
          <strong className="price-label hidden">MSRP:</strong>
          <span className={`price price--rrp ${retailPriceClassName}`}>
            <CurrencyFormat
              value={retailPrice}
              thousandSeparator={","}
              decimalSeparator={"."}
              prefixSymbol={
                process.env.REACT_APP_MULTI_CURRENCY_ENABLE === "true" &&
                defaultCurrency?.token
                  ? defaultCurrency?.token
                  : "$"
              }
            />
          </span>
        </div>
      )}

      {displayWas && (
        <div className="price-item price-section--withoutTax non-sale-price--withoutTax">
          <strong className="price-label hidden">Was:</strong>
          <span className={`price price--non-sale line-through ${defaultPriceClassName}`}>
            <CurrencyFormat
              value={price}
              thousandSeparator={","}
              decimalSeparator={"."}
              prefixSymbol={
                process.env.REACT_APP_MULTI_CURRENCY_ENABLE === "true" &&
                defaultCurrency?.token
                  ? defaultCurrency?.token
                  : "$"
              }
            />
          </span>
        </div>
      )}

      <div
        className="price-item price-section--withoutTax"
        itemProp="offers"
        itemScope
        itemType="http://schema.org/Offer"
      >
        {displayPrice && (
          <strong className="price-label hidden" suppressHydrationWarning>
            Price:
          </strong>
        )}
        {displayNow && <strong className="price-label hidden">Now:</strong>}

        <span className={`price price--withoutTax ${salePriceClassName}`}>
          <CurrencyFormat
            value={salePrice}
            thousandSeparator={","}
            decimalSeparator={"."}
            prefixSymbol={
              process.env.REACT_APP_MULTI_CURRENCY_ENABLE === "true" &&
              defaultCurrency?.token
                ? defaultCurrency?.token
                : "$"
            }
          />
        </span>
      </div>

      {priceSaved > 0 && (
        <div className="price-section--saving price price-section-saving">
          <span className="price hidden"> (You save </span>
          <span className="price price--saving">
            <CurrencyFormat
              value={priceSaved}
              thousandSeparator={","}
              decimalSeparator={"."}
              prefixSymbol={
                process.env.REACT_APP_MULTI_CURRENCY_ENABLE === "true" &&
                defaultCurrency?.token
                  ? defaultCurrency?.token
                  : "$"
              }
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default ExpProductPrice;
