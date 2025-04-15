/**
 * Parses and processes data from the provided response object based on the given field key.
 *
 * @param {any} response - The response object containing data to be parsed.
 * @param {string} field_key - The key to identify the specific field to process in the response.
 *
 * The function works as follows:
 * 1. Extracts the field data from the response object by traversing the `_meta_` property within `response.data.Data`.
 * 2. Maps the field values (comma-separated strings) into an array of arrays (`pathArray`).
 * 3. Processes the parsed data based on the `field_key`:
 *    - If `field_key` is `_json_fields_`, it parses JSON fields in `items` using the paths in `pathArray`.
 *    - If `field_key` is `_media_fields_`, it parses media fields in the main `Data` object using `pathArray`.
 * 4. Uses a helper function `jsonParseByPath` to perform the actual parsing based on the path array.
 *
 * if _meta_?._json_fields_=['a','b,c']
 * then pathArray becomes [['a'],['b','c']]
 *
 */

export function responseParseByPath(response: any, field_key: string) {
  const pathArray =
    response.data?.Data?._meta_ &&
    response.data?.Data?._meta_?.[field_key]?.length > 0
      ? response.data?.Data?._meta_?.[field_key]?.map((item: any) => {
          return item.split(',');
        })
      : [];

  if (pathArray?.length > 0) {
    if (field_key === '_json_fields_') {
      response.data?.Data?.items?.length
        ? response.data?.Data?.items?.map((item: any) => {
            jsonParseByPath(item, pathArray);
          })
        : jsonParseByPath(response?.data?.Data, pathArray);
    } else if (field_key === '_media_fields_') {
      jsonParseByPath(response?.data?.Data, pathArray);
    }
  }
}

/**
 * Parses JSON strings within a nested object or array based on specified paths.
 * @param data - The object or array containing data that may need to be parsed.
 * @param pathArray - An array of paths where each path is an array of keys indicating the nested structure.
 * @description
 * This function navigates through the given `data` using the paths defined in `pathArray`.
 * If it encounters a string at the specified path, it attempts to parse it as JSON.
 * If parsing fails, the string remains unchanged. For arrays, the function recursively parses nested items.
 * @example
 * const data = {
 *   a: '{"key": "value"}',
 *   b: [{ c: '{"nested": "data"}' }],
 * };
 * const pathArray = [['a'], ['b', 'c']];
 * jsonParseByPath(data, pathArray);
 * // Result: data = { a: { key: "value" }, b: [{ c: { nested: "data" } }] }
 */

export function jsonParseByPath(data: any, pathArray: any) {
  // Iterate through each path in the pathArray
  pathArray?.map((path: any) => {
    for (let i = 0; i < path?.length; i++) {
      // If the current value is a string, attempt to parse it as JSON
      if (typeof data?.[path[i]] === 'string') {
        try {
          data[path[i]] = JSON.parse(data?.[path[i]]);
        } catch (error) {
          console.error(error); // Log errors but keep the original value
        }
        // If the current value is an object or array, process recursively
      } else if (typeof data?.[path[i]] === 'object') {
        if (Array.isArray(data?.[path[i]])) {
          data?.[path[i]].forEach((item: any, index: number) => {
            if (typeof item === 'string') {
              let parsedItem: any;
              try {
                parsedItem = JSON.parse(item);
              } catch (error) {
                parsedItem = item; // Keep the original item if parsing fails
              }
              data[path[i]][index] = parsedItem; // Replace the original string with the parsed value
            }
            // If the item is an object, process its nested paths recursively
            else if (typeof item === 'object') {
              // Remove the first key for recursive processing

              const newPath = [...path];
              if (newPath?.length > 0) {
                newPath.splice(0, 1);
              }
              jsonParseByPath(item, [newPath]); // Recursive call
            }
          });
        }
      }
    }
  });
}
