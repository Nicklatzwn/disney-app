import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import rootReducer from '@/store/reducers';
import CharactersTableEmpty from '../CharactersTableEmpty';

// Setup mock store
const mockStore = configureStore<ReturnType<typeof rootReducer>>([]);

describe('CharactersTableEmpty Component', () => {
  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore(undefined);
  });

  test('Renders empty state when no characters are available', () => {
    const props = { isEmpty: vi.mocked(true) };

    const result = render(
      <Provider store={store}>
        <CharactersTableEmpty {...props} />
      </Provider>
    );

    expect(result.getByText(/No results found/i)).toBeInTheDocument();
  });
});
