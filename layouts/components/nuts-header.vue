<template>
  <div class="nuts-header" id="header" :transparent-mode="[$route.path === '/']">
    <nuxt-link :to="{ path: '/' }" class="logo"></nuxt-link>
    <ul class="nav-bar">
      <li><nuxt-link :to="{path: '/template'}" data-state-active="false" title="疯狂BP-模版">模版</nuxt-link></li>
      <li><nuxt-link :to="{path: '/service/ghost'}" data-state-active="false" title="疯狂BP-BP定制">BP定制</nuxt-link></li>
      <li><a href="http://www.nutsbp.com/html/Venture_Source/" title="疯狂BP-创业干货" target="_blank">创业干货</a></li>
      <li><nuxt-link :to="{path: '/resource/business-plan'}" data-state-active="false" title="疯狂BP-BP范文">BP范文</nuxt-link></li>
      <li><a href="http://www.nutsbp.com/bp-teaching" title="疯狂BP-BP教学" target="_blank">BP教学</a></li>
      <li><nuxt-link :to="{path: '/service/investors'}" data-state-active="false" title="疯狂BP-找投资人">找投资人</nuxt-link></li>
    </ul>

    <!-- 登录信息 -->
    <no-ssr>
      <div class="login-info">
        <div v-if="!isLogin">
          <base-button class="loginBtn" @click="onLogin">登录&nbsp;/&nbsp;注册</base-button>
        </div>
        <div v-if="isLogin">
          <div class="avatar" @mouseover="isShowMenu = true">
            <div class="head"><img :src="headSrc" /></div>
          </div>

          <!-- 消息管理 -->
          <nuts-message-box></nuts-message-box>

          <nuxt-link :to="{ path: '/nutsbp/mybp' }" class="mybp">我的BP</nuxt-link>
        </div>
      </div>
    </no-ssr>

    <!-- 菜单 -->
    <no-ssr>
      <div class="personalCenterBox" v-if="isShowMenu">
        <div class="background" @click="isShowMenu = false"></div>
        <ul @mouseleave="isShowMenu = false">
          <li>ID: {{ signInfo.code }}</li>
          <li><nuxt-link :to="{path: '/personal-center/users/info'}">个人中心</nuxt-link></li>
          <li><nuxt-link :to="{path: '/personal-center/users/order'}">订单管理</nuxt-link></li>
          <li><nuxt-link :to="{path: '/personal-center/users/account'}">账号绑定</nuxt-link></li>
          <li><nuxt-link :to="{path: '/member-center/index'}">会员中心</nuxt-link></li>
          <li>福利邀请</li>
          <li @click="onLayout">退出账号</li>
        </ul>
      </div>
    </no-ssr>
  </div>
</template>

<script>
  import BaseButton from '@/components/button/button.vue';
  import $Server from '@/server/index';
  import $Auth from '@/plugins/util/authUtil';
  import { mapState } from 'vuex';
  import axios from 'axios';
  import $Cookie from '@/plugins/util/cookieUtil';
  import $Localstorage from '@/plugins/util/storageUtil';

  import NutsMessageBox from '@/layouts/components/nuts-message-box.vue';

  let isLogin = $Auth.isLogin;

  // const getCardInfo = (uuid) => {
  //   const url = `${$Server.api}/user/${uuid}/cardinfo`;
  //   const params = {};
  //   return $Server.get(url, params);
  // };

  const getSysMsg = () => {
    const url = `${$Server.apiV3}/notice/query`;
    const params = {};
    return $Server.get(url, params);
  };
  export default {
    name: 'nuts-header',
    components: { BaseButton, NutsMessageBox },
    data () {
      return {
        isLogin: isLogin,
        isShowMenu: false, // 是否显示投下下拉框
      };
    },
    methods: {
      onLogin () {
        this.$store.dispatch('GlobalComponent/show', {
          component: 'NUTSACCOUNT',
          page: 'login',
          callback: function () {
            this.$router.push({
              path: '/nutsbp/mybp',
            })
          }
        });
      },
      onLayout () {
        this.isShowMenu = false;

        // 删除store
        this.$store.dispatch('PersonalInfo/save', {
          type: 'CARDINFO',
        });
        this.$store.dispatch('PersonalInfo/save', {
          type: 'SIGNINFO',
        });
        // 删除localstorage
        $Localstorage.delete('NUTSBP');
        $Localstorage.delete('nutsbp_data');

        // 删除cookie
        $Cookie.delete('nutsbp_user', window.location.hostname);

        // 跳转首页
        this.$router.push({
          path: '/',
        });
      },
      // init () {
      //   axios.all([getCardInfo(this.signInfo.id), getSysMsg()])
      //     .then(axios.spread((cardInfo, sysMsg) => {
      //       this.$store.dispatch('PersonalInfo/save', {
      //         type: 'CARDINFO',
      //         data: cardInfo.data,
      //       });
      //       // TODO: 处理系统消息
      //       console.log(sysMsg);
      //     }))
      //     .catch((e) => {
      //       console.log(e);
      //     });
      // },
      init () {
        axios.all([getSysMsg()])
          .then(axios.spread((sysMsg) => {
            // TODO: 处理系统消息
            console.log(sysMsg);
          }))
          .catch((e) => {
            console.log(e);
          });
      },
    },
    watch: {
      '$store.state.PersonalInfo.SIGNINFO': {
        handler: function (newer, older) {
          this.isLogin = $Auth.isLogin;
          return (this.isLogin) ? this.init() : () => {};
        },
        deep: true, // 开启深度监听
      },
    },
    computed: {
      ...mapState({
        signInfo: state => state.PersonalInfo.SIGNINFO.data.data,
        cardInfo: state => state.PersonalInfo.CARDINFO.data.data,
      }),
      headSrc () {
        return (this.cardInfo) ? this.cardInfo.avatar.url : `${$Server.imgCdn}/007/image/nuts_bp_pc/web4.0/image/setup_head.jpg`;
      },
    },
    mounted () {
      console.log('当前路径:', this.$route.path);
    },
  };
