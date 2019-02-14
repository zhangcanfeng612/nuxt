<template>
  <div class="personal-center-info">
    <no-ssr>
      <div v-if="signInfo && cardInfo">
        <div class="avatar">
          <span class="title">头像</span>
          <button @click.prevent.stop="onClickUpload" :class="['image', {'icon icon-personal': src === ''}]">
            <img :src="headSrc" />
            <div class="edit"><span>编辑</span></div>
          </button>
          <input ref="uploader" @change="onUploadImage" type="file" accept="image/png,image/jpeg" name="file" class="input-file"/>
          <div class="idCode" v-if="signInfo"><span>ID：{{ signInfo.code }}</span></div>
        </div>

        <div class="memberInfo">
          <div class="grade">
            <span class="title">会员</span>
            <span class="info">{{ memberGrade }}<nuxt-link class="btn" :to="{path: '/member-center'}" v-if="signInfo.bpGrade < 2">升级</nuxt-link></span>
          </div>
          <div class="term" v-if="signInfo.bpGrade !== 0">
            <span>会员期限:</span>
            <span>{{ memberTerm }}</span>
          </div>
        </div>


        <div class="table">
          <div class="line">
            <span class="title"><div class="value">昵称</div></span>
            <base-input
              class="input"
              v-model="nickname"
            ></base-input>
          </div>

          <div class="line">
            <span class="title"><div class="value">姓名</div></span>
            <base-input
              class="input"
              v-model="realname"
            ></base-input>
          </div>

          <div class="line phoneLine">
            <span class="title"><div class="value">手机号</div></span>
            <base-input
              class="input"
              v-model="phone"
              :readonly=true
            ></base-input>
            <base-button class="changeBtn" @click="showChangePhoneDialog">更改</base-button>
          </div>

          <div class="line">
            <span class="title"><div class="value">邮箱</div></span>
            <base-input
              class="input"
              v-model="email"
            ></base-input>
          </div>

          <div class="line">
            <span class="title"><div class="value">微信</div></span>
            <base-input
              class="input"
              v-model="weixin"
            ></base-input>
          </div>

          <div class="line">
            <span class="title"><div class="value">公司名称</div></span>
            <base-input
              class="input"
              v-model="company"
            ></base-input>
          </div>

          <div class="line">
            <span class="title"><div class="value">职位</div></span>
            <base-input
              class="input"
              v-model="duty"
            ></base-input>
          </div>

          <div class="line">
            <span class="title"><div class="value">我的余额</div></span>
            <div class="account"><span>0.00</span>元</div>
          </div>
        </div>

        <base-button class="enterBtn">保存修改</base-button>

        <no-ssr>
          <!-- 修改手机号弹窗 -->
          <base-modal v-model="show" :backdrop="show">
            <div class="popupModify">
              <div class="title">手机号修改</div>
              <div class="line">
                <base-icon-input class="input-box"></base-icon-input>
              </div>
              <div class="line">
                <base-icon-input class="input-box"></base-icon-input>
                <base-button class="btn">发送验证码</base-button>
              </div>
              <base-button class="btn">确定</base-button>
            </div>
          </base-modal>
        </no-ssr>

      </div>
    </no-ssr>
  </div>
</template>

