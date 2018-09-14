<template>
  <div class="default">
    <nuts-header/>
    <nuxt/>
    <nuts-footer/>

    <!-- 全局组件 -->
    <no-ssr>
      <base-loading v-if="GlobalComponentStatus.BASELOADING.show" v-bind="GlobalComponentStatus.BASELOADING.payload" />
    </no-ssr>
  </div>
</template>

<script>
import NutsHeader from '@/layouts/components/nuts-header';
import NutsFooter from '@/layouts/components/nuts-footer';
import $Config from '@/nuxt.config';

// 全局组件(登录弹窗，信息，对话框等)
import BaseLoading from '@/components/BaseLoading';

const heads = seo =>
  function getHeadsMap () {
    const map = {};
    for (const key in seo) {
      map[key] = seo[key].head;
    }
    return map;
  };
const routeMapHead = heads(require('@/static/js/seo.config'));
export default {
  componentName: 'ROOT',
  components: { NutsHeader, NutsFooter, BaseLoading },
  computed: { routeMapHead },
  data () {
    return {
      GlobalComponentStatus: this.$store.state.GlobalComponent,
    };
  },
  head () {
    // SEO 的中心化管理
    const route = this.$route;
    const head = this.routeMapHead[route.name];
    return typeof head === 'function' ? head(route) : head;
  },
  created () {
    console.error(this.$store.state.GlobalComponent.BASELOADING);
    console.error($Config.env);
  },
};
</script>

<style scoped>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #f7f7f7;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.default {
  padding-top: 70px;
}
</style>
