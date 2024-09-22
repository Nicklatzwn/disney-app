import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers';
/**
 * Configures the Redux store for the application.
 *
 * This file sets up the Redux store using the rootReducer.
 *
 * @constant {Object} store - The configured Redux store.
 */
const store = configureStore({
  reducer: rootReducer,
});

/**
 * Type representing the root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type representing the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Custom hook to access the dispatch function from the Redux store.
 *
 * This hook provides type-safe access to the store's dispatch function,
 * allowing for better TypeScript support when dispatching actions.
 *
 * @returns {AppDispatch} The dispatch function from the store.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Exports the configured store for use in the application.
 *
 * @returns {Object} The configured Redux store.
 */
export default store;
