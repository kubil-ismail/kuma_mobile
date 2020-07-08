/* eslint-disable prettier/prettier */
import axios from 'axios';

const url = 'http://192.168.1.4:8000/';

// Fetch Data
export const get = async (data) => {
  try {
    const getData = await axios.get(url + data.url, data.body, data.config);
    return getData;
  } catch (error) {
    return error.response;
  }
};

// Post Data
export const post = async (data) => {
  try {
    const postData = await axios.post(url + data.url, data.body, data.config);
    return postData;
  } catch (error) {
    return error.response;
  }
};

export const remove = async (data) => {
  try {
    const postData = await axios.delete(url + data.url, data.body, data.config);
    return postData;
  } catch (error) {
    return error.response;
  }
}
