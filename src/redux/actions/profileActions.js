/* eslint-disable prettier/prettier */

// UPDATE PROFILE
export const profile = (request) => ({
  type: 'PATCH',
  payload: {
    name: request.name,
    email: request.email,
    facebook: request.facebook,
    instagram: request.instagram,
    twitter: request.twitter,
  },
});
