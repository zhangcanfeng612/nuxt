<template>
  <div class="personal-center-order">
    <div class="list">
      <nuts-order-slide v-for="(item, index) in list" :key="index" :index="index" :bill="item" class="list"></nuts-order-slide>
    </div>
  </div>
</template>

<script>
  import NutsOrderSlide from '@/layouts/components/nuts-order-slide';
  import $Server from '@/server/index';
  import axios from 'axios';
  export default {
    name: 'personal-center-order',
    components: { NutsOrderSlide },
    async asyncData (context) {
      const getOrders = function () {
        const url = `${$Server.apiV3}/order/query-user`;
        const params = {
          pageNum: 1,
          pageSize: 10000000,
          type: 1,
        };
        return $Server.get(url, params);
      };

      return axios.all([getOrders()])
        .then(axios.spread((slides) => {
          return {
            list: slides.data.list,
          };
        }))
        .catch(() => {
          context.error({ statusCode: 404, message: '订单获取失败' });
        });
    },
  };
</script>

<style lang="less" scoped>
 & .personal-center-order {

 }
</style>
