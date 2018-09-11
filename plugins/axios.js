import Vue from 'vue';
import axios from 'axios';

const service = axios.create({
  baseURL: '/api',
});

Vue.prototype.$ajax = axios;
export default service;
