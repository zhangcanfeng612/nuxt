export default {
  init () {
    /**
     * @param {String}  message    错误信息
     * @param {String}  source    出错文件
     * @param {Number}  lineno    行号
     * @param {Number}  colno    列号
     * @param {Object}  error  Error对象（对象）
     */
    window.onerror = function (message, source, lineno, colno, error) {
      console.log('捕获到异常：', {message, source, lineno, colno, error});
    };

    // 捕获全局错误
    window.addEventListener('error', (error) => {
      console.log('error触发');
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASEMODAL',
        type: 'fail',
        sloter: error.message,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      event.preventDefault();
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASEMODAL',
        type: 'fail',
        sloter: 'reject error',
      });
    });

    window.addEventListener('rejectionhandled', (error) => {
      event.preventDefault();
      console.log('rejectionhandled触发');
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASEMODAL',
        type: 'fail',
        sloter: error.message,
      });
    });
  },
}
