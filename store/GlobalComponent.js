import _ from 'lodash';

export const state = () => ({
  BASELOADING: {
    show: false,
    payload: {},
  },
  BASEMESSAGE: {
    show: false,
    payload: {},
  },
});

export const mutations = {
  setValue (state, payload) {
    payload = payload || {};
    state[payload.component].show = true;
    state[payload.component].payload = _.assign(payload);
  },
};

export const actions = {
  show (context, payload) {
    context.commit('setValue', payload);
  },
  hide (context, payload) {
    context.commit('setValue', payload);
  },
};

export const getters = {
  isVIsible: (state) => () => {
    return state.visible;
  },
};
