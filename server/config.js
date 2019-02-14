import http from 'http';
import https from 'https';

export default {
  // 自定义的请求头
  headers: {
    'X-NUTS-Version': '4.0.0',
    'X-NUTS-Device': 3,
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    get: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  // 超时设置
  timeout: 10000,
  // 跨域是否带Token
  withCredentials: false,
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: 'json',
  // XSRF 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 用于node.js
  httpAgent: new http.Agent({
    keepAlive: true,
  }),
  httpsAgent: new https.Agent({
    keepAlive: true,
  }),
};
