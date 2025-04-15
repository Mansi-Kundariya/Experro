/**
 * Converts the given amount to a different currency using the provided conversion rate.
 * @param amount - The amount to be converted.
 * @param conversionRate - The conversion rate to apply.
 * @returns The converted amount, or undefined if an error occurs.
 */
export function convertCurrency(amount: any, conversionRate: any) {
  try {
    if (amount) {
      const convertedAmount: any = amount * conversionRate;
      return convertedAmount;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

/**
 * Converts the given amount from a different currency to the base currency using the provided conversion rate.
 * @param amount - The amount to be converted.
 * @param conversionRate - The conversion rate to apply.
 * @returns Converted amount, or undefined if an error occurs.
 */
export function convertToBaseCurrency(amount: any, conversionRate: any) {
  try {
    if (amount) {
      const convertedAmount: number = amount / conversionRate;
      return convertedAmount;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
