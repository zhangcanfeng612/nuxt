<template>
  <base-model v-model="isShow" :onClose="onClose">
    <div class="content">
      <div class="title">收银台</div>

      <!-- 订单信息 -->
      <div class="info">
        <div class="icon-carry heading"><span>订单详情</span></div>
        <div class="detail">
          <div class="icon icon-diagnosis"></div>
          <div><div class="name">{{ name }}</div><div class="number">订单编号: {{ order.orderNo }}</div></div>
          <div class="price">¥ {{ priceYuan }}</div>
        </div>
      </div>

      <!-- 优惠券 -->
      <div class="coupon">
        <div :class="['heading', 'icon-coupon', { 'emptyCoupon': couponList.length === 0 }]">
          <span v-if="couponList.length === 0">无可用优惠券</span>
          <span v-else>使用优惠劵</span>
        </div>
        <div class="list" v-if="couponList.length !== 0">
          <nuts-coupon-card :class="['card', {'active': currentCoupon === 'item'}]"
                            v-for="(item, index) in couponList"
                            :data="item"
                            v-bind:key="index">
          </nuts-coupon-card>
        </div>
      </div>

      <!-- 付款方式: 余额 -->
      <div class="balance">
        <div class="number icon-balance2"><span>余额 (¥ {{ balanceYuan }}) </span></div>
        <base-switch-btn class="switchBtn"></base-switch-btn>
      </div>

      <!-- 付款方式: 微信支付宝 & 合计 -->
      <div class="calculation">
        <div class="left">
          <div :class="['payButton alipay', {'selected': payWay === 'ALIPAY'}]" @click="onChosePayWay('ALIPAY')" :style="alipayImage"><span class="checkmark"></span></div>
          <div :class="['payButton wechat', {'selected': payWay === 'WECHAT'}]" @click="onChosePayWay('WECHAT')" :style="wechatImage"><span class="checkmark"></span></div>
        </div>
        <div class="right">
          <div class="calcu">
            <div>优惠劵: - ¥ {{ orderCouponYuan }}</div>
            <div><span>余额</span>: - ¥ {{ orderBalanceYuan }}</div>
          </div>
          <div class="total"><span>合计</span>: ¥ {{ totalYuan }}</div>
        </div>
      </div>

      <!-- 声明 -->
      <div class="mark">*您可点击头像选择【订单管理】申请开具发票</div>

      <!-- 页脚  -->
      <div class="footer">
        <div class="remainTime">剩余付款时间: {{ time }}<span></span></div>
        <base-button class="payBtn" :disabled="isDisable" @click="onPay">付款</base-button>
      </div>

      <!--  微信支付弹窗 -->
      <no-ssr>
        <base-modal v-model="isShowWepay" :backdrop="isShowWepay">
          <div class="popupWepay">
            <div class="heading">微信支付</div>
            <div class="qrcode">

            </div>
            <div class="tip">扫一扫二维码</div>
          </div>
        </base-modal>
      </no-ssr>
    </div>
  </base-model>
</template>

