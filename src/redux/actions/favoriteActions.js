/* eslint-disable prettier/prettier */
import { get, post } from '../../helper/http';

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

// ADD FAVORITE
export const ADD_FAVORITE = (request) => ({
  type: 'ADD_FAVORITE',
  payload: post({
    url: 'favorite',
    body: request.body,
    config: request.config,
  }),
});
