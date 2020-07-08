/* eslint-disable prettier/prettier */

// SET GENRE
export const genre = (request) => ({
  type: 'GENRE',
  payload: {
    data: request.data,
    options: request.options,
  },
});
