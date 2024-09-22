import { TRequestCharacters } from '../requestInterfaces';
import { IResponseCharacters } from '../responseInterfaces';

export type TCharactersThunkResponse = Partial<IResponseCharacters> & TRequestCharacters;
