import { combineReducers } from 'redux';
import { charactersReducer } from './characters/charactersSlice';

/**
 * Root reducer for the Redux store.
 *
 * This combines all individual reducers into a single root reducer
 * for managing the overall state of the application. Currently,
 * it includes the characters slice for handling character-related state.
 *
 * @constant {Function} rootReducer
 */
const rootReducer = combineReducers({
  characters: charactersReducer,
});

/**
 * Exports the root reducer for use in the Redux store.
 *
 * @returns {Function} The combined reducer function.
 */
export default rootReducer;
