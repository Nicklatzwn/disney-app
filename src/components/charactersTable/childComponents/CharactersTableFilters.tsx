import {
  charactersFilterMenu,
  DEBOUNCE_DEFAULT_FILTERING,
  initialCharacterFilterField,
  PAGE_INIT,
} from '@/assets/consts';
import { TRequestCharacters } from '@/models/requestInterfaces';
import { IResponseCharactersData } from '@/models/responseInterfaces';
import { FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface IProps {
  shouldFieldsBeDisabled: boolean;
  pageSize: number;
  onFetchCharacters: (params: TRequestCharacters) => void;
}

/**
 * CharactersTableFilters Component
 *
 * This component provides filtering functionality for the characters table, allowing users to search
 * for characters based on specific fields. It includes a dropdown to select the filter field and an
 * input box for entering search criteria. The component employs debouncing to minimize the number
 * of fetch requests made during user input.
 *
 * @component CharactersTableFilters
 * @param {IProps} props - The properties passed to the component.
 * @param {boolean} props.shouldFieldsBeDisabled - A flag that determines whether the filter fields should be disabled.
 * @param {number} props.pageSize - The number of records to display per page.
 * @param {(params: TRequestCharacters) => void} props.onFetchCharacters - A function to fetch characters based on filter criteria.
 *
 * @returns {JSX.Element} A set of filtering controls for the characters table.
 */
const CharactersTableFilters: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { shouldFieldsBeDisabled, pageSize, onFetchCharacters } = props;

  const [field, setField] = useState(initialCharacterFilterField);
  const [input, setInput] = useState('');

  const currentNameField = charactersFilterMenu.find((item) => item.field === field)?.name || '';
  const isDisabled = shouldFieldsBeDisabled && !input;
  const debouncedFetchCharacters = useDebouncedCallback(
    (value) => onFetchCharacters({ page: PAGE_INIT, pageSize, [field]: value }),
    DEBOUNCE_DEFAULT_FILTERING
  );

  const handleChange = (event: SelectChangeEvent) => {
    setField(event.target.value as keyof IResponseCharactersData);
    if (input) {
      setInput('');
      onFetchCharacters({ page: PAGE_INIT, pageSize });
    }
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInput(value);
    debouncedFetchCharacters(value);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <FormControl variant="standard" sx={{ width: '150px' }} size="small">
        <InputLabel id="search-field">Search Field</InputLabel>
        <Select
          labelId="search-field"
          id="search-field"
          value={field}
          label="Field search filter"
          onChange={handleChange}
          disabled={isDisabled}
          size="small"
        >
          {charactersFilterMenu.map((x) => (
            <MenuItem key={x.field} value={x.field}>
              {x.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="standard">
        <InputLabel htmlFor="search-by-name-character">Search characters by {currentNameField}</InputLabel>
        <Input
          value={input}
          size="small"
          id="search-by-name-character"
          disabled={isDisabled}
          onChange={onInputChange}
        />
      </FormControl>
    </Stack>
  );
};

export default CharactersTableFilters;
