<template>
  <base-model v-model="isShow" :onClose="onClose">
    <div class="content">
      <h1>基础弹窗</h1>
    </div>
  </base-model>
</template>

<script>
  import BaseModel from '@/components/Model';
  export default {
    props: ['show'],
    data () {
      return {
        isShow: this.show,
      }
    },
    watch: {
      show (val) {
        this.isShow = val;
      },
    },
    components: {
      BaseModel,
    },
    methods: {
      onClose () {
        this.$store.dispatch('GlobalComponent/hide', {
          component: 'NUTSPOPUPS',
        });
        this.isShow = false;
      },
    }
  }
</script>

<style lang="less" scoped>
  & .content {
    position: relative;
    width: 470px;
    height: 470px;
    background-color: #fff;
    border-radius: 5px;
    z-index: 1000;
    box-sizing: border-box;
  }
</style>
