// - 根据路由 `$route.name` 映射配置
// - path - 页面的访问路径
// - head - Document <head>，页面的元信息
module.exports = {
  'index': {
    head: {
      title: '我是首页',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [
      ],
    },
  },
  // - head 可以是一个 `function`
  // - `function` 中会接收过来一个参数 `route`，表示当前页面的路由信息
  // - 可以根据这个做一些动态的配置信息
  // - 比如动态路由生成的页面中的 meta 信息，可能会根据页面内容来决定
  'personalInfo': {
    head (route) {
      const titles = {
        '1': 'ofo小黄车',
        '2': '盒马生鲜',
        '3': '顺丰速运',
      };
      return {
        title: `${titles[route.params.id]}_客户案例-斗米网`,
        meta: [
        ],
        link: [
        ],
      };
    },
  },
};
