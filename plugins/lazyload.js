import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
const errorImg = require('@/static/image/404.png');
const loadingImg = require('@/static/image/loading-bars.svg');

Vue.use(VueLazyLoad, {
  error: errorImg,
  loading: loadingImg,
});
