import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.11.2:3333/'
});