<script>
  import BaseSwitchBtn from '@/components/switchBtn/switchBtn';
  import BaseButton from '@/components/button/button.vue';
  import NutsCouponCard from '@/layouts/components/nuts-coupon-card.vue';
  import $Server from '@/server/index';
  import $HelperUtil from '@/plugins/util/helperUtil.js';
  import BaseModal from '@/components/Model';
  import { mapState } from 'vuex';
  import _ from 'lodash';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    props: ['show'],
    data () {
      return {
        isShow: this.show,

        time: '00:00',
        payWay: 'ALIPAY', // ALIPAY || WECHAT || ''
        isBlance: false, // 是否使用余额
        isCoupon: false, // 是否使用优惠券
        isDisable: true,
        isShowWepay: false,
      }
    },
    watch: {
      show (val) {
        this.isShow = val;
      },
      payWay (val) {
        console.log('更换支付方式:', val);
      },
    },
    components: {
      BaseSwitchBtn, BaseButton, NutsCouponCard, BaseModal,
    },
    computed: {
      ...mapState({
        signInfo: state => state.PersonalInfo.SIGNINFO.data.data,
        cardInfo: state => state.PersonalInfo.CARDINFO.data.data,
      }),
      alipayImage () {
        return `backgroundImage:url(${$Server.imgCdn}/007/image/nuts_bp_pc/web4.0/image/pay_icon_alipay.png)`;
      },
      wechatImage () {
        return `backgroundImage:url(${$Server.imgCdn}/007/image/nuts_bp_pc/web4.0/image/pay_icon_wechatpay.png)`;
      },
      balanceYuan () {
        return $HelperUtil.parseCent(this.bank.balance);
      },
      name () {
        if (this.type === 'ghostwrite') {
          return this.order.ghostwrite.name;
        } else if (this.type === 'diagnosis') {
          return this.order.diagnosis.name;
        } else if (this.type === 'ppt') {
          return `PPT模板 - ${this.templateName}`;
        } else if (this.type === 'user/vip') {
          return this.order.vip.name;
        } else if (this.type === 'deliver') {
          // 投资人名字
          return '这里显示投资人名字';
        }
      },
      priceYuan () {
        return $HelperUtil.parseCent(this.order.price);
      },
    },
    methods: {
      init () {
        // 订单倒计时
        this.onTimer();
        // 计算订单金额
        this.onCalculationPrice();
      },
      onClose () {
        this.$store.dispatch('GlobalComponent/hide', {
          component: 'NUTSPAY',
        });
        this.isShow = false;
      },
      onTimer () {
        const timeLeft = this.serverTimestamp - this.order.createTimestamp;
        let timeRemain = 900000 - timeLeft;
        if (timeRemain <= 0) {
          this.isDisable = true;
          this.$store.dispatch('GlobalComponent/show', {
            component: 'BASEMODAL',
            type: 'fail',
            sloter: '订单超时',
            callback: () => {
              this.$router.push({
                path: '/personal-center/users/order',
              });
            },
          });
          return '00:00';
        } else {
          let timer = (timestemp) => {
            let nowTime = new Date(timestemp); // 15 分钟
            let min = nowTime.getMinutes();
            let sec = nowTime.getSeconds();
            this.time = `${_.padStart(min, 2, '0')}:${_.padStart(sec, 2, '0')}`;
            let calculate = timestemp - 1000;
            if (calculate < 0) {
              this.isDisable = true;
              // 订单超时
            } else {
              this.isDisable = false;
              setTimeout(timer.bind(this, calculate), 1000);
            }
          };
          timer(timeRemain);
        }
      },
      onCalculationPrice () {
        let $totalCent = this.order.price; // 合计金额
        let $balanceCent = this.bank.balance; // 账户余额
        let $couponCent = (Object.keys(this.currentCoupon).length === 0) ? 0 : this.currentCoupon.price; // 优惠券金额

        this.orderCouponYuan = $HelperUtil.parseCent($couponCent);
        this.orderBalanceYuan = $HelperUtil.parseCent($balanceCent);

        // 总计价格 = 订单价格 - (优惠券价格) - (余额价格): 以分为单位计算,最后转为元
        if (this.isBlance && this.isCoupon) {
          // 优先抵扣优惠券金额
          if (($totalCent - $couponCent <= 0)) {
            $totalCent = ($totalCent - $couponCent <= 0) ? 0 : $totalCent - $couponCent;
            this.isBlance = false;
          } else {
            $totalCent = ($totalCent - $couponCent - $balanceCent <= 0) ? 0 : $totalCent - $couponCent - $balanceCent;
          }
        } else if (this.isBlance && !this.isCoupon) {
          $totalCent = ($totalCent - $balanceCent <= 0) ? 0 : $totalCent - $balanceCent;
        } else if (!this.isBlance && this.isCoupon) {
          $totalCent = ($totalCent - $couponCent <= 0) ? 0 : $totalCent - $couponCent;
        }

        this.totalYuan = $HelperUtil.parseCent($totalCent);
      },
      onChosePayWay (val) {
        this.payWay = val;
      },
      onPay () {
        // let account = '';
        // switch (this.payWay) {
        //   case 'WECHAT':
        //     this.isShowWepay = true;
        //     account = 'prepay-qr-code-base64';
        //     break;
        //   case 'ALIPAY':
        //     account = 'fast-instant-trade-pay';
        //     break;
        //   default:
        //     account = 'balance';
        //     break;
        // }
        //
        // this.onHandelPay();
      },
      onHandelPay () {
        // let route = '';
        // switch (this.type) {
        //   case 'ghostwrite':
        //     route = '/ghostwrite/log/pay';
        //     break;
        //   case 'diagnosis':
        //     route = '/diagnosis/log/pay';
        //     break;
        //   case 'ppt':
        //     route = '/ppt/buy/pay';
        //     break;
        //   case 'user/vip':
        //     route = '/user/vip/log/pay';
        //     break;
        //   case 'deliver':
        //     route = '/deliver/pay';
        //     break;
        // }
      },
    },
    created () {
      this.init();
    },
    async asyncData (context) {
      // 订单类型: 请根据后端开出的接口命名: ghostwrite(代写订单) || diagnosis(诊断订单) || ppt || user/vip(会员订单) || deliver(投递)
      let type = qs.parse(context.query).type || '';
      let id = qs.parse(context.query).id || '';
      let uuid = qs.parse(context.query).u || '';

      // 排序
      const compare = (value) => {
        return function (obj1, obj2) {
          let val1 = obj1[value];
          let val2 = obj2[value];
          if (val1 < val2) { // 正序
            return 1;
          } else if (val1 > val2) {
            return -1;
          } else {
            return 0;
          }
        };
      };

      if (type && id) {
        // 查询订单
        const getOrder = function () {
          const url = (type === 'deliver') ? `${$Server.apiV3}/${type}/find` : `${$Server.apiV3}/${type}/log/find`;
          const data = {
            id: id,
            user: uuid,
          };
          return $Server.get(url, data);
        };

        // 获取优惠券信息
        const getCoupon = function () {
          const url = `${$Server.apiV3}/coupon/query-user`;
          const data = {
            type: type,
            state: 0,
          };
          return $Server.get(url, data);
        };

        // 获取用户储值信息
        const getBank = function () {
          const url = `${$Server.apiV3}/account/merge`;
          const data = {
            user: uuid,
          };
          return $Server.get(url, data);
        };

        // 查询当前订单占用的优惠券信息
        const occupyCoupon = function () {
          const url = `${$Server.apiV3}/coupon/find`;
          const data = {
            id: id,
          };
          return $Server.get(url, data);
        };

        // 获取服务器时间 (需要修改: 服务器时间不能在服务器获取,会造成误差)
        const getServerTime = function () {
          const url = `${$Server.apiV3}/tephra/ctrl/status`;
          const data = {};
          return $Server.get(url, data);
        };

        // 确定当前优惠券信息
        const checkCoupon = function (couponList, occupyCoupon) {
          console.log('占用的优惠券:', occupyCoupon);
          if (Object.keys(occupyCoupon).length === 0) {
            if (couponList.length !== 0) {
              return couponList[0];
            } else {
              return {};
            }
          } else {
            return occupyCoupon;
          }
        };

        return axios.all([getOrder(), getCoupon(), getBank(), occupyCoupon(), getServerTime()])
          .then(axios.spread((order, coupons, bank, occupyCoupon, serverTime) => {
            const couponList = coupons.data.list.sort(compare('amount'));
            const currentCoupon = checkCoupon(couponList, occupyCoupon.data);
            return {
              order: order.data, // 订单信息
              couponList: couponList, // 优惠券列表
              bank: bank.data, // 余额
              type: type, // 订单类型
              serverTimestamp: serverTime.data.timestamp, // 服务器时间
              currentCoupon: currentCoupon, // 当前优惠券
            };
          }));
      } else {
        // 订单查询失败
        this.$store.dispatch('GlobalComponent/show', {
          component: 'BASEMODAL',
          type: 'fail',
          sloter: '订单查询失败',
          callback: () => {
            this.$router.push({
              path: '/personal-center/users/order',
            });
          },
        });
      }
    },
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


