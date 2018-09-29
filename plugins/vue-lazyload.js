import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
  error: '@/static/image/loading-bars.svg',
  loading: '@/static/image/loading-bars.svg',
});
