import { AxiosResponse } from 'axios';
import http from '../config/axios';
import { TRequestCharacters } from '@/models/requestInterfaces';
import { Endpoints } from '../config/endpoints';
import { IResponseCharacters } from '@/models/responseInterfaces';
import { filterParams } from '@/utils';

/**
 * Fetches characters from the API.
 *
 * This function makes an asynchronous request to retrieve character data
 * based on the provided query parameters. It utilizes Axios for HTTP requests
 * and handles the response accordingly.
 *
 * @async
 * @function getCharacters
 * @param {TRequestCharacters} [params] - Optional query parameters for filtering
 * the characters returned by the API. This can include pagination details or
 * specific filters based on character attributes.
 *
 * @returns {Promise<Partial<IResponseCharacters>>} A promise that resolves to
 * a partial response containing the character data. The structure of the response
 * is defined by the `IResponseCharacters` interface.
 *
 * @throws {AxiosError} Throws an error if the request fails, which can be
 * handled by the caller to provide feedback or retry logic.
 */
const getCharacters = async (params?: TRequestCharacters): Promise<Partial<IResponseCharacters>> => {
  const url = Endpoints.characters;
  const response: AxiosResponse<IResponseCharacters> = await http.get(url, {
    params: filterParams(params),
  });
  return response.data;
};

export default getCharacters;
