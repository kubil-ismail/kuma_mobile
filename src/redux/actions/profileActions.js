/* eslint-disable prettier/prettier */
import { get } from '../../helper/http';

// SET PROFILE
export const SET_PROFILE = (request) => ({
  type: 'SET_PROFILE',
  payload: get({
    url: `profile/${request.userId}`,
    body: request.config,
  }),
});
