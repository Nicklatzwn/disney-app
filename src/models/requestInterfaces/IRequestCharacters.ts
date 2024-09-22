import { IResponseCharactersData } from '../responseInterfaces';

export interface TRequestCharacters extends Partial<IResponseCharactersData> {
  page: number;
  pageSize: number;
}
