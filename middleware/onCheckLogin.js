import $Auth from '@/plugins/util/authUtil';
import _ from 'lodash';
export default function ({ route, redirect }) {
  // 需要鉴权的页面
  const authenticationPages = [
    // 个人中心
    '/personal-center/users/info',
    '/personal-center/users/order',
    '/personal-center/users/account',
    '/personal-center/users/password',
    '/personal-center/users/permission',
    '/personal-center/users/permission',

    // 我的BP
    '/nutsbp/mybp',
    '/nutsbp/recycle',
  ];
  if (process.client) {
    if (!$Auth.isLogin) {
      if (_.indexOf(authenticationPages, route.path) !== -1) {
        // 服务端重定向
        return redirect('/');
      }
    } else {
      console.log('sessionId:', $Auth.isLogin);
    }
  }
}
