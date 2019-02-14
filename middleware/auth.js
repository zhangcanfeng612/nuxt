import $Auth from '@/plugins/util/authUtil';

export default function ({ store, redirect }) {
  if (!$Auth.isLogin) {
    return redirect('/');
  }
}
