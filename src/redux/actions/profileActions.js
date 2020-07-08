/* eslint-disable prettier/prettier */

// SET PROFILE
export const SET_PROFILE = (request) => ({
  type: 'SET_PROFILE',
  payload: {
    name: request.name,
    email: request.email,
    facebook: request.facebook,
    instagram: request.instagram,
    twitter: request.twitter,
  },
});
