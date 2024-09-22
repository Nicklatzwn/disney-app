import { EAsyncThunkStatus } from '../reusableEnums';
import { IResponseCharactersData, IResponseCharactersInfo } from '../responseInterfaces/IResponseCharacters';
import { TRequestCharacters } from '../requestInterfaces';

export interface ICharactersState {
  id: number | null;
  info: IResponseCharactersInfo | null;
  data: IResponseCharactersData[];
  params: TRequestCharacters;
  loading: boolean;
  error: string;
  status: EAsyncThunkStatus;
}
