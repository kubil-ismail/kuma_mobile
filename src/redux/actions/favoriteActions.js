/* eslint-disable prettier/prettier */

// SET FAVORITE
export const favorite = (request) => ({
  type: 'SET',
  payload: {
    data: request.data,
    options: request.options,
  },
});
