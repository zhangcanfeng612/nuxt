<template>
  <base-model v-model="isShow" :onClose="onClose">
    <div class="content">
      <!-- 登录页 -->
      <div :key="0" class="login" v-show="showPage === 'login'" @click.stop>
        <div class="link" @click="changePage('wxLogin')">
          <div class="switch icon-qrcode2"></div>
          <div class="bubble">
            <span class="triangle"></span>
            <span class="text">二维码登录</span>
          </div>
        </div>

        <div class="title">登录</div>
        <div class="line">
          <base-icon-input type="text" v-model="accountInput" iconClass="icon-phone"></base-icon-input>
        </div>
        <div class="line">
          <base-icon-input type="text" v-model="passwordInput" iconClass="icon-password"></base-icon-input>
        </div>
        <div class="forgetBtn"><span @click="showPage = 'forget'">忘记密码?</span></div>

        <base-button class="btn" @click="onLogin">登录</base-button>
      </div>

      <!-- 微信登录 -->
      <div :key="1" class="wxLogin" v-show="showPage === 'wxLogin'" @click.stop>
        <div class="link" @click="changePage('login')">
          <div class="switch icon-account"></div>
          <div class="bubble">
            <span class="triangle"></span>
            <span class="text">手机登录</span>
          </div>
        </div>
        <div class="title">微信扫码进行注册/登录</div>
        <div id="wechatQrcode"></div>
        <div class="prompt">
          <span>已有手机账号的用户，请点左上角手机登录</span>
          <span >手机账号登录后前往个人中心绑定微信号</span>
          <span >下次可以扫码登录</span>
        </div>
      </div>

      <!-- 忘记密码 -->
      <div :key="2" class="forget" v-show="showPage === 'forget'" @click.stop>
        <div class="title">忘记密码</div>
        <div class="line">
          <base-icon-input type="text" v-model="forgetIhoneInput" iconClass="icon-phone"></base-icon-input>
        </div>

        <div class="line code">
          <base-icon-input type="text" v-model="forgetCodeInput" iconClass="icon-phone" class="input"></base-icon-input>
          <base-button class="codeBtn">发送验证码</base-button>
        </div>

        <div class="line">
          <base-icon-input type="text" v-model="forgetPasswordInput" iconClass="icon-phone"></base-icon-input>
        </div>

        <div class="line">
          <base-icon-input type="text" v-model="reForgetPasswordInput" iconClass="icon-phone"></base-icon-input>
        </div>

        <base-button class="btn">确定</base-button>

        <div class="footer"><span>已有账号？</span><span @click="changePage('login')">返回登录</span></div>
      </div>

      <!-- 注册账号 -->
      <div :key="3" class="registered" v-show="showPage === 'registered'" @click.stop>
        <h2>这是注册账号窗口</h2>
      </div>

      <!-- copyRight -->
      <div class="copyRight">© 2015 Nutsbp.com, All Rights Reserved.</div>
    </div>
  </base-model>
</template>

