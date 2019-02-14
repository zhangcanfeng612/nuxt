import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  createPersistedState({
    key: 'nutsbp_data',
    paths: [
      'Banner.ESSAYBANNER',
      'Banner.BPBANNER',
      'Banner.TEMPLATEBANNER',
      'Banner.USERCASE',
      'Banner.SOURCE',
      'PersonalInfo.CARDINFO', // cardInfo
      'PersonalInfo.SIGNINFO', // signInfo
    ],
  })(store);
};
