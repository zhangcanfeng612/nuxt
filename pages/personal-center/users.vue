<template>
  <div class="container">
    <div class="tabs">
      <ul>
        <li><nuxt-link :to="{path: '/personal-center/users/info'}">个人中心</nuxt-link></li>
        <li><nuxt-link :to="{path: '/personal-center/users/order'}">订单管理</nuxt-link></li>
        <li><nuxt-link :to="{path: '/personal-center/users/account'}">账号绑定</nuxt-link></li>
        <li><nuxt-link :to="{path: '/personal-center/users/password'}">修改密码</nuxt-link></li>
        <li><nuxt-link :to="{path: '/personal-center/users/permission'}">权限设置</nuxt-link></li>
        <li><nuxt-link :to="{path: '/personal-center/users/coupon'}">我的优惠券</nuxt-link></li>
      </ul>
    </div>
    <div class="content">
      <nuxt-child/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personal-center',
    middleware: 'auth',
  };
</script>

<style lang="less" scoped>
  & .container {
    width: 750px;
    margin: 120px auto 0;

    & .tabs {
      width: 100%;
      font-size: 14px;

      & ul {
        & {
          & li {
            position: relative;
            display: inline-block;
            height: 30px;
            padding: 0 10px;
            /*cursor: pointer;*/
            margin-left: 15px;

            & a {
              color: #969696;
              width: 100%;
              height: 100%;
              display: inline-block;
              z-index: 10;
            }

            & .nuxt-link-active {
              color: #ff8847;

              &:before {
                position: absolute;
                content: "";
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-bottom: 2px solid #ff8847;
              }
            }

            &:before {
              position: absolute;
              content: "";
              top: 0;
              left: 100%;
              width: 0;
              height: 100%;
              border-bottom: 2px solid #ff8847;
              transition: 0.2s all linear;
              z-index: -10;
            }

            &:hover:before {
              width: 100%;
              top: 0;
              left: 0;
              transition-delay: 0.1s;
              border-bottom-color: #ff8847;
              z-index: -1;
            }
          }

          & li:hover ~ li::before {
            left: 0;
          }

          & li:active {
            background: #ff8847;
            color: #fff;
          }
        }
      }
    }

    & .content {
      margin-top: 2px;
      width: 750px;
      height: 700px;
      max-height: 750px;
      box-sizing: border-box;
      overflow: auto;
      background-color: #fff;
    }
  }

</style>
