import axios from './axios';
import axiosTest from 'axios';

export const getLand = async () => axios.get(`/land/land`);
export const getJson = async () => axiosTest.get(`/api/data.json`);