<script>
  import BaseModal from '@/components/Model';
  import { BaseInput, BaseIconInput } from '@/components/input/index';
  import BaseButton from '@/components/button/button.vue';
  import { mapState } from 'vuex';
  import $Server from '@/server/index';

  export default {
    name: 'personal-center-info',
    components: {
      BaseModal, BaseInput, BaseIconInput, BaseButton,
    },
    data () {
      return {
        src: '', // 用户上传头像
        show: false,
      };
    },
    methods: {
      onClickUpload () {
        const input = this.$refs.uploader;
        input.click();
      },
      onUploadImage () {
        // 上传头像
      },
      showChangePhoneDialog () {
        // 修改手机
        this.show = true;
      },
      onClose () {
        this.show = false;
      },
    },
    computed: {
      ...mapState({
        signInfo: state => state.PersonalInfo.SIGNINFO.data.data,
        cardInfo: state => state.PersonalInfo.CARDINFO.data.data,
      }),
      nickname () {
        return this.cardInfo.nickname;
      },
      realname () {
        return this.cardInfo.realname;
      },
      phone () {
        return this.cardInfo.phone;
      },
      email () {
        return this.cardInfo.email;
      },
      weixin () {
        return this.cardInfo.weixin;
      },
      company () {
        return this.cardInfo.company.name;
      },
      duty () {
        return this.cardInfo.duty.name;
      },
      headSrc () {
        if (this.src === '' || this.src === undefined) {
          return (this.cardInfo) ? this.cardInfo.avatar.url : `${$Server.imgCdn}/007/image/nuts_bp_pc/web4.0/image/setup_head.jpg`;
        } else {
          return this.src;
        }
      },
      memberGrade () {
        switch (this.signInfo.bpGrade) {
          case 0:
            return '普通用户';
          case 1:
            return '白银会员';
          case 2:
            return '黄金会员';
          default:
            break;
        }
      },
      memberTerm () {
        if (this.signInfo.bpVip !== 0 && this.signInfo.bpVip) {
          const date = new Date(this.signInfo.bpVip);
          return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  & .personal-center-info {
    display: block;
    width: 400px;
    margin: 0 auto;

    & .avatar {
      position: relative;
      display: inline-block;
      margin: 40px 0 15px 0;

      & .title{
        display: inline-block;
        font-size: 13px;
        color: rgba(120,120,120,1);
        width: 66px;
        text-align: justify;
        text-align-last: justify;

        &:after{
          display: inline-block;
          content: '';
          width: 100%;
          height: 0;
        }
        &:before{
          position: absolute;
          left: 70px;
          content: '\FF1A';
        }
      }

      & .image {
        position: relative;
        display: inline-block;
        margin-left: 20px;
        width: 80px;
        height: 80px;
        vertical-align: middle;
        background-color: rgba(235,235,235,1);
        border: 1px solid rgba(200,200,200,1);
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
        outline: none;
        color: rgba(200,200,200,1);
        font-size: 35px;
        text-align: center;
        cursor: pointer;

        & img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        & .edit {
          display: none;
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          color: #c5c5c5;
          font-size: 12px;
          text-align: center;
        }

      }

      & .image:hover {
        & .edit {
          display: block;
        }
      }

      & input.input-file {
        position: relative;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        visibility: hidden;
        z-index: -1;
      }

      & .idCode {
        float: right;
        padding-top: 8px;
        color: #787878;
        font-size: 14px;
      }
    }

    & .memberInfo {
      display: flex;
      font-size: 14px;
      & .grade {
        display: flex;

        & .title {
          position: relative;
          display: inline-block;
          color: #787878;
          width: 66px;
          text-align: justify;
          text-align-last: justify;

          &:after{
            display: inline-block;
            content: '';
            width: 100%;
            height: 0;
          }
          &:before{
            position: absolute;
            left: 70px;
            content: '\FF1A';
          }
        }
        & .info {
          padding-left: 25px;
        }
      }

      & .term {
        flex: 1;
        text-align: right;
        &:nth-child(1) {
          color: #787878;
        }
        &:nth-child(2) {
          color: #505050;
        }
      }
    }


    & .table {

      & .line {
        position: relative;
        display: flex;
        margin-top: 20px;

        & .title {
          /*position: absolute;*/
          height: 38px;
          line-height: 38px;
          width: 66px;
          margin-right: 15px;
          text-align: center;
          text-align-last: justify;
          color: #787878;

          &:after {
            display: inline-block;
            content: '';
            width: 100%;
            height: 0;
          }

          &:before {
            position: absolute;
            left: 70px;
            top: 2px;
            content: '\FF1A';
          }
        }


        & .input-box {
          width: 330px;
        }

        &:nth-child(2):before,
        &:nth-child(3):before,
        &:nth-child(5):before {
          position: absolute;
          content: "*";
          top: 15px;
          left: -15px;
          color: #ff8847;
        }

        & .account {
          line-height: 38px;
          font-size: 18px;
          color: #787878;
          & span {
            font-size: 20px;
            color: #ff8847;
          }
        }
      }

      & .phoneLine {
        & .input {
          width: 220px;
        }

        & .changeBtn {
          width: 100px;
          height: 38px;
          border: 1px solid #ff8847;
          background-color: #fff3ec;
          color: #ff8847;
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }

    & .enterBtn {
      display: block;
      width: 100%;
      height: 40px;
      margin: 10px auto;
      font-size: 14px;
    }

    & .popupModify {
      padding: 0 50px;
      & .title {
        font-size: 24px;
        display: block;
        margin: 50px auto 57px;
        color: #505050;
      }
      & .line {
        margin-bottom: 20px;

        & .input-box {
          width: 300px;
        }

        &:nth-child(2) {

        }
      }
    }
  }
</style>