</script>

<style lang="less" scoped>
  & .nuts-header {
    position: fixed;
    /*min-width: 1200px;*/
    width: 100%;
    height: 70px;
    top: 0;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    z-index: 9999;

    & .logo {
      display: block;
      position: absolute;
      top: 15px;
      left: 50px;
      width: 107px;
      height: 40px;
      background: content-box url('~static/image/logo.png') no-repeat;
    }

    & .nav-bar {
      width: 675px;
      margin: 0 auto;
      padding: 0;
      zoom: 1;

      & li {
        float: left;
        list-style: none;
        cursor: pointer;

        & a {
          display: block;
          position: relative;
          margin: 0 24px;
          padding: 24px 8px 25px;
          color: #969696;
          font-size: 14px;
          line-height: 1.5;
          text-decoration: none;

          &:hover {
            color: #ff8847;
            &:after {
              width: 100%;
            }
          }

          &:after {
            content: "";
            display: inline-block;
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #ff8847;
            transition: width .3s;
          }
        }
      }
    }

    & .login-info {
      position: absolute;
      right: 35px;

      & .loginBtn {
        float: left;
        width: 90px;
        margin: 20px 0 20px 10px;
        padding: 5px 0 4px;
        font-size: 14px;
        line-height: 1.5;
        background-color: #ff8847;
        border: none;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
      }

      & .mybp {
        display: inline-block;
        float: right;
        width: 100px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        text-align: center;
        background-color: #ff8847;
        border-radius: 5px;
        font-size: 14px;
        margin: 19px 20px 19px 0;
      }

      & .avatar {
        position: relative;
        float: right;
        cursor: pointer;

        & .head {
          position: relative;
          display: inline-block;
          margin: 10px 0 10px 10px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #c8c8c8;
          cursor: pointer;

          & img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }

    & .personalCenterBox {
      position: fixed;
      width: 100%;
      height: 100%;
      text-align: center;
      z-index: 100;


      & .background {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      & ul {
        position: absolute;
        top: 70px;
        right: 29px;
        width: 135px;
        color: #c8c8c8;
        background-color: #fff;
        box-shadow: 0 3px 8px #c8c8c8;
        border-radius: 5px;
        font-size: 14px;

        & li {
          position: relative;
          width: 100%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          color: #969696;

          & a {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: #969696;
          }

          &:not(:first-child) {
            cursor: pointer;
          }

          &:nth-child(2):before,
          &:nth-child(5):before,
          &:nth-child(7):before {
            position: absolute;
            content: '';
            width: 80%;
            height: 1px;
            background-color: #c8c8c8;
            top: 0;
            left: 50%;
            transform: translate(-50%,0);
          }

          &:hover:not(:first-child) {
            background-color: #f5f5f5;
            color: #505050;

            & a {
              color: #505050;
            }
          }
        }

      }
    }
  }

  & .nuts-header[transparent-mode=true] {
    background-color: transparent;
    box-shadow: none;

    & .logo {
      background: content-box url('~static/image/logo-white.png') no-repeat;
    }

    & .logininfo {
      & .loginBtn {
        background-color: white;
        color: #ff8847;
      }
    }

    & a {
      color: white;

      &:hover {
        color: white!important;
      }

      &:hover:after {
        background-color: white!important;
      }
    }
  }

  & .nuts-header[transparent-mode=false] {
    background-color: white;
  }

</style>
