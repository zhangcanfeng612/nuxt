<template>
  <div :class="['bill-list', {'invalidOrder': (this.state === 4)}]">
    <div class="title">
      <span class="time-title">订单时间</span>
      <span class="date">{{bill.create}}</span>
      <span class="status">{{status}}</span>
    </div>
    <div class="box">
      <div class="detail">
        <div :class="['icon', listData.icon]"></div>
        <div class="text">
          <div>{{listData.name}}</div>
          <div>{{`订单编号:${bill.orderNo}`}}</div>
        </div>
        <div class="price">¥{{price}}</div>
      </div>
      <div v-if="isShowBtn" class="operating">
        <base-button class="btn white" @click="cancelBill">取消</base-button>
        <base-button class="btn" @click="payBill">{{btnText}}</base-button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import BaseButton from '@/components/button/button.vue';
  export default {
    name: 'BillList',
    components: {
      BaseButton,
    },
    props: {
      index: {
        type: Number,
        default: 0,
        required: true,
      },
      bill: {
        type: Object,
        default: {},
        required: true,
      },
    },
    data () {
      return {
        isLoading: false,
        state: this.bill.state,
        btnText: '',
      };
    },
    computed: {
      listData () {
        const type = this.bill.orderType;
        let data = {};
        switch (type) {
          case 'ranch.lawyer.log': // 法律咨询
            data.name = '法律咨询';
            data.icon = 'icon-law';
            break;
          case 'ranch.ghostwrite.log': // 代写
            data.name = this.bill.ghostwrite.name;
            data.icon = 'icon-edit';
            break;
          case 'ranch.deliver': // 投递
            data.name = `付费投递-${this.bill.investorName}`;
            data.icon = 'icon-mail';
            break;
          case 'ranch.diagnosis.log': // 诊断
            data.name = this.bill.diagnosis.name;
            data.icon = 'icon-diagnosis';
            break;
          case 'ranch.ppt.buy': // PPT购买
            data.name = (this.bill.templateName) ? `PPT模板 - ${this.bill.templateName}` : 'PPT模板';
            data.icon = 'icon-ppt';
            break;
          case 'ranch.user.vip.log': // 会员
            data.name = this.bill.vip.name;
            data.icon = 'icon-member';
        }
        return data;
      },
      price () {
        return this.parseCent(this.bill.price);
      },
      status () {
        const status = this.state;
        let statusText = '';
        switch (status) {
          case 1:
            statusText = '已支付';
            break;
          case 2:
            if (this.bill.orderType === 'ranch.user.vip.log') {
              statusText = '已失效';
            } else {
              statusText = '已支付';
            }
            break;
          case 3:
            statusText = '已完成';
            break;
          case 4:
            statusText = '已失效';
            break;
          case 5:
            statusText = '已退款';
            break;
          default:
            statusText = '待支付';
            this.onTimer();
        }
        return statusText;
      },
      isShowBtn () {
        return this.state === 0;
      },
    },
    methods: {
      parseCent (value) {
        const main = Math.floor(value / 100);
        const min = value % 100;
        return `${main}.${_.padStart(min, 2, 0)}`;
      },
      onTimer () {
        const bill = this.bill;
        const timeLeft = new Date() - new Date(Date.parse(bill.create.replace(/-/g, '/')));
        let timeRemain = 900000 - timeLeft;
        if (timeRemain <= 0) {
          this.state = 4;
          this.btnText = '';
          return '00:00';
        } else {
          let timer = (timestemp) => {
            let nowTime = new Date(timestemp); // 15 分钟
            let min = nowTime.getMinutes();
            let sec = nowTime.getSeconds();
            let formatTime = `${_.padStart(min, 2, '0')}:${_.padStart(sec, 2, '0')}`;
            this.btnText = `付款( ${formatTime} ) `;
            let calculate = timestemp - 1000;
            if (calculate < 0) {
              this.state = 4;
              this.btnText = '';
            } else {
              this.isDisable = false;
              setTimeout(timer.bind(this, calculate), 1000);
            }
          };
          timer(timeRemain);
        }
      },
      cancelBill () {
      //  TODO:取消订单
      },
      payBill () {
        const type = this.bill.orderType;

        switch (type) {
          case 'ranch.lawyer.log':
            this.$router.push({
              path: `/PayPage/lawyer/${this.bill.id}`,
            });
            break;
          case 'ranch.deliver':
            this.$router.push({
              path: `/PayPage/deliver/${this.bill.id}`,
            });
            break;
          case 'ranch.ghostwrite.log':
            this.$router.push({
              path: `/PayPage/ghostwrite/${this.bill.id}`,
            });
            break;
          case 'ranch.diagnosis.log':
            this.$router.push({
              path: `/PayPage/diagnosis/${this.bill.id}`,
            });
            break;
          case 'ranch.ppt.buy':
            this.$router.push({
              path: `/PayPage/ppt/${this.bill.id}`,
            });
            break;
          case 'ranch.user.vip.log':
            this.$router.push({
              path: `/PayPage/member/${this.bill.id}`,
            });
        }
      },
    },
  };
</script>

<style scoped lang="less">
  .bill-list {
    position: relative;
    margin: 0 auto 30px;
    width: 650px;
    border: 1px solid rgba(200,200,200,1);
    border-radius: 5px;
    overflow: hidden;

    & .title {
      position: relative;
      height: 40px;
      background-color: rgba(235,235,235,1);
      color: #505050;
      font-size: 14px;
      line-height: 40px;

      & .time-title {
        margin-left: 30px;
      }

      & .date {
        margin-left: 10px;
      }

      & .status {
        float: right;
        margin-right: 30px;
      }
    }

    & .box {
      position: relative;
      width: 100%;
      border-top: 1px solid rgba(200,200,200,1);

      & .detail {
        position: relative;
        height: 85px;
        color: rgba(120,120,120,1);

        & .icon {
          position: relative;
          display: inline-block;
          margin: 20px 20px 0 30px;
          font-size: 45px;
          color: #ff8847;
        }

        & .text {
          position: relative;
          display: inline-block;
          margin-top: 20px;
          vertical-align: top;
          color: #505050;
          font-size: 16px;

          & div {
            margin-bottom: 15px;
          }

          & div:nth-child(2) {
            font-size: 14px;
          }
        }

        & .price {
          position: absolute;
          padding: 35px 30px 0 0;
          top: 0;
          right: 0;
          font-size: 18px;
          color: #505050;
        }
      }

      & .operating {
        position: relative;
        padding-bottom: 26px;
        text-align: right;

        & .btn {
          font-size: 12px;
          margin-right: 30px;
          width: 100px;
          height: 30px;
          border-radius: 5px;
        }

        & .btn:nth-child(1) {
          margin-right: 15px;
        }
      }
    }
  }
  .bill-list:not(:first-child){
    margin-top: 30px;
  }


  .invalidOrder {
    & .title {
      color: #787878;
    }

    & .box {
      & .detail {
        & .text {
          color: #969696;
        }
        & .price {
          color: #969696;
        }
      }
    }
  }
</style>
