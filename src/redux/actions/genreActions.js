/* eslint-disable prettier/prettier */

// SET GENRE
export const SET_GENRE = (request) => ({
  type: 'SET_GENRE',
  payload: {
    data: request.data,
    options: request.options,
  },
});
