<template>
  <transition name="modal-mask" @after-leave="afterLeave">
    <div :class="['modal-mask']" @click="onClose" v-show="this.page">
      <transition-group name="modal">
          <!-- 登录 -->
          <div :key="0" class="modal-content login" v-show="this.page === 'login'" @click.stop>
            <div class="line">
              <base-icon-input
                iconClass="icon-phone"
                placeholder="请输入手机号码"
              ></base-icon-input>
            </div>
          </div>

          <!-- 微信登录 -->
          <div :key="1" class="modal-content wxLogin" v-show="this.page === 'wxLogin'" @click.stop>
            <div id="wechatQrcode"></div>
          </div>

          <!-- 忘记密码 -->
          <div :key="2" class="modal-content forget" v-show="this.page === 'forget'" @click.stop>
            <h2>这是忘记密码窗口</h2>
          </div>

          <!-- 注册账号 -->
          <div :key="3" class="modal-content registered" v-show="this.page === 'registered'" @click.stop>
            <h2>这是注册账号窗口</h2>
          </div>
      </transition-group>
    </div>
  </transition>
</template>

<script>
import { BaseInput, BaseIconInput } from '@/components/input/index.js';
export default {
  name: 'nuts-account',
  components: {
    BaseInput, BaseIconInput,
  },
  props: {
    page: {
      type: String,
      default: 'wxLogin',
    },
    backdrop: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    init () {
      this.onInitQrCode();
    },
    onInitQrCode () {
      const appId = 'wx9e39b0caa894a15f';
      // let returnUrl = '';
      const redirectUri = encodeURIComponent('http://api.ranch.nutsbp.com/redirect?key=test.nutsbp.sign-in.qr');
      var obj = new WxLogin({
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
    onClose () {
      this.$store.dispatch('GlobalComponent/hide', {
        component: 'NUTSACCOUNT',
      });
    },
    afterLeave () {
      this.$emit('afterLeave');
    },
  },
  mounted () {
    this.init();
  },
};
</script>

<style lang="less" scoped>
  .content {
    // position: absolute;
    width: 470px;
    height: 470px;
    // left: 50%;
    // top: 50%;
    // transform: translate(-50%,-50%);
    background-color: #fff;
    // box-sizing: border-box;
    border-radius: 5px;
    z-index: 1000;
    box-sizing: border-box;
  }

  #wechatQrcode {
    width: 300px;
    height: 180px;
  }
</style>
