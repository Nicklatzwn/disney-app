/**
 * Filters out undefined or falsy values from the provided parameters object.
 *
 * This utility function takes an object and returns a new object that
 * only includes entries where the value is truthy. This is useful for
 * cleaning up query parameters before making API requests.
 *
 * @template T - The type of the input parameters object.
 * @param {T} params - The object containing parameters to be filtered.
 * @returns {Partial<T>} A new object with only the entries that have truthy values.
 */
export const filterParams = <T>(params?: T): Partial<T> => {
  return Object.fromEntries(Object.entries(params || {}).filter(([_, value]) => !!value)) as Partial<T>;
};
