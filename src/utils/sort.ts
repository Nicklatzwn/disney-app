import { TOrder } from '@/models/reusableTypes';

/**
 * Sorts an array of objects based on a specified property and order.
 *
 * This utility function sorts an array of objects in either ascending or
 * descending order based on the specified key. The sorting is done using
 * `localeCompare` to ensure proper string comparison.
 *
 * @template T - The type of objects in the array.
 * @template K - The key type of the property to sort by, constrained to the keys of T.
 * @param {T[]} array - The array of objects to be sorted.
 * @param {TOrder} order - The order to sort by, either 'asc' for ascending or 'desc' for descending.
 * @param {K} orderBy - The property key to sort the objects by.
 * @returns {T[]} A new array sorted based on the specified property and order.
 */
export const sortArray = <T, K extends keyof T>(array: T[], order: TOrder, orderBy: K): T[] => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return String(a[orderBy]).localeCompare(String(b[orderBy]));
    } else {
      return String(b[orderBy]).localeCompare(String(a[orderBy]));
    }
  });
};
