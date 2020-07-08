/* eslint-disable prettier/prettier */

// SET PROFILE
export const SET_PROFILE = (request) => ({
  type: 'SET_PROFILE',
  payload: {
    name: request.name,
    facebook: request.facebook,
    instagram: request.instagram,
    twitter: request.twitter,
  },
});

// SET EMAIL
export const SET_EMAIL = (request) => ({
  type: 'SET_EMAIL',
  payload: {
    email: request.email,
  },
});
