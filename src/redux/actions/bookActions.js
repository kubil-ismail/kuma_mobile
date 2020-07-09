/* eslint-disable prettier/prettier */
import {get} from '../../helper/http';

// SET_BOOK
export const SET_BOOK = (request) => ({
  type: 'SET_BOOK',
  payload: get({
    url: `book?limit=10&page=${request.page}`,
  }),
});

// SET_DETAIL
export const SET_DETAIL = (request) => ({
  type: 'SET_DETAIL',
  payload: get({
    url: `book/${request.bookId}`,
  }),
});

// SET genre Book
export const SET_DETAIL_GENRE = (request) => ({
  type: 'SET_DETAIL_GENRE',
  payload: {
    data: request.data,
    options: request.options,
  },
});

// SET_REVIEW
export const SET_REVIEW = (request) => ({
  type: 'SET_REVIEW',
  payload: get({
    url: `review?book_id=${parseInt(request.bookId, 10)}&limit=5`,
  }),
});

// SET_SEARCH
export const SET_SEARCH = (request) => ({
  type: 'SET_SEARCH',
  payload: get({
    url: `book?search=${request.search}&limit=10${request.options || ''}`,
  }),
});

export const SET_SEARCH_NEXT = (request) => ({
  type: 'SET_SEARCH_NEXT',
  payload: get({
    url: `book?${request.search}`,
  }),
});
