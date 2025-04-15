/**
 * Generates a query based on the provided filter suffix, internal field name, and filter value to get products list.
 * @param filterSuffix - The suffix of the filter.
 * @param internalFieldName - The internal field name.
 * @param filterValue - The value of the filter.
 * @returns Generated query.
 */
function generateQuery(
  filterSuffix: any,
  internalFieldName: any,
  filterValue: any
) {
  if (internalFieldName === 'sku_esi') internalFieldName = 'variant_skus_esai';
  switch (filterSuffix) {
    case 'contains': {
      return `${internalFieldName}: ${filterValue}`;
    }
    case 'does_not_contains': {
      return `-${internalFieldName}: ${filterValue}`;
    }
    case 'equal_to': {
      return `${internalFieldName}: (${filterValue
        .map((i: any) => `"${i}"`)
        .join(' ')})`;
    }
    case 'not_equal_to': {
      return `-${internalFieldName}: (${filterValue
        .map((i: any) => `"${i}"`)
        .join(' ')})`;
    }
    case 'greater_than': {
      return `${internalFieldName}: [${+filterValue + 1} TO *]`;
    }
    case 'greater_than_or_equal_to': {
      return `${internalFieldName}: [${+filterValue} TO *]`;
    }
    case 'less_than': {
      return `${internalFieldName}: [* TO ${+filterValue - 1}]`;
    }
    case 'less_than_or_equal_to': {
      return `${internalFieldName}: [* TO ${+filterValue}]`;
    }
    default: {
      return `${internalFieldName}: ${filterValue}`;
    }
  }
}

export default generateQuery;
