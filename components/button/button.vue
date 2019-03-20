<template>
  <button
    :disabled="isDisable ? 'disabled' : false"
    class="orange"
    @click="click">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      child: {
        type: null,
        default: '',
      },
      isDisable: false,
    },
    methods: {
      click () {
        return this.$emit('click');
      },
    },
  };
</script>

<style scoped lang="less">
  button {
    position: relative;
    display: inline-block;
    font-size: 20px;
    border: 1px solid rgba(255,115,45,1);
    border-radius: 3px;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
  }

  button:disabled {
    color: rgba(180,180,180,1) !important;
    background-color: rgba(235,235,235,1) !important;
    border-color: rgba(235,235,235,1) !important;
    cursor: not-allowed !important;
  }

  .orange {
    color: rgba(255,255,255,1);
    background-color: rgba(255,136,71,1);
    border-color: rgba(255,115,45,1);
  }

  .orange:hover {
    color: rgba(255,255,255,1);
    background-color: rgba(255,115,45,1);
  }


  .white {
    color: rgba(120,120,120,1);
    background-color: rgba(235, 235, 235, 1);
    border-color: rgba(200,200,200,1);
  }

  .white:hover {
    color: rgba(120,120,120,1);
    background-color: rgba(200,200,200,1);
  }


</style>
