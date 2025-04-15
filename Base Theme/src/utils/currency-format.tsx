interface CurrencyFormatProps {
  value: number;
  thousandSeparator: string;
  decimalSeparator: string;
  prefixSymbol: string;
}

/**
 * Formats a numeric value as a currency string.
 * @param props - The currency format props.
 * @returns The formatted currency value as a React JSX element.
 */
function CurrencyFormat({
  value,
  thousandSeparator,
  decimalSeparator,
  prefixSymbol,
}: CurrencyFormatProps) {
  const separator = `$1${thousandSeparator}`;
  if (!value) {
    value = 0;
  }

  const formatedValue =
    prefixSymbol +
    value
      .toFixed(2)
      .replace('.', decimalSeparator)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, separator);

  return <>{formatedValue}</>;
}

export default CurrencyFormat;
