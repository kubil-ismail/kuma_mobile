/* eslint-disable prettier/prettier */

// SET GENRE
export const genre = (request) => ({
  type: 'SET',
  payload: {
    data: request.data,
    options: request.options,
  },
});
