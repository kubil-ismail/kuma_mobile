/* eslint-disable prettier/prettier */

// SET Book
export const book = (request) => ({
  type: 'SET',
  payload: {
    data: request.data,
    options: request.options,
  },
});

// SET detail Book
export const detail = (request) => ({
  type: 'DETAIL',
  payload: {
    data: request.data,
  },
});

// SET genre Book
export const detail_genre = (request) => ({
  type: 'DETAIL_GENRE',
  payload: {
    data: request.data,
  },
});

// SET reviews Book
export const reviews = (request) => ({
  type: 'REVIEWS',
  payload: {
    data: request.data,
  },
});
