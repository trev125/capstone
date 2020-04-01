import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:3030`,
  //baseURL: `https://edwin.free.beeceptor.com`,
  headers: {
    //Authorization: 'Bearer {token}'
  }
})