/* eslint-disable prettier/prettier */

// SET FAVORITE
export const SET_FAVORITE = (request) => ({
  type: 'SET_FAVORITE',
  payload: {
    data: request.data,
    options: request.options,
  },
});
