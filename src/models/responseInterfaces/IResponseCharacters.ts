export interface IResponseCharactersInfo {
  totalPages: number;
  count: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface IResponseCharactersData {
  _id: number;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  allies: string[];
  enemies: string[];
  sourceUrl: string;
  name: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

export interface IResponseCharacters {
  error: string;
  info: IResponseCharactersInfo;
  data: IResponseCharactersData[] | IResponseCharactersData;
}
