export const state = () => ({
  visible: 0,
});

export const mutations = {
  setVisible (state, visible) {
    state.visible = visible;
  },
};

export const actions = {
  add (context, { visible }) {
    visible++;
    context.commit('setVisible', visible);
  },
  less (context, { visible }) {
    visible--;
    context.commit('setVisible', visible);
  },
};

export const getters = {
  isVIsible: (state) => () => { return state.visible; },
};
