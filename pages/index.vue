<template>
  <section class="container">
    <div @click="onBouncePage('personalInfo')">点击跳转</div>
    <h2>{{ $store.state.counter.visible }}记录于localstorage</h2>
    <button @click="addVal">add</button>
    <button @click="lessVal">less</button>
    <div>{{ AcceptData }}</div>
    <div>{{ project }}</div>
    <button @click="onLoading">点击loading</button>
    <button @click="onModal">点击显示模态框</button>
    <div class="icon-edit">全局css-fonttell</div>
    <button @click="onNutsAccount">点击显示登录弹窗</button>
  </section>
</template>

<script>
import $Server from '../service';
export default {
  data () {
    return { project: 'default' };
  },
  methods: {
    onBouncePage (page) {
      page = page || '/';
      this.$router.push({
        path: page,
        params: {
          page: '页面传递参数',
        },
      });
    },
    addVal () {
      this.$store.dispatch('counter/add', {visible: this.$store.state.counter.visible});
    },
    lessVal () {
      this.$store.dispatch('counter/less', {visible: this.$store.state.counter.visible});
    },
    onLoading () {
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASELOADING',
        title: '你好',
        text: '数据成功传输',
      });
    },
    onModal () {
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASEMODAL',
        sloter: '你好',
      });
    },
    onNutsAccount () {
      this.$store.dispatch('GlobalComponent/show', {
        component: 'NUTSACCOUNT',
        page: 'wxLogin',
      });
    },
  },
  async asyncData (context) {
    const url = 'https://httpbin.org/get';
    const data = {};
    return $Server.get(url, data)
      .then((res) => {
        return { AcceptData: res.headers.Accept };
      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'Post not found' });
      });
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>

<style lang="less" scoped>
.container {
  color: red;
}

button {
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: aqua;
  border: 1px solid #ff8847;
  margin: 20px;
}
</style>
