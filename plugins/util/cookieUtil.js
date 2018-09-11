const cookieUtil = {
  get (name) {
    const tempCookies = document.cookie.split('; ');
    for (let i = 0; i < tempCookies.length; i++) {
      const keyValues = tempCookies[i].split('=');
      if (keyValues[0] === name) {
        if (keyValues.length > 1) {
          // return unescape(keyValues[1]);
          return JSON.parse(unescape(keyValues[1]));

          // return keyValues[1];
        } else {
          return '';
        }
      }
    }
    return '';
  },
  set (name, value = '', day = 7, domain = null) {
    const date = new Date();
    if (day !== -1) {
      date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
    } else {
      date.setTime(date.getTime() - 1);
    }
    // if (domain === null) {
    //   // document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;`;
    //   document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;`;
    // } else {
    //   document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;domain=${domain};`;
    // }
    document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;domain=nutsbp.com;`;
    document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;domain=nutsb.com;`;
    document.cookie = `${name}=${escape(value)};expires=${date.toUTCString()};path=/;domain=localhost;`;
  },
  delete (name, domain = null) {
    this.setCookie(name, '', -1, domain);
    this.setCookie(name, '', -1, 'nutsbp.com');
    this.setCookie(name, '', -1, 'nutsb.com');
    this.setCookie(name, '', -1, 'localhost');
  },
};

export default cookieUtil;
