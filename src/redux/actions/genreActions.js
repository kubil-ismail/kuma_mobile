/* eslint-disable prettier/prettier */
import { get } from '../../helper/http';

// SET GENRE
export const SET_GENRE = () => ({
  type: 'SET_GENRE',
  payload: get({ url: 'genre' }),
});
