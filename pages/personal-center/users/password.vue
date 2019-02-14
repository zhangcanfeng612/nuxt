<template>
  <div class="personal-center-password">
    <!-- 旧密码 -->
    <base-icon-input
      iconClass="icon-password"
      class="input"
      :type="'password'"
      placeholder="请输入旧密码"
      v-model.lazy="oldPassword"
      :errorMsg="oldPasswordErrorMsg"
    ></base-icon-input>
    <!-- 新密码 -->
    <base-icon-input
      iconClass="icon-password"
      class="input"
      :type="'password'"
      :isError="!isPasswordPass"
      placeholder="请输入新密码"
      v-model.lazy="newPassword"
      :errorMsg="newPasswordErrorMsg"
    ></base-icon-input>
    <!-- 重复密码 -->
    <base-icon-input
      iconClass="icon-password"
      class="input"
      :type="'password'"
      :isError="!isPasswordPass"
      placeholder="请再次确认新密码"
      v-model.lazy="rePassword"
      :errorMsg="rePasswordErrorMsg"
    ></base-icon-input>

    <base-button class="enterBtn" @click="onConfirm">确定</base-button>

  </div>
</template>

<script>
  import { BaseIconInput } from '@/components/input/index';
  import BaseButton from '@/components/button/button.vue';

  export default {
    name: 'personal-center-password',
    components: { BaseIconInput, BaseButton },
    data () {
      return {
        oldPassword: '',
        newPassword: '',
        rePassword: '',
        oldPasswordErrorMsg: '',
        newPasswordErrorMsg: '',
        rePasswordErrorMsg: '',
      };
    },
    computed: {
      isPhone (phone) {
        return phone.trim() !== '';
      },
      isPasswordPass () {
        return this.newPassword.length >= 6 && this.newPassword === this.rePassword;
      },
    },
    methods: {
      onConfirm () {
        let error;
        if (this.oldPassword === '') {
          error = new Error('请输入旧密码');
          this.oldPasswordErrorMsg = error;
        } else if (this.newPassword.length < 6) {
          error = new Error('密码长度至少6位');
          this.newPasswordErrorMsg = error;
        } else if (this.oldPassword.length < 6) {
          error = new Error('密码长度至少6位');
          this.oldPasswordErrorMsg = error;
        } else if (!this.isPasswordPass) {
          error = new Error('两次输入的密码不一致');
          this.rePasswordErrorMsg = error;
        } else {
          // TODO: 密码修改成功 -> 退出登录
          // TODO: err.code === 4012 旧密码错误
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  &.personal-center-password {
    padding:  50px 0 40px;
    width: 750px;
    height: 700px;
    background-color: rgba(255, 255, 255, 1);
    color: #787878;
    box-shadow: 5px 7px 5px rgba(12,3,7,0.12);
    overflow: auto;
    box-sizing: border-box;

    & .input {
      position: relative;
      margin: 135px auto 0;
      width: 300px;
    }

    & .input:not(:first-child) {
      margin: 20px auto 0;
    }

    & .enterBtn {
      width: 300px;
      height: 40px;
      display: block;
      margin: 60px auto 0;
    }
  }
</style>
