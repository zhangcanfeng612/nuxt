import axios from 'axios';
import qs from 'qs';
import config from './config';

import queryTestUrlConfig from '@/static/json/testUrl.json';
import queryUrlConfig from '@/static/json/Url.json';

import $Auth from '@/plugins/util/authUtil';
import $Storage from '@/plugins/util/storageUtil';

if (process.server) {
  config.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`;
}

const service = axios.create(config);

// POST 传参序列化
service.interceptors.request.use(
  config => {
    if (config.method === 'post') config.data = qs.stringify(config.data);
    config.headers['tephra-session-id'] = (process.client)
      ? $Storage.get('sessionId')
      : $Auth.onSplitServerCookie('sid');
    return config;
  },
  error => {
    error.message = '请求超时';
    return Promise.reject(new Error(error));
  }
);

// 返回状态判断
service.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    // 当响应异常时做一些处理
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误(400)'; break;
        case 401: error.message = '未授权，请重新登录(401)'; break;
        case 403: error.message = '拒绝访问(403)'; break;
        case 404: error.message = '请求出错(404)'; break;
        case 408: error.message = '请求超时(408)'; break;
        case 500: error.message = '服务器错误(500)'; break;
        case 501: error.message = '服务未实现(501)'; break;
        case 502: error.message = '网络错误(502)'; break;
        case 503: error.message = '服务不可用(503)'; break;
        case 504: error.message = '网络超时(504)'; break;
        case 505: error.message = 'HTTP版本不受支持(505)'; break;
        default: error.message = `连接出错(${error.response.status})!`;
      }
    } else {
      error.message = '连接服务器失败!';
    }
    return Promise.resolve(new Error(error));
  }
);

export default {
  // 页面初始化时须执行init
  init () {
    let config = queryTestUrlConfig;
    if (process.client) {
      const webSite = window.location;
      // TODO: 判断环境需要修改
      // 测试地址
      if (webSite.host.match('bp.nutsbp.com')) {
        config = queryUrlConfig; //  正式地址
      } else {
        config = queryTestUrlConfig;
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        config = queryTestUrlConfig;
      } else {
        config = queryUrlConfig;
      }
    }

    this._url = config.data.url;
    this._apiV3 = config.data.apiV3;
    this._api = config.data.api;
    this._imgCdn = config.data.imgCdn;
    this._home = config.data.home;
    this._caseImgCdn = config.data.caseImgCdn;
    this._apiPr = config.data.apiPr;
    this._nutsCdn = config.data.nutsCdn;
    this._cdn = config.data.cdn;
  },
  get url () {
    return this._url;
  },
  get apiV3 () {
    return this._apiV3;
  },
  get api () {
    return this._api;
  },
  get imgCdn () {
    return this._imgCdn;
  },
  get home () {
    return this._home;
  },
  get caseImgCdn () {
    return this._caseImgCdn;
  },
  get apiPr () {
    return this._apiPr;
  },
  get nutsCdn () {
    return this._nutsCdn;
  },
  get cdn () {
    return this._cdn;
  },
  post (url, data) {
    return service({
      method: 'post',
      url,
      params: data,
    });
  },
  get (url, data) {
    return service({
      method: 'get',
      url,
      params: data,
    });
  },
  delete (url, data) {
    return service({
      methods: 'delete',
      url,
      params: data,
    });
  },
  getGraphQL (url, data) {
    return service({
      methods: 'post',
      url,
      headers: {
        'Content-Type': 'application/json',
      },
      params: data,
    });
  },
};
