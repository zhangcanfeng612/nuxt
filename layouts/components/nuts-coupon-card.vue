<template>
  <div class="nuts-coupon-card" v-bind:style="{backgroundImage:'url(' + background + ')'}" @click="onClick">
    <div class="info">
      <div class="name">{{ title }}</div>
      <div class="date">{{ date }}</div>
    </div>
    <div class="price">¥<span>{{ price }}</span></div>
  </div>
</template>

<script>
  export default {
    name: 'nuts-coupon-card',
    props: {
      data: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    methods: {
      getImage (fileName) {
        return require(`~/static/image/coupon/${fileName}`);
      },
      onClick () {
        this.$emit('click', this.data);
      },
    },
    computed: {
      title () {
        switch (this.data.type) {
          case 'ppt':
            return 'PPT模板优惠劵';
          case 'deliver':
            return 'BP投递优惠劵';
          case 'diagnosis':
            return 'BP诊断优惠劵';
          case 'bpvip':
            return '会员优惠券';
        }
      },
      date () {
        return `有效期至: ${this.data.validity}`;
      },
      price () {
        return this.data.amount / 100;
      },
      background () {
        let url = '';
        switch (this.data.state) {
          case 0:
            switch (this.data.type) {
              case 'ppt':
                url = this.getImage('coupon_template.png');
                break;
              case 'deliver':
                url = this.getImage('coupon_delivery.png');
                break;
              case 'diagnosis':
                url = this.getImage('coupon_diagnosis.png');
                break;
              case 'bpvip':
                url = this.getImage('coupon_member.png');
            }
            break;
          case 1:
            url = this.getImage('coupon_used.png');
            break;
          case 3:
            url = this.getImage('coupon_expired.png');
            break;
        }
        return url;
      },
    },
  };
</script>

<style lang="less" scoped>
  & .nuts-coupon-card {
    display: inline-flex;
    width: 240px;
    height: 70px;
    background-color: transparent;
    cursor: pointer;

    & .info {
      width: 165px;
      color: #505050;
      font-size: 14px;

      & .name {
        padding: 16px 16px 0;
      }

      & .date {
        width: 200%;
        font-size: 20px;
        transform: scale(.5);
        transform-origin: left;
        padding: 0 0 0 32px;
        margin-top: 7px;
      }
    }

    & .price {
      flex: 1;
      line-height: 70px;
      font-size: 14px;
      color: #ffffff;
      padding-left: 10px;

      & span {
        font-size: 24px;
        padding-left: 5px;
      }
    }
  }
</style>
