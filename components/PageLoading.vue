<template lang="html">
  <div class="loading-page" v-if="loading">
    <div class="background">
      <img src="@/static/image/loading-bars.svg">
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start () {
      this.loading = true;
    },
    finish () {
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 1000;

  .background {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999999;
    background-color: rgba(0,0,0,0.2);
  }

  img {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>
