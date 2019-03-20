<template>
  <div class="featured-project">
    <img src="@/static/image/featuredproject/projectPool.jpg" class="bg">
    <div class="enterBtn" @click="queryStatus"></div>
    <div class="example">
      <div v-for="(item,key) in examples"
           v-bind:key="key"
           @click="openWindow(item)"
           class="item"
           v-bind:style="{backgroundImage: 'url(' + projectImg('case' + (parseInt(key,10)) + '.png') + ')'}"
      ></div>
    </div>

    <base-model v-model="isShowPopup">

    </base-model>

  </div>
</template>

<script>
  import $Auth from '@/plugins/util/authUtil';
  import $Server from '@/server/index';
  import axios from 'axios';
  import _ from 'lodash';
  import BaseModel from '@/components/Model';
  export default {
    name: 'featured-project',
    layout: 'default',
    components: { BaseModel },
    data () {
      return {
        isShowPopup: false, // 是否显示模态框
        slides: [],
        examples: [
          {
            name: '快先森',
            text: '疯狂BP服务案例。快先森是一家同城即时配送企业，业务已覆盖20余城，疯狂BP为其梳理项目商业模式、优化设计。目前已获得天使投资',
            url: 'http://www.sohu.com/a/203330792_118792',
            img: '',
          },
          {
            name: '云开科技',
            text: '国内混合式培训领航者。为超1000家企业提供在线培训，服务客户包括：雀巢、联合利华、可口可乐、建发集团等，获得千万级别融资。',
            url: 'https://www.yunkai.com/',
            img: '',
          },
          {
            name: '笨鸟社交',
            text: '全球化设计数据智能服务平台，已在上海、北京、深圳、广州等地成立分公司。并将拓展香港，新加坡，美国研发与运营中心。获得东方富海千万元A轮融资。',
            url: 'http://www.socialbird.cn/',
            img: '',
          },
        ],
      };
    },
    computed: {
      projectImg () {
        return (name) => {
          return require(`~/static/image/featuredproject/${name}`);
        };
      },
    },
    methods: {
      queryStatus () {
        let isLogin = $Auth.isLogin;
        if (isLogin) {
          this.$store.dispatch('GlobalComponent/show', {
            component: 'BASELOADING',
          });

          // 获取我的BP
          axios.all([this.getSlideList()])
            .then(axios.spread((slides) => {
              console.log(slides);
              this.slides = _.remove(slides.data, (item) => {
                return !item.false_delete_time;
              });
              this.$store.dispatch('GlobalComponent/hide', {
                component: 'BASELOADING',
              });

              this.isShowPopup = true;
            }))
            .catch();
        } else {
          this.$store.dispatch('GlobalComponent/show', {
            component: 'NUTSACCOUNT',
            page: 'login',
          });
        }
      },
      getSlideList () {
        const url = `${$Server.api}/slide`;
        const params = {};
        return $Server.get(url, params);
      },
    },
  };
</script>

<style lang="less" scoped>
  & .featured-project {
    min-width: 1080px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 0;

    & .bg {
      width: 100%;
    }

    & .enterBtn {
      position: absolute;
      width: 14.4%;
      padding-top: 7%;
      left: 61.2%;
      top: 10.6%;
      color: #ffffff;
      font-weight: 400;
      background: #ffc04f;
      font-size: 16px;
      cursor: pointer;
      background: url('~static/image/featuredproject/btn_submit_normal.png');
      background-size: cover;
      background-repeat: no-repeat;
    }

    & .enterBtn:hover {
      background: url('~static/image/featuredproject/btn_submit_hover.png') no-repeat;
      background-size: cover;
    }


    & .example {
      position: absolute;
      width: 62%;
      margin: 0 auto;
      top: 84.4%;
      left: 50%;
      transform: translate(-50%,0);

      & .item {
        position: absolute;
        display: inline-block;
        width: 28%;
        height: 100%;
        padding-top: 31%;
        background-size: contain;
        background-repeat: no-repeat;
        cursor: pointer;
      }

      & .item:hover {
        transition: top 1s ease;
        top: -10px;
      }

      & .item:nth-child(1) {
        left: 0;
      }
      & .item:nth-child(2) {
        left: 37%;
      }
      & .item:nth-child(3) {
        right: 0;
      }
    }
  }
</style>
