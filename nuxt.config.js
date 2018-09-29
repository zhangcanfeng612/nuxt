module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  nuxt: {
    'port': '3000',
  },
  router: {
    middleware: 'onCheckLogin',
  },
  head: {
    title: '疯狂BP-在线制作商业计划书，提供精美模板、商业计划书范文、商业计划书范本大全',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: '疯狂BP，商业计划书，商业计划书模板，商业计划书范文在线编辑，在线制作、商业计划书范本，商业计划书ppt，bp模板，创业计划书范文，创业计划书范本，大学生创业计划书，天使投资商业计划书，融资，商业计划书怎么写' },
      { name: 'description', content: '疯狂BP是一个在线创建投资人想要商业计划书的平台，汇集各行业各种风格 - 商业计划书模板、创业计划书模板，提供商业计划书范文、范本教学，手把手教你写商业计划书。高效便捷的满足各类创业者的商业计划书制作需求，更好的启动融资，更好的呈现给天使投资人' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//az.cdn.nutsbp.com/007/image/nuts_bp_pc/web4.0/font_icon/css/fontello.css' },
    ],
    script: [
      { src: 'http://az.cdn.nutsbp.com/007/nuts-component/component/jquery/jquery-3.2.1.min.js' },
      { src: 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' },
    ],
  },
  css: [
    '~/static/css/reset.css',
    '~/assets/main.css',
  ],
  loading: '~/components/PageLoading.vue',
  plugins:
  [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vue-lazyload', ssr: true },
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
    vendor: ['~/plugins/axios.js', 'vue-lazyload'],
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true,
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/api': {
      target: 'https://cnodejs.org/api/v1',
      pathRewrite: { '^/api': '' },
    },
  },
};
