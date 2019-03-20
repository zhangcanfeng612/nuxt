<template>
  <div class="nuts-message-box">
    <div :class="['icon icon-notice', {'unread': unReadList.length > 0}]" @click="onChangeStatus"></div>
    <div class="background" v-if="isShow" @click="onChangeStatus"></div>
    <div class="notifications-box" v-if="isShow">
      <div class="header">
        <div class="title">通知</div>
        <div class="actions">
          <i class="twr twr-check">全部标为已读</i>
        </div>
      </div>

      <div class="wrapper" v-if="null">
        <div class="fetch-button">点击加载新通知</div>
        <div class="list">
          <div class="card" v-for="(index) in 5" :key="index"></div>
        </div>
      </div>

      <div class="empty">- 没有新通知 -</div>

      <div class="footer">
        <div>查看全部通知</div>
      </div>
    </div>
  </div>
</template>

<script>
  import $Server from '@/server/index';

  export default {
    name: 'nuts-message-box',
    data () {
      return {
        unReadList: [], // 未读消息列表
        isShow: false,
      };
    },
    methods: {
      onChangeStatus (e) {
        e.preventDefault();
        this.isShow = !this.isShow;
      },
      onNotice () {
        // 浏览器桌面通知
        if (Notification.permission === 'granted') {
          return new Notification('状态更新提醒', {
            body: '你的朋友圈有3条新状态，快去查看吧',
          });
        } else if (Notification.permission === 'denied') {
          console.log('用户拒绝通知');
        } else {
          Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
              console.log('用户允许通知');
            } else if (permission === 'denied') {
              console.log('用户拒绝通知');
            }
          });
        }
      },
      getNotice () {
        // 获取未读消息
        const url = `${$Server.apiV3}/notice/query`;
        const data = {
          read: 0,
        };

        $Server.get(url, data)
          .then((res) => {
            this.unReadList = res.data.list;
          });
      },
    },
    mounted () {
      this.getNotice();
    },
  };
</script>

<style lang="less" scoped>
  & .nuts-message-box {
    display: inline-block;
    float: right;
    height: 100%;
    cursor: pointer;

    & .icon {
      position: relative;
      margin-right: 15px;
      top: 13px;
      height: 44px;
      width: 44px;
      background: none;
      border: none;
      outline: none;
      font-size: 25px;
      color: #969696;
      cursor: pointer;
      text-align: center;

      &:before {
        vertical-align: sub;
      }
    }

    & .unread {
      &:after {
        position: absolute;
        content: "";
        width: 10px;
        height: 10px;
        background-color: red;
        top: 5px;
        right: 10px;
        border-radius: 50%;
      }
    }

    & .background {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    & .notifications-box {
      position: absolute;
      top: 70px;
      left: -160px;
      z-index: 100;
      width: 400px;
      border: 1px solid #e3e3e3;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 8px 12px 0 rgba(0,0,0,.12);

      &:before {
        bottom: 100%;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        top: -22px;
        right: 18px;
        border: solid transparent;
        border-color: transparent transparent #e3e3e3;
        border-width: 11px;
        margin-right: 69px;
        z-index: -1;
      }

      &:after {
        bottom: 100%;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        right: 99px;
        top: -21px;
        border: solid transparent;
        border-color: transparent transparent #fff;
        border-width: 11px;
        margin-right: -12px;
      }
      & .header {
        border-bottom: 1px solid #e3e3e3;
        padding: 10px 16px;

        &:before {
          display: table;
          content: "";
        }

        &:after {
          display: table;
          content: "";
          clear: both;
          height: 0;
          visibility: hidden;
        }

        & .title {
          float: left;
          font-size: 16px;
          font-weight: 600;
          line-height: 24px;

          /*& .link {*/
          /*padding: 0 10px;*/
          /*}*/

          /*& .link:nth-child(2) {*/
          /*position: relative;*/
          /*display: inline-block;*/
          /*padding-left: 10px;*/

          /*&:before {*/
          /*position: absolute;*/
          /*content: "";*/
          /*width: 1px;*/
          /*height: 100%;*/
          /*background-color: #e3e3e3;*/
          /*left: 0;*/
          /*top: 0;*/
          /*}*/
          /*}*/
        }

        & .actions {
          float: right;
          font-size: 12px;
          line-height: 24px;
          outline-color: #ff8847;
          color: #ff8847;
          text-decoration: none;
        }
      }

      & .wrapper {
        overflow: hidden;
        position: relative;

        & .fetch-button {
          display: block;
          background-color: #f6f6f6;
          border: 0;
          color: #777;
          cursor: pointer;
          font-size: 14px;
          line-height: 34px;
          padding: 0;
          width: 100%;
          text-align: center;
        }

        & .list {
          max-height: 68vh;
          padding-right: 0;
          overflow-y: scroll;
          border-radius: 4px 4px 0 0;
          width: 100%;

          & .card {
            height: 40px;

            &:not(:last-child) {
              border-bottom: 1px solid #e3e3e3;
            }
          }
        }
      }

      & .empty {
        width: 100%;
        padding: 40px 0;
        text-align: center;
        font-size: 18px;
        color: #777;
      }

      & .footer {
        background-color: #ff8847;
        border-top: 1px solid #e3e3e3;

        & div {
          color: white;
          display: block;
          font-size: 14px;
          line-height: 20px;
          padding: 12px 16px;
          text-align: center;
        }
      }
    }
  }
</style>
