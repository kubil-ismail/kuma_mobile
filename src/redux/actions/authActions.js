/* eslint-disable prettier/prettier */

// Login
export const login = (request) => ({
  type: 'LOGIN',
  payload: {
    status: request.status,
    userId: request.userId,
    apikey: request.apikey,
  },
});

// Sign Up
export const signup = (request) => ({
  type: 'SIGN_UP',
  payload: request,
});

// Logout
export const logout = () => ({ type: 'LOGOUT' });
