<template>
  <div class="personal-center-coupon">
    <div v-if="this.couponList.length !== 0">
      <div class="tabList">
        <ul>
          <li :class="{active: activeIndex === 1}" @click="changeTab(1)">未使用 ({{ CalcuCouponNum(this.effectiveList) }})</li>
          <li :class="{active: activeIndex === 2}" @click="changeTab(2)">已使用 ({{ CalcuCouponNum(this.usedList) }})</li>
          <li :class="{active: activeIndex === 3}" @click="changeTab(3)">已过期 ({{ CalcuCouponNum(this.expiredList) }})</li>
        </ul>
      </div>
      <div class="rules">
        <div class="title">使用规则</div>
        <ul>
          <li>1.优惠券不可叠加使用，每笔订单只能使用一张优惠券；</li>
          <li>2.优惠券只能用于相同类型的订单；</li>
          <li>3.收到优惠券后尽快在有效期内使用，过期后将失效；</li>
          <li>4.平台会在法律允许的范围内对优惠券规则作出适当调整；</li>
        </ul>
      </div>
      <div class="content">
        <div :class="['lists',{active: activeIndex === 1}]">
          <div
            class="list"
            v-for="(items,indexs) in this.effectiveList"
            v-bind:key="indexs"
            v-if="items.length !== 0">
            <nuts-coupon-card
              @click="onSkipPath(item)"
              class="card"
              :data="item"
              v-for="(item, index) in items"
              v-bind:key="index">
            </nuts-coupon-card>
          </div>
        </div>

        <div :class="['lists',{active: activeIndex === 2}]">
          <div
            class="list"
            v-for="(items,indexs) in this.usedList"
            v-bind:key="indexs"
            v-if="items.length !== 0">
            <nuts-coupon-card
              class="card"
              :data="item"
              v-for="(item, index) in items"
              v-bind:key="index">
            </nuts-coupon-card>
          </div>
        </div>
        <div :class="['lists',{active: activeIndex === 3}]">
          <div
            class="list"
            v-for="(items,indexs) in this.expiredList"
            v-bind:key="indexs"
            v-if="items.length !== 0">
            <nuts-coupon-card
              class="card"
              :data="item"
              v-for="(item, index) in items"
              v-bind:key="index">
            </nuts-coupon-card>
          </div>
        </div>
      </div>
    </div>

    <div v-if="this.couponList.length === 0" class="empty">
      <!--<img :src="this.getUIImage('icon_coupon_empty.png')">-->
    </div>

  </div>
</template>

