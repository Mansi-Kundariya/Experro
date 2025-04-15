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

export function responseParseByPath(response: any) {
  // Extracts the `_json_fields_` meta information or defaults to an empty array
  const metaFields = response?.data?.Data?._meta_ || {};
  const { _json_fields_ } = metaFields;

  // Splits the `metaFields` values into arrays of paths
  const pathArray =
    _json_fields_?.length > 0
      ? _json_fields_.map((item: any) => item.split(','))
      : [];

  const parsedResponse = {
    data: {
      ...response.data,
      Data: {
        ...response.data?.Data,
        metaFields,
        // Applies JSON parsing to each item in the `items` array based on `pathArray`
        items: response.data?.Data?.items?.map((item: any) =>
          parseFields(item, pathArray)
        ),
      },
    },
  };

  return parsedResponse;
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

function parseFields(data: any, pathArray: any) {
  if (!data || !pathArray) return data;

  pathArray.forEach((path: any) => {
    const current = data;
    for (let i = 0; i < path.length; i++) {
      const key = path[i];

      // Attempts to parse JSON strings at the specified path
      if (typeof current?.[key] === 'string') {
        try {
          current[key] = JSON.parse(current[key]);
        } catch (error) {
          console.error(
            `Failed to parse JSON at path: ${path.join(',')}`,
            error
          );
        }
      } else if (typeof current?.[key] === 'object') {
        if (Array.isArray(current?.[key])) {
          current?.[key].forEach((item: any, index: number) => {
            if (typeof item === 'string') {
              current[key][index] = safelyParseJSON(item); // Replace the original string with the parsed value
            }
            // If the item is an object, process its nested paths recursively
            else if (typeof item === 'object') {
              // Remove the first key for recursive processing

              const newPath = [...path];
              if (newPath?.length > 0) {
                newPath.splice(0, 1);
              }
              parseFields(item, [newPath]); // Recursive call
            }
          });
        }
      }
    }
  });

  return data;
}

// Safely parses JSON strings, returning the original value on failure
function safelyParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return jsonString;
  }
}
