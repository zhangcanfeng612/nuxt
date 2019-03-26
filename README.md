![](https://i.loli.net/2018/11/27/5bfce3cac5a2a.png)

## 构建安装程序(最好使用yarn)

``` bash
# 安装依赖
$ yarn install # Or yarn install

# 服务将热更新运行于 localhost:3000
$ yarn run dev

# 构建项目 & 运行服务
$ yarn run build
$ yarn start

# 生成静态项目
$ yarn run generate
```

有关工作原理的详细说明，请查看[Nuxt.js docs]（https://github.com/nuxt/nuxt.js）

## 项目目录说明
```
|-- code
    |-- .eslintrc.json       // eslint 配置文件
    |-- nuxt.config.js       // webpack配置 & 代理设置 & 404页面设置等,详情见(https://github.com/nuxt/nuxt.js)
    |-- package.json         // 依赖
    |-- .nuxt                // 忽略
    |-- assets               // 此目录包含未编译的资源，例如LESS、SASS或JavaScript。
    |-- components           // 公共组建库
    |-- dist                 // 静态文件目录 static 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。
    |-- layouts              // 用于组织应用的布局组件。
    |-- middleware           // 用于存放应用的中间件
    |-- pages                // 页面目录 pages 用于组织应用的路由及视图。
    |-- plugins              // 用于组织那些需要在 根vue.js应用 实例化之前需要运行的Javascrip插件 && 公共的方法库
    |-- server               // 封装axios
    |-- static               // 存放部分静态资源: 如svg、jquery、SEO配置文件等
    |-- store                // 目录用于组织应用的 Vuex 状态树 文件。
```



