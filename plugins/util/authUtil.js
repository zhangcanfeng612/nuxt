import $cookie from '@/plugins/util/cookieUtil';
import $storage from '@/plugins/util/storageUtil';

const auth = {
  onSplitServerCookie (name) {
    if (process.__COOKIE__) {
      let Cookies = {};
      // console.error(process.__COOKIE__);
      process.__COOKIE__.forEach(function (e) {
        let parts = e.split('=');
        Cookies[ parts[ 0 ].trim() ] = (parts[ 1 ] || '').trim();
      });
      return JSON.parse(Cookies.nutsbp_user)[name];
    } else {
      return false;
    }
  },
  get isLogin () {
    if (process.client) {
      let str = 'w';
      while (str.length < 32) {
        str += Math.random().toString(32).substr(2);
      }
      if (!$storage.get('sessionId') && !$cookie.get('nutsbp_user').sid) {
        $storage.set('sessionId', str);
      } else if ($cookie.get('nutsbp_user').sid && !$storage.get('sessionId')) {
        $storage.set('sessionId', $cookie.read('nutsbp_user').sid);
      }
      return $cookie.get('nutsbp_user').sid || '';
    } else {
      return this.onSplitServerCookie('sid');
    }
  },
};

export default auth;
