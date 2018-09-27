<template>
  <transition name="modal-mask" @after-leave="afterLeave">
    <div :class="['modal-mask']" @click="onClose" v-show="this.page">
      <transition-group name="modal">
          <!-- 登录 -->
          <div :key="0" class="modal-content login" v-show="this.page === 'login'" @click.stop>
            <h2>这是登录窗口</h2>
          </div>

          <!-- 微信登录 -->
          <div :key="1" class="modal-content wxLogin" v-show="this.page === 'wxLogin'" @click.stop>
            <h2>这是微信登录窗口</h2>
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
export default {
  name: 'nuts-account',
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
    onClose () {
      this.$store.dispatch('GlobalComponent/hide', {
        component: 'NUTSACCOUNT',
      });
    },
    afterLeave () {
      this.$emit('afterLeave');
    },
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
</style>
