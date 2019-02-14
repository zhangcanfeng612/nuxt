<template>
  <div class="recycle">
    <h1>回收站</h1>
  </div>
</template>

<script>
  export default {
    name: 'recycle',
    middleware: 'auth',
  };
</script>

<style lang="less" scoped>
  & .recycle{
    padding-top: 100px;
  }
</style>
