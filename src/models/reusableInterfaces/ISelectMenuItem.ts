import { IResponseCharactersData } from '../responseInterfaces';

export interface ISelectMenuItem {
  name: string;
  field: keyof IResponseCharactersData;
}