<script>
  import { BaseInput, BaseIconInput } from '@/components/input/index';
  import BaseButton from '@/components/button/button.vue';
  import BaseModel from '@/components/Model';
  import $Server from '@/server/index';
  import $cookie from '@/plugins/util/cookieUtil.js';
  import $storage from '@/plugins/util/storageUtil.js';

  export default {
    name: 'nuts-account',
    components: {
      BaseInput, BaseIconInput, BaseModel, BaseButton,
    },
    data () {
      return {
        accountInput: '',
        passwordInput: '',
        isShow: this.show,
        showPage: this.page,

        // 忘记密码:
        forgetIhoneInput: '',
        forgetCodeInput: '',
        forgetPasswordInput: '',
        reForgetPasswordInput: '',
      };
    },
    props: ['page', 'show', 'returnUrl', 'callback'],
    watch: {
      show (val) {
        this.isShow = val;
      },
      page (val) {
        this.showPage = val;
      },
    },
    methods: {
      init () {
        return (this.page === 'wxLogin') ? this.onInitQrCode() : () => {};
      },
      changePage (val) {
        this.showPage = val;
        return (val === 'wxLogin') ? this.onInitQrCode() : () => {};
      },
      onInitQrCode () {
        const appId = 'wx9e39b0caa894a15f';
        // let returnUrl = '';
        const redirectUri = encodeURIComponent('http://api.ranch.nutsbp.com/redirect?key=test.nutsbp.sign-in.qr');
        let obj = new WxLogin({
          self_redirect: true,
          id: 'wechatQrcode',
          appid: appId,
          scope: 'snsapi_login',
          redirect_uri: redirectUri,
          style: 'black',
          href: `https://bp.nutsbp.nutsb.com/static/css/wechartQrcode.css`,
          // href: `http://localhost:8990/static/css/wechartQrcode.css`, // 调试微信二维码样式
        });
        return obj;
      },
      onLogin () {
        const url = `${$Server.apiV3}/user/sign-in`;
        const data = {
          uid: this.accountInput,
          password: this.passwordInput,
          type: 1,
        };
        $Server.post(url, data)
          .then((res) => {
            $cookie.set('nutsbp_user', { sid: $storage.get('sessionId') }, 1, window.location.hostname);
            this.$store.dispatch('PersonalInfo/save', {
              type: 'SIGNINFO',
              data: res.data,
            });

            const id = res.data.id;
            this.onQueryUserInfo(id, () => {
              this.onClose();
              return { AcceptData: res.data };
            });

            // TODO: 获取系统消息

            this.callback();
          });
      },
      onClose () {
        this.$store.dispatch('GlobalComponent/hide', {
          component: 'NUTSACCOUNT',
        });
        this.isShow = false;
      },
      onQueryUserInfo (id, callback) {
        const url = `${$Server.api}/user/${id}/cardinfo`;
        const params = {};
        $Server.get(url, params)
          .then((res) => {
            this.$store.dispatch('PersonalInfo/save', {
              type: 'CARDINFO',
              data: res.data,
            });
            callback();
          });
      },
    },
    created () {
      this.init();
    },
  };
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

    & .link {
      display: block;
      position: relative;
      z-index: 100;

      & .switch {
        position: absolute;
        top: 13px;
        left: 13px;
        color: #ff8847;
        font-size: 28px;
        cursor: pointer;
        z-index: 100000000;

        &:after {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          top: 1px;
          left: 5px;
          border-bottom: 30px solid #fff;
          border-left: 30px solid transparent;
        }
      }

      & .bubble {
        position: absolute;
        width: 83px;
        left: 60px;
        top: 20px;
        font-size: 0;

        & .triangle {
          position: absolute;
          top: 10px;
          left: -8px;
          display: inline-block;
          transform: rotate(45deg);
          width: 7px;
          height: 7px;
          border-width: 0 0 1px 1px;
          border-color: #ff8847;
          border-style: solid;
          background-color: #fff3ec;
        }

        & .text {
          display: inline-block;
          height: 18px;
          line-height: 18px;
          margin-left: -8px;
          border-radius: 3px;
          background: #fff3ec;
          border: 1px solid #ff8847;
          padding: 4px 11px;
          font-size: 10px;
          color: #ff8847;
          font-weight: 400;
        }
      }


    }

    & .login {

      & .title {
        position: relative;
        height: 145px;
        color: #787878;
        font-size: 26px;
        line-height: 145px;
        text-align: center;
        font-weight: 400;
      }

      & .line {
        padding: 0 85px;
        margin-bottom: 20px;
      }

      & .forgetBtn {
        width: 300px;
        display: block;
        margin: 0 auto;
        color: #787878;
        font-size: 12px;
        text-align: right;

        & span {
          cursor: pointer;
        }
      }

      & .btn {
        position: relative;
        display: block;
        margin: 64px auto 0;
        width: 300px;
        height: 40px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
      }
    }

    & .wxLogin {

      & .title {
        font-size: 16px;
        padding: 91px 0 15px;
      }

      & .link {
        & .text {
          margin-left: -19px;
        }
      }

      & #wechatQrcode {
        min-width: 180px;
        height: 180px;
        background-size: cover;
      }

      & .prompt {
        color: #787878;
        font-size: 12px;
        margin-top: 30px;

        & span {
          display: block;
          margin-bottom: 9px;
          color: #505050;
        }

        & span:nth-child(1) {
          color: #ff8847;
          font-size: 16px;
        }

        & span:nth-child(2) {
          display: block;
          margin-bottom: 9px;
          color: #505050;
        }

        & span:nth-child(3) {
          display: block;
          margin-bottom: 9px;
          color: #505050;
        }
      }

    }

    & .forget {
      & .title {
        position: relative;
        padding: 52px 0 35px;
        color: #787878;
        font-size: 26px;
        text-align: center;
      }

      & .line {
        position: relative;
        width: 100%;
        padding: 0 85px;
        margin-bottom: 20px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }

      & .code {
        display: flex;

        & .input {
          width: 170px;
          margin-right: 20px;
        }

        & .codeBtn {
          width: 110px;
          height: 40px;
          font-size: 12px;
          border: 1px solid #ff8847;
          color: #ff8847;
          background-color: #fff3ec;
        }
      }

      & .btn {
        position: relative;
        display: block;
        margin: 40px auto 0;
        width: 300px;
        height: 40px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
      }

      & .footer {
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #787878;

        & span:nth-child(2) {
          color: #ff8847;
          cursor: pointer;
          text-decoration: none;
        }
      }
    }

    & .copyRight {
      position: absolute;
      bottom: -30px;
      width: 100%;
      font-weight: 400;
      font-size: 12px;
      left: 0;
      color: #fff;
      text-align: center;
    }
  }


</style>
