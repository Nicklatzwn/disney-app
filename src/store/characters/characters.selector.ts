import { EAsyncThunkStatus } from '@/models/reusableEnums';
import { RootState } from '../store';
import { IResponseCharactersData } from '@/models/responseInterfaces';
import { TRequestCharacters } from '@/models/requestInterfaces';

/**
 * Selects all character data from the state.
 * @param {RootState} state - The entire Redux state.
 * @returns {Array<IResponseCharactersData>} - The list of characters.
 */
export const getCharacters = (state: RootState): Array<IResponseCharactersData> => state.characters.data;

/**
 * Checks if characters are currently being loaded.
 * @param {RootState} state - The entire Redux state.
 * @returns {boolean} - True if loading, otherwise false.
 */
export const isCharactersLoading = (state: RootState): boolean => state.characters.loading;

/**
 * Calculates the total number of characters based on the current page and page size.
 * @param {RootState} state - The entire Redux state.
 * @returns {number} - The total count of characters or -1 if not applicable.
 */
export const getCharactersTotalCount = (state: RootState): number =>
  !state.characters.info?.nextPage && state.characters.info?.totalPages
    ? (state.characters.info?.totalPages - 1) * state.characters.params.pageSize + state.characters.data.length
    : -1;

/**
 * Selects the total number of pages for character data.
 * @param {RootState} state - The entire Redux state.
 * @returns {number | undefined} - The total number of pages or undefined.
 */
export const getCharactersTotalPages = (state: RootState): number | undefined => state.characters.info?.totalPages;

/**
 * Selects the current parameters for fetching characters.
 * @param {RootState} state - The entire Redux state.
 * @returns {TRequestCharacters} - The current parameters for fetching characters.
 */
export const getCharactersParams = (state: RootState): TRequestCharacters => state.characters.params;

/**
 * Selects any error message related to character fetching.
 * @param {RootState} state - The entire Redux state.
 * @returns {string | undefined} - The error message or undefined.
 */
export const getError = (state: RootState): string | undefined => state.characters.error;

/**
 * Selects a specific character based on the current ID in the state.
 * @param {RootState} state - The entire Redux state.
 * @returns {IResponseCharactersData | undefined} - The character object or undefined.
 */
export const getCharacter = (state: RootState): IResponseCharactersData | undefined =>
  state.characters.data.find((character) => character._id === state.characters.id);

/**
 * Checks if this is the first request for characters.
 * @param {RootState} state - The entire Redux state.
 * @returns {boolean} - True if it's the first request, otherwise false.
 */
export const isCharactersFirstRequest = (state: RootState): boolean =>
  state.characters.status === EAsyncThunkStatus.IDLE;