<script>
  import $Server from '@/server/index';
  import NutsCouponCard from '@/layouts/components/nuts-coupon-card.vue';
  import axios from 'axios';

  export default {
    name: 'personal-center-coupon',
    components: {
      NutsCouponCard,
    },
    data () {
      return {
        activeIndex: 1, // 1:未使用 2:已使用 3:已过期
        list: [],
        effectiveList: [ [], [], [], [] ],
        usedList: [ [], [], [], [] ],
        expiredList: [ [], [], [], [] ],
      };
    },
    methods: {
      getUIImage (fileName) {
        return `${$Server.imgCdn}/007/image/nuts_bp_pc/web4.0/image/${fileName}`;
      },
      changeTab (index) {
        this.activeIndex = index;
      },
      onSkipPath (data) {
        switch (data.type) {
          case 'ppt':
            this.$router.push({
              path: '/Template',
            });
            break;
          case 'deliver':
            this.$router.push({
              path: '/service/investors',
            });
            break;
          case 'diagnosis':
            this.$router.push({
              path: '/service/diagnosis',
            });
            break;
          case 'bpvip':
            this.$router.push({
              path: 'member-center/index',
            });
            break;
        }
      },
      CalcuCouponNum (list) {
        let Num = 0;
        list.forEach(item => {
          Num = Num + item.length;
        });
        return Num;
      },
      init () {
        this.couponList.forEach(item => {
          switch (item.state) {
            case 0:
              switch (item.type) {
                case 'ppt':
                  this.effectiveList[0].push(item);
                  break;
                case 'deliver':
                  this.effectiveList[1].push(item);
                  break;
                case 'diagnosis':
                  this.effectiveList[2].push(item);
                  break;
                case 'bpvip':
                  this.effectiveList[3].push(item);
                  break;
                default:
                  break;
              }
              break;
            case 1:
              switch (item.type) {
                case 'ppt':
                  this.usedList[0].push(item);
                  break;
                case 'deliver':
                  this.usedList[1].push(item);
                  break;
                case 'diagnosis':
                  this.usedList[2].push(item);
                  break;
                case 'bpvip':
                  this.usedList[3].push(item);
                  break;
                default:
                  break;
              }
              break;
            case 3:
              switch (item.type) {
                case 'ppt':
                  this.expiredList[0].push(item);
                  break;
                case 'deliver':
                  this.expiredList[1].push(item);
                  break;
                case 'diagnosis':
                  this.expiredList[2].push(item);
                  break;
                case 'bpvip':
                  this.expiredList[3].push(item);
                  break;
                default:
                  break;
              }
              break;
          }
        });
      },
    },
    created () {
      this.init();
    },
    async asyncData (context) {
      const getCoupon = function () {
        const url = `${$Server.apiV3}/coupon/query-user`;
        const data = [];
        return $Server.get(url, data);
      };

      return axios.all([getCoupon()])
        .then(axios.spread((coupons) => {
          return {
            couponList: coupons.data.list,
          };
        }));
    },
  };
</script>

<style lang="less" scoped>
  & .personal-center-coupon {
    width: 750px;
    height: 700px;
    padding:  50px 40px;
    box-shadow: 5px 7px 5px rgba(12,3,7,0.12);
    box-sizing: border-box;

    & .tabList {
      position: relative;
      margin-top: 40px;
      border-bottom: 1px solid #ff8847;

      & ul {
        position: absolute;
        bottom: 0;
        display: inline-block;
        font-size: 0;
        border: 1px solid #c5c5c5;
        border-bottom: none;
        border-left: none;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      & li {
        display: inline-block;
        height: 37px;
        line-height: 37px;
        text-align: center;
        color: #969696;
        font-size: 14px;
        width: 120px;
        background-color: #f7f7f7;
        border-left: 1px solid #c5c5c5;
        vertical-align: top;
        transition: all .2s ease-in-out;
        overflow: hidden;
        cursor: pointer;
      }

      & li:nth-child(1) {
        border-top-left-radius: 5px;
      }

      & li:nth-child(3) {
        border-top-right-radius: 5px;
      }

      & .active {
        position: relative;
        height: 40px;
        line-height: 40px;
        color: #ff8847;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        vertical-align: bottom;
        border: 1px solid #ff8847;
        border-bottom: none;
        margin-top: -4px;
        margin-left: 0;
        margin-right: -1px;
        background-color: #fff3ec;
        z-index: 100;
      }
    }

    & .rules {
      display: flex;
      height: 110px;
      padding: 30px 21px 0;
      box-sizing: border-box;

      & .title {
        width: 12px;
        font-size: 12px;
        line-height: 13px;
        color: #969696;
        padding-right: 12px;
      }

      & ul {
        color: #505050;
        font-size: 12px;

        & li:not(:first-child) {
          margin-top: 9px;
        }
      }
    }

    & .content {
      & .lists {
        display: none;
        height: 475px;
        overflow: auto;
      }
      & .list {
        /* display: none; */
        padding: 40px 22px 0;
        border-bottom: 1px solid #c8c8c8;
      }


      & .card {
        margin: 0 30px 40px 0;
      }
      & .active {
        display: block;
      }
    }

    & .empty {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-40%,-50%);
      text-align: center;
      color: #969696;
      font-size: 16px;

      & div {
        margin-top: 10px;
      }

      &:after {
        position: absolute;
        content: '当前暂无优惠券';
        width: 100%;
        bottom: -22px;
        left: 0;
      }
    }
  }
</style>
