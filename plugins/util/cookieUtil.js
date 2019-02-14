export default {
  /**
   * read cookie data
   * @param  {String} key The name of cookie data
   * @return {Object} The cookie data
   */
  get (key) {
    const arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));
    let data = {};
    if (arr != null) {
      data = JSON.parse(unescape(arr[2]));
    }
    return data;
  },
  /**
   * write data to cookie
   * @param  {String} name       The name of cookie data
   * @param  {Object} value      The data of cookie
   * @param  {Number} day The expire day
   * @return {Object} The new cookie data
   */
  set (name, value = '', day = 7, domain = null) {
    const date = new Date();
    if (day !== -1) {
      date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
    } else {
      date.setTime(date.getTime() - 1);
    }
    if (domain === null) {
      // document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;`;
      document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/;`;
    } else {
      document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/;domain=${domain};`;
    }
  },
  delete (name, domain = null) {
    this.set(name, '', -1, domain);
  },
};
