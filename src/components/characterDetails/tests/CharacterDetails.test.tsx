import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CharacterDetails from '../CharacterDetails';
import rootReducer from '@/store/reducers';
import { charactersMockData } from '@/mocks/charactersMockData';
import { EAsyncThunkStatus } from '@/models/reusableEnums';
import { IResponseCharactersData } from '@/models/responseInterfaces';

const mockStore = configureStore<ReturnType<typeof rootReducer>>([]);
describe('CharacterDetails Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      characters: {
        info: charactersMockData.info,
        data: charactersMockData.data as IResponseCharactersData[],
        id: (charactersMockData.data as IResponseCharactersData[])[0]._id,
        params: {
          page: 1,
          pageSize: 50,
        },
        error: '',
        loading: false,
        status: EAsyncThunkStatus.SUCCEEDED,
      },
    });
  });

  test('Renders character details correctly', () => {
    const result = render(
      <Provider store={store}>
        <CharacterDetails />
      </Provider>
    );

    expect(result.getByRole('dialog')).toBeInTheDocument();
    expect(result.getByText('Character Details')).toBeInTheDocument();
    expect(
      result.getByRole('img', { name: new RegExp((charactersMockData.data as IResponseCharactersData[])[0].name, 'i') })
    ).toBeInTheDocument();
    expect(result.getByTestId('character-link')).toHaveTextContent(
      (charactersMockData.data as IResponseCharactersData[])[0].sourceUrl
    );
    expect(result.getByText(/TV Shows/i)).toBeInTheDocument();
    expect(
      result.getByText((charactersMockData.data as IResponseCharactersData[])[0].tvShows.join(', '))
    ).toBeInTheDocument();
    expect(result.getByText(/Video Games/i)).toBeInTheDocument();
    expect(
      result.getByText((charactersMockData.data as IResponseCharactersData[])[0].videoGames.join(', '))
    ).toBeInTheDocument();
  });

  test('Closes the dialog when the close button is clicked', () => {
    const clearIdMock = vi.fn();
    vi.spyOn(store, 'dispatch').mockImplementation(clearIdMock);

    render(
      <Provider store={store}>
        <CharacterDetails />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/close/i));
    expect(clearIdMock).toHaveBeenCalledTimes(1);
  });
});
