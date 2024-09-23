import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import rootReducer from '@/store/reducers';
import CharactersTableLoader from '../CharactersTableLoader';

// Setup mock store
const mockStore = configureStore<ReturnType<typeof rootReducer>>([]);

describe('CharactersTableLoader Component', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore(undefined);
  });

  test('Renders loading state', () => {
    const props = { isLoading: vi.mocked(true) };

    const result = render(
      <Provider store={store}>
        <CharactersTableLoader {...props} />
      </Provider>
    );

    expect(result.getByTestId('characters-table-loader')).toBeInTheDocument();
  });
});
