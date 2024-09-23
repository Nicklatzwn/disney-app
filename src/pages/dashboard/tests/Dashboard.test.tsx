import { fireEvent, render, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { charactersMockData } from '@/mocks/charactersMockData';
import { IResponseCharactersData } from '@/models/responseInterfaces';
import { sortArray } from '@/utils';
import { server } from '@/setup-tests';
import { http, HttpResponse } from 'msw';
import rootReducer from '@/store/reducers';
import configureStore from 'redux-mock-store';
import { EAsyncThunkStatus } from '@/models/reusableEnums';

const mockStore = configureStore<ReturnType<typeof rootReducer>>([]);
describe('Dashboard Component', () => {
  test('Dashboard should be rendering', () => {
    const result = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    const title = result.getByText(/Disney Characters/i);
    expect(title).toBeInTheDocument();
  });

  test('Pie chart button becomes enabled', async () => {
    const result = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    const button = result.getByTestId('pie-chart-films-participation');
    await waitFor(() => expect(button).toBeEnabled());
  });

  test('Displays character data correctly', async () => {
    const result = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(
      result.getAllByText(sortArray(charactersMockData.data as IResponseCharactersData[], 'asc', 'name')[0].name).length
    ).toBeGreaterThan(0);
  });

  test('Handles pagination correctly', async () => {
    const result = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    await waitFor(() => {
      expect(
        result.getByText(sortArray(charactersMockData.data as IResponseCharactersData[], 'asc', 'name')[0].name)
      ).toBeInTheDocument();
    });

    const data = [...(charactersMockData.data as IResponseCharactersData[])].slice(0, 5).reverse();

    // Adjust the server response for the next page
    server.use(
      http.get('*/character', () => {
        return HttpResponse.json({
          ...charactersMockData,
          data: data,
        });
      })
    );

    // Simulate page change
    fireEvent.click(result.getByRole('button', { name: /next page/i }));

    const cellNames = data.map((x) =>
      result.getAllByRole('cell', {
        name: new RegExp(x.name, 'i'),
      })
    );
    expect(cellNames.length).toEqual(data.length);
  });

  test('Displays error message when there is an error', async () => {
    let store: ReturnType<typeof mockStore>;
    store = mockStore({
      characters: {
        info: charactersMockData.info,
        data: [],
        id: null,
        params: {
          page: 1,
          pageSize: 50,
        },
        error: 'Network Error',
        loading: false,
        status: EAsyncThunkStatus.SUCCEEDED,
      },
    });

    const clearErrorMock = vi.fn();
    vi.spyOn(store, 'dispatch').mockImplementation(clearErrorMock);

    const result = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );

    expect(await result.findByText(store.getState().characters.error)).toBeInTheDocument();
  });
});
