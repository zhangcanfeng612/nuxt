import axios from 'axios';
import qs from 'qs';
import config from './config';

import queryTestUrlConfig from '../static/json/testUrl.json';
import queryUrlConfig from '../static/json/url.json';

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`;
}

const service = axios.create(config);

// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.method === 'post') config.data = qs.stringify(config.data);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  // 页面初始化时须执行init
  init () {
    if (process.browser) {
      const webSite = window.location;
      let config = queryTestUrlConfig; // 测试地址
      if (webSite.host.match('bp.nutsbp.com')) {
        config = queryUrlConfig; //  正式地址
      }

      this._url = config.data.url;
    }
  },
  get url () {
    return this._url;
  },
  post (url, data) {
    console.log('post request url', url);
    return service({
      method: 'post',
      url,
      params: data,
    });
  },
  get (url, data) {
    console.log('get request url', url);
    return service({
      method: 'get',
      url,
      params: data,
    });
  },
  delete (url, data) {
    console.log('delete request url', url);
    return service({
      methods: 'delete',
      url,
      params: data,
    });
  },
};
