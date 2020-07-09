/* eslint-disable prettier/prettier */
import { get } from '../../helper/http';

// SET FAVORITE
export const SET_FAVORITE = (request) => ({
  type: 'SET_FAVORITE',
  payload: get({
    url: `profile/favorite/${request.userId}?limit=15`,
    body: request.config,
  }),
});

// SET FAVORITE NEXT
export const SET_FAVORITE_NEXT = (request) => ({
  type: 'SET_FAVORITE_NEXT',
  payload: get({
    url: `profile/favorite/${request.userId}?${request.options}`,
    body: request.config,
  }),
});
