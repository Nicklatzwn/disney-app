import { ISelectMenuItem } from '@/models/reusableInterfaces';

export const charactersFilterMenu: ISelectMenuItem[] = [
  { name: 'Name', field: 'name' },
  { name: 'TV Shows', field: 'tvShows' },
];
export const initialCharacterFilterField = charactersFilterMenu[0].field;
export const DEBOUNCE_DEFAULT_FILTERING = 500;
