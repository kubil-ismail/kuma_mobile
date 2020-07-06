/* eslint-disable prettier/prettier */
import {post} from '../../helper/http';

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
