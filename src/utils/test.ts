import { charactersMockData } from '@/mocks/charactersMockData';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/character', () => {
    return HttpResponse.json(charactersMockData);
  }),
];
