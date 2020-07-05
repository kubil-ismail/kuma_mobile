/* eslint-disable prettier/prettier */
import {post} from '../../helper/http';

// Login
export const login = (request) => ({
  type: 'LOGIN',
  payload: post({
    url: 'auth/login',
    body: { request },
  }),
});

// Sign Up
export const signup = (request) => ({
  type: 'SIGNUP',
  payload: post({
    url: 'auth/signin',
    body: {
      email: request.email,
      password: request.password,
    },
  }),
});
