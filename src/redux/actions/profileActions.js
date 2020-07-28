/* eslint-disable prettier/prettier */
import { get, patch } from '../../helper/http';

// SET PROFILE
export const SET_PROFILE = (request) => ({
  type: 'SET_PROFILE',
  payload: get({
    url: `profile/${request.userId}`,
    body: request.config,
  }),
});

// UPDATE_PROFILE
export const UPDATE_PROFILE = (request) => ({
  type: 'UPDATE_PROFILE',
  payload: patch({
    url: `sosmed/${request.userId}`,
    body: request.body,
    config: request.config,
  }),
});

// SET NAME
export const UPDATE_NAME = (request) => ({
  type: 'UPDATE_NAME',
  payload: patch({
    url: `profile/${request.userId}`,
    body: request.body,
    config: request.config,
  }),
});
