/* eslint-disable prettier/prettier */
import { post } from '../../helper/http';

// Login
export const login = (request) => ({
  type: 'LOGIN',
  payload: post({
    url: 'auth/login',
    body: request.body,
  }),
});

// Sign Up
export const signup = (request) => ({
  type: 'SIGN_UP',
  payload: request,
});

// Logout
export const logout = () => ({ type: 'LOGOUT' });
