import $cookie from '@/plugins/util/cookieUtil.js';
import $storage from '@/plugins/util/storageUtil.js';

function onCreatSid () {
  if (!$storage.get('sessionId') && !$cookie.get('nutsbp_user').sid) {
    let str = 'w';
    while (str.length < 32) {
      str += Math.random()
        .toString(32)
        .substr(2);
    }
    $storage.set('sessionId', str);
  } else if ($cookie.get('nutsbp_user').sid && !$storage.get('sessionId')) {
    $storage.set('sessionId', $cookie.get('nutsbp_user').sid);
  }
}

function isLogin (callback) {
  // cookie中存在sid或者storage中存在token, 视为已登录
  const isSessionId = $cookie.get('nutsbp_user').sid;
  const isToken = $storage.get('token'); // 在dartcome与旧版3.0疯狂BP使用
  const sid = $storage.get('sessionId');
  if (!isSessionId && isToken) {
    $cookie.write('nutsbp_user', { sid: sid }, 1);
  }

  callback(isSessionId || isToken);
}

export default function () {
  if (process.client) {
    isLogin((res) => {
      if (!res) {
        onCreatSid();
      }
    });
  }
}
