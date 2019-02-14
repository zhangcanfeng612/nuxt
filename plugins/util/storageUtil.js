export default {
  get (key) {
    let localData = localStorage.getItem('NUTSBP');
    localData = JSON.parse(localData) || {};

    if (key === 'all') {
      return localData;
    } else if (localData[key]) {
      return localData[key];
    } else {
      return null;
    }
  },
  /**
   * key -> 'name' || 'test' ...
   * @param {String} key   [description]
   * @param {Any} value [description]
   */
  set (key, value) {
    let data = this.get('all');
    data[key] = value;
    localStorage.setItem('NUTSBP', JSON.stringify(data));
    // NOTE: 兼容 4.0 的 login
    if (key === 'u') {
      // localStorage.setItem('_auth', JSON.stringify({
      //   u: value,
      // }));
    }
    return data;
  },
  delete (key) {
    let data = this.get('all');
    delete data[key];
    localStorage.setItem('NUTSBP', JSON.stringify(data));
  },
};
