<template>
  <section class="container">
    <h2 @click="onBouncePage()">这是另一个页面</h2>
  </section>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: '',
    },
  },
  methods: {
    onBouncePage (page) {
      page = page || '/';
      this.$router.push({
        path: page,
        query: {page: '你好'},
      });
    },
  },
};
</script>

<style scoped>
  .container {
    color: black;
  }
</style>
