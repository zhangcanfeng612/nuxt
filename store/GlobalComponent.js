import _ from 'lodash';

export const state = () => ({
  BASELOADING: {
    payload: {},
  },
  BASEMODAL: {
    payload: {},
  },
  NUTSACCOUNT: {
    payload: {},
  },
});

export const mutations = {
  show (state, payload) {
    payload = payload || {};
    state[payload.component].payload = _.assign(payload);
    state[payload.component].payload.show = true;
  },
  hide (state, payload) {
    payload = payload || {};
    state[payload.component].payload = _.assign(payload);
    state[payload.component].payload.show = false;
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
  BASELOADING: (state) => () => {
    return state.BASELOADING;
  },
  BASEMODAL: (state) => () => {
    return state.BASEMODAL;
  },
  NUTSACCOUNT: (state) => () => {
    return state.NUTSACCOUNT;
  },
};
