import _ from 'lodash';

export const state = () => ({
  BASELOADING: {
    show: false,
    payload: {},
  },
  BASEMODAL: {
    show: false,
    payload: {
      slot: '这是一个弹窗',
    },
  },
});

export const mutations = {
  show (state, payload) {
    payload = payload || {};
    state[payload.component].show = true;
    state[payload.component].payload = _.assign(payload);
  },
  hide (state, payload) {
    payload = payload || {};
    state[payload.component].show = false;
    state[payload.component].payload = _.assign(payload);
  },
};

export const actions = {
  show (context, payload) {
    context.commit('show', payload);
  },
  hide (context, payload) {
    context.commit('hide', payload);
  },
};

export const getters = {
  isVIsible: (state) => () => {
    return state.visible;
  },
};
