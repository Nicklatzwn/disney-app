import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import CharactersTableFilters from '../CharactersTableFilters';
import { charactersFilterMenu } from '@/assets/consts';
import store from '@/store/store';

describe('CharactersTableFilters Component', () => {
  const onFetchCharactersMock = vi.fn();

  test('Renders correctly with initial state', () => {
    const result = render(
      <Provider store={store}>
        <CharactersTableFilters
          shouldFieldsBeDisabled={false}
          pageSize={50}
          onFetchCharacters={onFetchCharactersMock}
        />
      </Provider>
    );

    expect(result.getByLabelText('Search Field')).toBeInTheDocument();
    expect(result.getByLabelText(new RegExp('Search characters by', 'i'))).toBeInTheDocument();
  });

  test('Changes field selection and fetches characters', async () => {
    render(
      <Provider store={store}>
        <CharactersTableFilters
          shouldFieldsBeDisabled={false}
          pageSize={50}
          onFetchCharacters={onFetchCharactersMock}
        />
      </Provider>
    );

    const selectField = screen.getByRole('combobox', {
      name: /search field/i,
    }); // Access the Select dropdown
    fireEvent.mouseDown(selectField); // Open the dropdown
    const menuItem = screen.getByText(charactersFilterMenu[1].name); // Find the menu item by its text
    fireEvent.click(menuItem); // Click the menu item

    const input = screen.getByLabelText(/Search characters by/i);
    fireEvent.change(input, { target: { value: 'Batman' } });

    await waitFor(() => {
      expect(onFetchCharactersMock).toHaveBeenCalledWith({
        page: 1,
        pageSize: 50,
        [charactersFilterMenu[1].field]: 'Batman',
      });
    });
  });

  test('Disables fields when shouldFieldsBeDisabled is true', async () => {
    const props = {
      shouldFieldsBeDisabled: vi.mocked(true),
      pageSize: vi.mocked(50),
      onFetchCharacters: vi.fn(),
    };
    const result = render(
      <Provider store={store}>
        <CharactersTableFilters {...props} />
      </Provider>
    );

    const selectField = result.getByLabelText(/Search Field/i);
    const input = result.getByLabelText(/Search characters by/i);

    expect(input).toBeDisabled();
    expect(selectField).toHaveAttribute('aria-disabled', 'true');
  });
});
