// - 根据路由 `$route.name` 映射配置
// - path - 页面的访问路径
// - head - Document <head>，页面的元信息
module.exports = {
  'index': {
    head: {
      title: '疯狂BP 在线制作商业计划书，提供精美模板、商业计划书范文、商业计划书范本大全',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '疯狂BP，商业计划书，商业计划书模板，商业计划书范文在线编辑，在线制作、商业计划书范本，商业计划书ppt，bp模板，创业计划书范文，创业计划书范本，大学生创业计划书，天使投资商业计划书，融资，商业计划书怎么写' },
        { hid: 'description', name: 'description', content: '疯狂BP是一个在线创建投资人想要商业计划书的平台，汇集各行业各种风格 - 商业计划书模板、创业计划书模板，提供商业计划书范文、范本教学，手把手教你写商业计划书。高效便捷的满足各类创业者的商业计划书制作需求，更好的启动融资，更好的呈现给天使投资人' },
      ],
      link: [
      ],
    },
  },
  // - head 可以是一个 `function`
  // - `function` 中会接收过来一个参数 `route`，表示当前页面的路由信息
  // - 可以根据这个做一些动态的配置信息
  // - 比如动态路由生成的页面中的 meta 信息，可能会根据页面内容来决定
  // 'personalInfo': {
  //   head (route) {
  //     const titles = {
  //       '1': 'ofo小黄车',
  //       '2': '盒马生鲜',
  //       '3': '顺丰速运',
  //     };
  //     return {
  //       title: `${titles[route.params.id]}_客户案例-斗米网`,
  //       meta: [
  //       ],
  //       link: [
  //       ],
  //     };
  //   },
  // },
};
