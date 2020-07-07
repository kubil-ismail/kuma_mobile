/* eslint-disable prettier/prettier */

// SET Book
export const book = (request) => ({
  type: 'SET',
  payload: {
    data: request.data,
    options: request.options,
  },
});

// SET Book
export const detail = (request) => ({
  type: 'DETAIL',
  payload: {
    data: request.data,
  },
});
