// import _ from 'lodash';
export const state = () => ({
  ESSAYBANNER: [],
  BPBANNER: [],
  TEMPLATEBANNER: [],
  USERCASE: [],
  SOURCE: {},
});

export const mutations = {
  save (state, data) {
    state[data.type] = data.data;
  },
  modify (state, data) {
    state[data.type] = data.data;
  },
  delete () {
    return false;
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
  state () {
    return '111111';
  },
};
