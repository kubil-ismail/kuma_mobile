/* eslint-disable prettier/prettier */
import { get } from '../../../helper/http';

// FETCH_AUTHOR
export const FETCH_AUTHOR = () => ({
  type: 'FETCH_AUTHOR',
  payload: get({
    url: 'author',
  }),
});
