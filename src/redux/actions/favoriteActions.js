/* eslint-disable prettier/prettier */

// SET FAVORITE
export const favorite = (request) => ({
  type: 'FAVORITE',
  payload: {
    data: request.data,
    options: request.options,
  },
});
