<template>
  <div class="default">
    <nuts-header v-if="isHeaderActive"/>
    <nuxt/>
    <nuts-footer v-if="isFooterActive"/>
    <!-- 全局组件 -->
    <no-ssr>
      <div class="GlobalComponent">
        <base-loading v-if="GlobalComponentStatus.BASELOADING.payload.show"
                      v-bind="GlobalComponentStatus.BASELOADING.payload" />

        <base-modal v-model="GlobalComponentStatus.BASEMODAL.payload.show"
                    v-bind="GlobalComponentStatus.BASEMODAL.payload"
                    :backdrop=true />

        <nuts-account v-model="GlobalComponentStatus.NUTSACCOUNT.payload.show"
                      v-bind="GlobalComponentStatus.NUTSACCOUNT.payload" />
      </div>
    </no-ssr>
  </div>
</template>

<script>
  import NutsHeader from '@/layouts/components/nuts-header';
  import NutsFooter from '@/layouts/components/nuts-footer';
  // import $Config from '@/nuxt.config';

  // 全局组件(登录弹窗，信息，对话框等)
  import BaseLoading from '@/components/BaseLoading';
  import BaseModal from '@/components/BaseModal';

  // 疯狂BP业务弹窗
  import NutsAccount from '@/layouts/popups/nuts-account';

  import { mapState } from 'vuex';
  // import axios from 'axios';
  import $Server from '@/server/index';

  const heads = seo =>
    function getHeadsMap () {
      const map = {};
      for (const key in seo) {
        map[key] = seo[key].head;
      }
      return map;
    };
  const routeMapHead = heads(require('@/static/js/seo.config'));
  export default {
    componentName: 'ROOT',
    middleware: 'init',
    components: {
      NutsHeader,
      NutsFooter,
      BaseLoading,
      BaseModal,
      NutsAccount,
    },
    computed: {
      routeMapHead,
      ...mapState({
        signInfo: state => state.PersonalInfo.SIGNINFO.data.data,
        cardInfo: state => state.PersonalInfo.CARDINFO.data.data,
      }),
      isHeaderActive () {
        return this.$route.path !== '/featured-project';
      },
      isFooterActive () {
        return this.$route.path !== '/featured-project';
      },
    },
    data () {
      return {
        GlobalComponentStatus: this.$store.state.GlobalComponent,
      };
    },
    head () {
      // SEO 的中心化管理
      const route = this.$route;
      const head = this.routeMapHead[route.name];
      return typeof head === 'function' ? head(route) : head;
    },
    // 注意：beforeCreate与created在客户端与服务端均会被调用
    beforeCreate () {
      $Server.init();
      // console.log(`是否登录${$Auth.isLogin()}`);
    },
    created () {
      console.log('cardInfo', this.cardInfo);
      console.log('signInfo', this.signInfo);
      // console.log(this.GlobalComponentStatus.BASEMODAL.payload.slot);
      // console.log(`env:${$Config.env.NODE_ENV}`);
    },
    mounted () {
      /**
       * @param {String}  message    错误信息
       * @param {String}  source    出错文件
       * @param {Number}  lineno    行号
       * @param {Number}  colno    列号
       * @param {Object}  error  Error对象（对象）
       */
      window.onerror = function (message, source, lineno, colno, error) {
        console.log('捕获到异常：', {message, source, lineno, colno, error});
      };

      // 捕获全局错误
      window.addEventListener('error', (error) => {
        console.log('error触发');
        this.$store.dispatch('GlobalComponent/show', {
          component: 'BASEMODAL',
          type: 'fail',
          sloter: error.message,
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        event.preventDefault();
        this.$store.dispatch('GlobalComponent/show', {
          component: 'BASEMODAL',
          type: 'fail',
          sloter: 'reject error',
        });
      });

      window.addEventListener('rejectionhandled', (error) => {
        event.preventDefault();
        console.log('rejectionhandled触发');
        this.$store.dispatch('GlobalComponent/show', {
          component: 'BASEMODAL',
          type: 'fail',
          sloter: error.message,
        });
      });
    },
  };
</script>

