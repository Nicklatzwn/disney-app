import { charactersActions } from './charactersSlice';

/**
 * Action creator to clear any existing errors in the character state.
 *
 * @returns {ReturnType<typeof charactersActions.clearError>} The action object to clear errors.
 */
export const clearError = (): ReturnType<typeof charactersActions.clearError> => charactersActions.clearError();

/**
 * Action creator to set the currently selected character ID.
 *
 * @param {number} id - The ID of the character to set.
 * @returns {ReturnType<typeof charactersActions.setId>} The action object to set the character ID.
 */
export const setId = (id: number): ReturnType<typeof charactersActions.setId> => charactersActions.setId({ _id: id });

/**
 * Action creator to clear the currently selected character ID.
 *
 * @returns {ReturnType<typeof charactersActions.clearId>} The action object to clear the character ID.
 */
export const clearId = (): ReturnType<typeof charactersActions.clearId> => charactersActions.clearId();
