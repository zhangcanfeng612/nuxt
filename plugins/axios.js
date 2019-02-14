import Vue from 'vue';
import axios from 'axios';

const server = axios.create({
  baseURL: '/api',
});

Vue.prototype.$ajax = axios;
export default server;
