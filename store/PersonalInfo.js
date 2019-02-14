// 该文件用于处理用户信息相关资料: 包括后台提供的cardInfo以及signInfo
import _ from 'lodash';

export const state = () => ({
  CARDINFO: {
    data: {},
  },
  SIGNINFO: {
    data: {},
  },
});

export const mutations = {
  save (state, data) {
    data = data || {};
    state[data.type].data = _.assign(data);
  },
  modify (state, data) {
    data = data || {};
    state[data.type].data = _.assign(data);
  },
  delete (state, data) {
    state[data.type].data = {};
  },
};

export const actions = {
  save (context, data) {
    context.commit('save', data);
  },
  modify (context, data) {
    context.commit('hide', data);
  },
};

export const getters = {
  CARDINFO: (getters) => {
    console.error('getters', getters);
    // return state.CARDINFO;
  },
};
