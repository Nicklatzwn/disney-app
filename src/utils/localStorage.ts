type StorageValue = string | number | boolean | object | bigint;

/**
 * Smartly reads a value from localStorage.
 *
 * This function attempts to retrieve a value from localStorage by its name.
 * If the value is found and can be parsed, it returns the parsed value.
 * If the value is not found, it returns a specified default value.
 *
 * @param {string} name - The name of the item in localStorage.
 * @param {unknown} [defaultValue=''] - The default value to return if the item is not found.
 * @returns {StorageValue} The value retrieved from localStorage or the default value.
 */
export function localStorageGet(name: string, defaultValue: unknown = ''): StorageValue {
  const valueFromStore = localStorage.getItem(name);
  if (valueFromStore === null) return defaultValue as StorageValue;
  const jsonParsed = JSON.parse(valueFromStore);
  return ['string', 'number', 'boolean', 'boolean', 'bigint', 'object'].includes(typeof jsonParsed)
    ? jsonParsed
    : valueFromStore;
}

/**
 * Smartly writes a value into localStorage.
 *
 * This function converts the provided value to a string and stores it in
 * localStorage. If the value is an object, it is serialized to JSON.
 * Undefined values are not stored.
 *
 * @param {string} name - The name of the item to store in localStorage.
 * @param {unknown} value - The value to be stored in localStorage.
 * @returns {void}
 */
export function localStorageSet(name: string, value: unknown): void {
  if (typeof value === 'undefined') return;
  const valueAsString = typeof value === 'object' ? JSON.stringify(value) : String(value);
  return localStorage.setItem(name, valueAsString);
}

/**
 * Deletes a value by name from localStorage.
 *
 * If a name is specified, the corresponding item is removed from localStorage.
 * If the name is empty, the entire localStorage is cleared.
 *
 * @param {string} name - The name of the item to remove from localStorage.
 * @returns {void}
 */
export function localStorageDelete(name: string): void {
  return name ? localStorage.removeItem(name) : localStorage.clear();
}
