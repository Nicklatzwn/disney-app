import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCharacters } from '../../api/characters';
import { TRequestCharacters } from '@/models/requestInterfaces';
import { TCharactersThunkResponse } from '@/models/reusableTypes';
import { ICharactersState } from '@/models/reusableInterfaces';
import { EAsyncThunkStatus } from '@/models/reusableEnums';
import { PAGE_INIT, PAGE_SIZE_INIT } from '@/assets/consts';
import { IResponseCharacters } from '@/models/responseInterfaces';

/**
 * Initial state for the characters slice.
 *
 * @constant {ICharactersState}
 */
const initialState: ICharactersState = {
  id: null,
  data: [],
  info: null,
  params: {
    page: PAGE_INIT,
    pageSize: PAGE_SIZE_INIT,
  },
  loading: false,
  error: '',
  status: EAsyncThunkStatus.IDLE,
};

/**
 * Slice for managing character-related state.
 *
 * This slice includes actions and reducers to handle fetching characters
 * from the API, as well as managing loading state and error handling.
 */
const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<Pick<TCharactersThunkResponse, '_id'>>) => {
      state.id = action.payload._id || null;
    },
    clearId: (state) => {
      state.id = initialState.id;
    },
    clearError: (state) => {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.status = EAsyncThunkStatus.FAILED;
      state.loading = false;
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<TCharactersThunkResponse>) => {
      state.status = EAsyncThunkStatus.SUCCEEDED;
      state.loading = false;
      state.data = Array.isArray(action.payload.data)
        ? action.payload.data
        : action.payload.data
          ? [action.payload.data]
          : state.data;
      state.info = action.payload.info ?? state.info;
      state.params.page = action.payload.page || initialState.params.page;
      state.params.pageSize = action.payload.pageSize || initialState.params.pageSize;
      state.params.name = action.payload.name;
      state.params.films = action.payload.films;
      state.error = action.payload.error || '';
    });
  },
});

/**
 * Async thunk for fetching characters from the API.
 *
 * This thunk initiates an API request to retrieve character data based
 * on the provided parameters, and handles both successful and failed requests.
 *
 * @async
 * @function fetchCharacters
 * @param {TRequestCharacters} params - The parameters for filtering characters.
 *
 * @returns {Promise<TCharactersThunkResponse>} A promise that resolves with the characters data and additional info.
 */
export const fetchCharacters = createAsyncThunk<TCharactersThunkResponse, TRequestCharacters>(
  'characters',
  async (params) => {
    try {
      const response = await getCharacters(params);
      return { ...params, ...response };
    } catch (err) {
      const error = err as IResponseCharacters['error'];
      return { ...params, error };
    }
  }
);

/**
 * Exports the reducer and actions from the characters slice.
 *
 * @constant {Object}
 */
export const { reducer: charactersReducer, actions: charactersActions } = charactersSlice;
