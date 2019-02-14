<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">页面不存在</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/" class="link">返 回 首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: '404', // 你可以为错误页面指定自定义的布局
};
</script>

<style lang="less" scoped>
  & .container {
    height: 300px;
    padding-top: 180px;
    text-align: center;
    color: white;

    & h1 {
      font-size: 42px;
    }

    & .link {
      display: inline-block;
      padding: 10px;
      font-size: 24px;
      border: 1px solid white;
      color: white!important;
      cursor: pointer;
      margin-top: 50px;
      border-radius: 5px;
    }
  }
</style>
