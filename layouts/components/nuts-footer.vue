<template>
  <div class="nuts-footer" @click="open">
    <div class="icon">这是图标</div>
  </div>
</template>

<script>
export default {
  name: 'nuts-footer',
  methods: {
    open () {
      this.$toast.show({
        text: '你好',
        position: 'top',
      });
    },
  },
};
</script>

<style scoped>
  .nuts-footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 70px;
    background-color: #ffffff;
  }
</style>
