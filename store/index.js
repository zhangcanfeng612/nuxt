/*
* 根数据状态 存放全局数据和异步方法
*/
import axios from 'axios';
// import Vuex from 'Vuex';
import $Server from '@/server/index';

export const state = () => ({
  data: null,
});

export const mutations = {
  setData (state, n) {
    state.data = n;
  },
};

// global actions
export const actions = {
  async nuxtServerInit (store, context) {
    // TODO：1. 是否需要传递cookie
    // TODO：2. 如果传递cookie会不会造成用户污染
    if (process.server) {
      // res.setHeader('Set-Cookie', [`sessionId=${sid}`]); // Server-side
      process.__COOKIE__ = context.req.headers.cookie && context.req.headers.cookie.split(';');
    }

    // 初始化axios
    $Server.init();
    // 获取运营设置
    function getOperationSlide (key) {
      const url = `${$Server.home}/html/${key}/`;
      const params = {};
      return $Server.get(url, params);
    }

    const arr = [
      getOperationSlide('essayBanner'),
      getOperationSlide('bpBanner'),
      getOperationSlide('templateBanner'),
      getOperationSlide('userCase'),
      getOperationSlide('source'),
    ];

    return axios.all(arr)
      .then(axios.spread((essayBannerSlide, bpBannerSlide, templateBannerSlide, userCaseSlide, SOURCE) => {
        store.dispatch('Banner/save', {
          type: 'ESSAYBANNER',
          data: essayBannerSlide.banner_array || [],
        });
        store.dispatch('Banner/save', {
          type: 'BPBANNER',
          data: bpBannerSlide.banner_array || [],
        });
        store.dispatch('Banner/save', {
          type: 'TEMPLATEBANNER',
          data: templateBannerSlide.banner_array || [],
        });
        store.dispatch('Banner/save', {
          type: 'USERCASE',
          data: userCaseSlide.case_array || [],
        });
        store.dispatch('Banner/save', {
          type: 'SOURCE',
          data: SOURCE || {},
        });
      }))
      .catch(() => {
        context.error({ statusCode: 404, message: '获取广告BANNER失败' });
      });
  },
};
