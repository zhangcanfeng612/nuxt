<template>
  <div class="personal-center-account">
    <div class="list">

      <div class="card">
        <div class="icon icon-bind_phone"></div>
        <div class="title">手机</div>
        <div class="info unbind" v-if="!phone" @click="onBindingPhone">绑定</div>
        <div class="info">{{ phone }}</div>
      </div>

      <div class="card">
        <div class="icon icon-bind_wechat"></div>
        <div class="title">微信</div>
        <div class="info unbind" v-if="!wechat" @click="onBindingWechat">绑定</div>
        <div class="info">{{ wechat }}</div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'personal-center-account',
    data () {
      return {
        phone: '',
        wechat: '',
      };
    },
    computed: {
      ...mapState({
        signInfo: state => state.PersonalInfo.SIGNINFO.data.data,
        cardInfo: state => state.PersonalInfo.CARDINFO.data.data,
      }),
    },
    methods: {
      init () {
        console.error(this.signInfo);
        this.signInfo.auth.forEach(item => {
          if (item.type === 1) {
            this.phone = item.uid;
            return;
          }
          if (item.type === 2 || item.type === 3) {
            this.wechat = item.nick;
          }
        });
      },
      onBindingWechat () {
      // TODO: 绑定微信
      },
      onBindingPhone () {
      // TODO: 绑定手机

      },
    },
    mounted () {
      this.init();
    },
  };
</script>

<style lang="less" scoped>
  & .personal-center-account {
    padding:  0 0 40px;
    width: 750px;
    height: 700px;
    max-height: 750px;
    box-sizing: border-box;
    overflow: auto;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 5px 7px 5px rgba(12,3,7,0.12);

    & .card:not(:last-child) {
      border-bottom: 1px solid #c8c8c8;
    }

    & .card {
      position: relative;
      height: 97px;
      line-height: 103px;
      width: 650px;
      margin: 0 auto;

      & div {
        display: inline-block;
      }

      & .title {
        margin-left: 10px;
        font-size: 13px;
        color: #787878;
      }

      & .icon {
        font-size: 30px;
        margin-left: 49px;
        vertical-align: bottom;
      }

      & .icon-bind_phone {
        color: #000000;
      }

      & .icon-bind_wechat {
        color: #47b134;
      }

      & .info {
        position: absolute;
        right: 50px;
        color: #787878;
        font-size: 14px;

        & .icon-left::before {
          transform:scaleX(-1);
        }
      }

      & .unbind {
        width: 90px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #ff8847;
        cursor: pointer;
        color: #ff8847;
        margin-top: 40px;
        font-size: 14px;
        border-radius: 5px;
      }
    }
  }
</style>
