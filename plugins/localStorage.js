import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  createPersistedState({
    key: 'nutsbp_data',
    paths: [
      'counter.visible',
    ],
  })(store);
};
