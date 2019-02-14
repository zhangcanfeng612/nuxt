<template>
  <section class="site">
    <div class="area1">
      <div class="container">
        <div class="intro">
          <div class="parall one"></div>
          <div class="parall two"></div>
          <div class="parall three"></div>
          <div class="parall four"></div>
          <div class="parall five"></div>
          <div class="parall six"></div>
        </div>
        <h1>在线制作</h1>
        <h1>投资人想要的商业计划书</h1>
        <nuxt-link :to="{path: '/template'}">
          <base-button class="creatBtn">立即创建</base-button>
        </nuxt-link>
      </div>
    </div>

    <div class="area2">
      <h3>强大功能</h3>
      <h4>满足制作专业BP的所有需求</h4>
      <div class="list">
        <div class="card" v-for="(item,index) in features" :key="index">
          <div class="upper"  v-bind:style="{backgroundImage:'url(' + item.img + ')'}">
            <em :class="['icon', item.svg]"></em><span>{{ item.upper[0] }}</span><span>{{ item.upper[1] }}</span>
          </div>
          <div class="lower">{{ item.lower }}</div>
        </div>
      </div>
    </div>

    <div class="area3">
      <h3>全方位的BP制作及后续服务</h3>
      <h4>助力你的早期创业与融资</h4>
      <div class="list">
        <div class="card" v-for="(item,index) in service" :style="{backgroundImage:'url(' + item.img + ')'}" :key="index"></div>
      </div>
    </div>

    <div class="area4">
      <h3>8万+创业者的共同选择</h3>
      <div class="content">
        <div v-swiper:serviceCompanySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(index) in 5" :key="index">
              <img :src="siteImg(`customer_logo${index}.png`)" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets swiper-service-company-pagination"></div>
          <div class="swiper-button-prev swiper-service-company-button-prev"></div><!--左箭头-->
          <div class="swiper-button-next swiper-service-company-button-next"></div><!--右箭头-->
        </div>
      </div>
    </div>

    <div class="area5">
      <h3>辅助创业者获得上亿融资</h3>
      <div class="list">
        <a :href="item.caseUrl" class="item" v-for="(item,index) in financingCase" :key="index" target="_blank">
          <img :src="item.caseImg" />
        </a>
      </div>
    </div>

    <div class="area6">
      <h3>入驻投资人</h3>
      <div class="list">
        <div class="row" v-for="(item, index) in source.investor_array" :key="index" v-if="index < 3">
          <a :href="item.investorUrl" target="_blank">
            <div class="card">
              <img :src="item.investorImg">
              <div class="name">{{ item.investorName }}</div>
              <div class="job"><span>{{ item.investorTitle }}</span></div>
              <div class="area">
                <span>{{ item.investorDescription }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <nuxt-link :to="{path: '/service/investors'}" target="_blank"><base-button class="moreBtn">更多投资人</base-button></nuxt-link>
    </div>

    <div class="area7">
      <h3>合作机构</h3>
      <div class="content">
        <div v-swiper:mechanismSwiper="swiperMechanismOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(index) in 2" :key="index">
              <img :src="siteImg(`agency_logo${index}.png`)" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets swiper-mechanism-pagination"></div>
          <div class="swiper-button-prev swiper-mechanism-button-prev"></div><!--左箭头-->
          <div class="swiper-button-next swiper-mechanism-button-next"></div><!--右箭头-->
        </div>
      </div>
    </div>

    <div class="area8">
      <div class="inner">
        <div class="modelessay">
          <div class="title"><span class="icon icon-icon-pickup"></span>商业计划书范文</div>
          <div v-swiper:businessPlanSwiper="swiperBusinessPlanOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in source.essayList" :key="index" v-if="index < 5">
                <img :src="item.essayImg" />
              </div>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets swiper-business-plan-pagination"></div>
          </div>
        </div>
        <div class="news">
          <div class="title"><span class="icon icon-icon-pickup"></span>创业干货<a>查看更多</a></div>
          <ul>
            <li v-for="(item,index) in source.articleList" :key="index" v-if="index < 6">
              <a :href="item.articleUrl" target="_blank" title="item.articleName">
                <em>{{ index + 1 }}</em>
                <div>{{ item.articleName }}</div>
                <span>{{ parseTime(item.articleTime) }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <base-back-top></base-back-top>
  </section>
</template>

<script>
  // 组件
  import BasePagination from '@/components/pagination/Pagination';
  import BaseCheckBox from '@/components/checkBox/CheckBox';
  import BaseSwitchBtn from '@/components/switchBtn/switchBtn';
  import BaseRadialProgressBar from '@/components/RadialProgressBar/RadialProgressBar';
  import { BaseInput, BaseIconInput } from '@/components/input/index';
  import BaseBackTop from '@/components/backTop/backTop';
  import BaseButton from '@/components/button/button.vue';
  import _ from 'lodash';
  import { mapState } from 'vuex';
  export default {
    name: 'site',
    components: {
      BaseButton,
      BasePagination,
      BaseCheckBox,
      BaseSwitchBtn,
      BaseRadialProgressBar,
      BaseInput,
      BaseIconInput,
      BaseBackTop,
    },
    methods: {
      setHeader () {
        const $header = $('#header');
        $header.css('top', '26px');
        $(window).on('scroll', this.scrollHandler);
      },
      scrollHandler () {
        const $header = $('#header');
        const scrollTop = $(window).scrollTop();
        if (scrollTop >= 780 - 26) {
          let top = 790 - scrollTop;
          if (top < 0) {
            top = 0;
          }
          $header.css('top', `${top}px`);
        } else {
          $header.css('top', '26px');
        }
        if (scrollTop >= 780) {
          $header.attr('transparent-mode', false);
        } else {
          $header.attr('transparent-mode', true);
        }
      },
      parseTime (date) {
        date = new Date(date * 1000);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
      },
      onModel () {
        this.$store.dispatch('GlobalComponent/show', {
          component: 'BASEMODAL',
          type: 'success',
          sloter: '创建成功',
        });
      },
    },
    data () {
      return {
        features: [
          {upper: ['随心编辑', '多端同步'], lower: '随时随地查阅编辑', img: require('~/static/image/site/function1.jpg'), svg: 'icon-phone'},
          {upper: ['随心编辑', '多端同步'], lower: '随时随地查阅编辑', img: require('~/static/image/site/function2.jpg'), svg: 'icon-phone'},
          {upper: ['随心编辑', '多端同步'], lower: '随时随地查阅编辑', img: require('~/static/image/site/function3.jpg'), svg: 'icon-phone'},
          {upper: ['随心编辑', '多端同步'], lower: '随时随地查阅编辑', img: require('~/static/image/site/function4.jpg'), svg: 'icon-phone'},
        ],
        service: [
          {img: require('~/static/image/site/service1.png')},
          {img: require('~/static/image/site/service2.png')},
          {img: require('~/static/image/site/service3.png')},
        ],
        swiperOption: {
          loop: true,
          autoplay: true,
          freeMode: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          effect: 'fade',
          pagination: {
            el: '.swiper-service-company-pagination',
            // dynamicBullets: true,
          },
          navigation: {
            nextEl: '.swiper-service-company-button-next',
            prevEl: '.swiper-service-company-button-prev',
          },
        },
        swiperMechanismOption: {
          loop: true,
          autoplay: true,
          freeMode: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          effect: 'fade',
          pagination: {
            el: '.swiper-mechanism-pagination',
            // dynamicBullets: true,
          },
          navigation: {
            nextEl: '.swiper-mechanism-button-next',
            prevEl: '.swiper-mechanism-button-prev',
          },
        },
        swiperBusinessPlanOption: {
          loop: true,
          autoplay: true,
          freeMode: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          effect: 'slidearea8',
          pagination: {
            el: '.swiper-business-plan-pagination',
            // dynamicBullets: true,
          },
        },
      };
    },
    computed: {
      ...mapState({
        source: state => state.Banner.SOURCE,
      }),
      siteImg () {
        return (name) => {
          return require(`~/static/image/site/${name}`);
        };
      },
      financingCase () {
        return _.filter(this.$store.state.Banner.USERCASE, (item) => {
          return item.caseType === 'ghostwrite';
        });
      },
    },
    mounted () {
      this.setHeader();
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => this.$nuxt.$loading.finish(), 500);
      });
    },
    beforeRouteLeave (to, from, next) {
      const $header = $('#header');
      $header.css('top', '0');
      $(window).off('scroll', this.scrollHandler);
      next();
    },
  };
</script>

<style lang="less" scoped>
  @import '~assets/global';
  & .site {
    margin-top: -70px;
    padding-top: 70px;
    background: url('~/static/image/site/bg.png') repeat-x center 0;

    & h3 {
      font-size: 28px;
      padding: 60px 0 24px;
      color: #505050;
    }

    & h4 {
      font-size: 20px;
      color: #787878;
      padding-bottom: 60px;
      padding-top: 0;
    }

    & .area1 {
      height: 670px;
      padding-top: 180px;

      & h1 {
        display: block;
        color: #fff;
        font-size: 55px;
        margin: 0;
        font-weight: 400;
        line-height: 1;
        text-align: center;
      }

      & h1:nth-child(3) {
        margin: 50px auto 100px;
      }

      & .intro {
        .parall {
          display: block;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          position: absolute;
          top: 238px;
          left: -2%;
          text-align: center;
        }

        .parall:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 131px;
          height: 131px;
          border-radius: 50%;
          animation: scale 10s linear infinite;
          background-image: url('~/static/image/site/ball1.png');
          background-size: cover;
          background-repeat: no-repeat;
        }

        .two {
          top: 365px;
          left: 36%;
        }

        .two:before,
        .two:after {
          width: 85px;
          height: 85px;
          background-image: url('~/static/image/site/ball2.png');
          animation-delay: -1s;
        }

        .three {
          top: 133px;
          left: 85%;
        }

        .three:before,
        .three:after {
          width: 162px;
          height: 162px;
          background-image: url('~/static/image/site/ball3.png');
          animation-delay: -2s;
        }

        .four {
          top: 614px;
          left: 10%;
        }

        .four:before,
        .four:after {
          width: 100px;
          height: 100px;
          background-image: url('~/static/image/site/ball4.png');
          animation-delay: -3s;
        }

        .five {
          top: 679px;
          left: 80%;
        }

        .five:before,
        .five:after {
          width: 120px;
          height: 120px;
          background-image: url('~/static/image/site/ball5.png');
          animation-delay: -4s;
        }

        .six {
          top: 533px;
          left: 90%;
        }

        .six:before,
        .six:after {
          width: 50px;
          height: 50px;
          background-image: url('~/static/image/site/ball6.png');
          animation-delay: -5s;
        }
      }

      & .creatBtn {
        display: block;
        width: 190px;
        margin: 75px auto 0;
        padding: 12px 0 13px;
        font-size: 20px;
        line-height: 1.5;
        background-color: #f6ec51;
        border: none;
        border-radius: 5px;
        color: #ff8847;
        text-align: center;
        text-decoration: none;
        box-shadow: 3px 14px 13px 5px rgba(0,0,0,.05);
      }
    }

    & .area2 {
      text-align: center;

      & .list {
        width: 1200px;
        display: flex;
        margin: 0 auto;


        & .card {
          flex: 1;
          position: relative;
          height:300px;
          perspective: 800px;
          overflow: hidden;

          & div {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            transition: .8s ease-in-out;
          }

          & .lower {
            padding: 125px 40px 0;
            line-height: 1.5;
            box-sizing: border-box;
            color: #ffffff;
            font-size: 20px;
            font-family: verdana, arial, sans-serif;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            transform: rotateY(-180deg);
            background: rgb(232,191,100);
            background: -moz-linear-gradient(top, rgba(232,191,100,1) 0%, rgba(255,136,71,1) 99%);
            background: -webkit-linear-gradient(top, rgba(232,191,100,1) 0%,rgba(255,136,71,1) 99%);
            background: linear-gradient(to bottom, rgba(232,191,100,1) 0%,rgba(255,136,71,1) 99%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e8bf64', endColorstr='#ff8847',GradientType=0 );
          }

          & .upper {
            backface-visibility: hidden;
            transform-style: preserve-3d;

            & .icon {
              display: block;
              font-size: 50px;
              color: #ff8847;
              margin: 60px auto 34px;
            }

            & span {
              display: block;
              color: #ffffff;
              font-size: 24px;
            }

            & span:nth-child(3) {
              margin-top: 19px;
            }
          }
        }

        & .card:hover {
          & .lower {
            transform: rotateY(0);
          }

          & .upper {
            transform: rotateY(180deg);
          }
        }

        & .card:nth-child(1) {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        & .card:nth-child(4) {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }

    & .area3 {
      text-align: center;

      & .list {
        display: flex;
        zoom: 1;
        justify-content: center;
        margin-right: -45px;

        & .card {
          width: 370px;
          height: 450px;
          margin-right: 45px;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }

    & .area4 {
      display: block;
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      & .content {
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 0 12px #e6e6e6;

        & img {
          margin: 80px 100px;
          background-color: #f7f7f7;
        }

        & .swiper-pagination {
          bottom: 30px;
        }
      }
    }

    & .area5 {
      text-align: center;
      position: relative;
      width: 1200px;
      color: #787878;
      padding-bottom: 130px;
      margin: 0 auto;

      & .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-right: -90px;

        & .item {
          width: 340px;
          height: 290px;
          margin-bottom: 60px;
          margin-right: 90px;
          cursor: pointer;

          & img {
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
            transition: all .2s ease;
            box-shadow: 0 0 12px #e6e6e6;
          }
        }
      }
    }

    & .area6 {
      text-align: center;
      position: relative;
      width: 1200px;
      color: #787878;
      padding-bottom: 130px;
      margin: 0 auto;

      & .list {
        display: flex;
        justify-content: space-between;

        & .card {
          position: relative;
          width: 340px;
          margin: 64px auto 0;
          padding: 100px 20px 20px;
          background-color: #fff;
          box-shadow: 0 5px 13px 0 rgba(0,0,0,.15);
          box-sizing: border-box;

          & img {
            position: absolute;
            top: -62px;
            left: 50%;
            width: 126px;
            height: 126px;
            margin-left: -63px;
            border: 1px solid #c7c7c7;
            border-radius: 50%;
          }

          & .name {
            font-size: 24px;
            line-height: 1;
            color: #787878;
            text-align: center;
            margin-bottom: 23px;
            text-decoration: none;
          }

          & .job {
            position: relative;
            padding: 5px 0 20px;
            font-size: 16px;
            line-height: 1.5;
            color: #ff8847;
            text-align: center;
            background-color: #fff;

            & span {
              position: relative;
              width: 100%;
              height: 100%;
              padding: 0 20px;
              background-color: #fff;
              z-index: 1;
            }

            &:before {
              position: absolute;
              content: "";
              height: 1px;
              width: 100%;
              background-color: #c8c8c8;
              top: 18px;
              left: 0;
            }
          }

          & .area {
            position: relative;
            height: 42px;
            padding: 20px 0;
            font-size: 14px;
            color: #787878;
          }
        }
      }

      & .moreBtn {
        display: block;
        width: 190px;
        margin: 60px auto 0;
        padding: 10px 0;
        font-size: 16px;
        line-height: 1.5;
        background-color: #ff8847;
        border-radius: 5px;
        color: #fff;
        text-decoration: none;
        text-align: center;
        cursor: pointer;
      }
    }

    & .area7 {
      display: block;
      width: 1200px;
      margin: 0 auto;
      text-align: center;

      & .content {
        margin: 0 auto;
        border-radius: 5px;
        box-shadow: 0 0 12px #e6e6e6;

        & img {
          margin: 80px 100px;
          background-color: #f7f7f7;
        }

        & .swiper-pagination {
          bottom: 30px;
        }
      }
    }

    & .area8 {
      min-height: 400px;
      border: none;
      padding-top: 130px;

      & .inner {
        width: 1200px;
        margin: 0 auto;

        & .modelessay {
          float: left;
          width: 640px;

          & .title {
            position: relative;
            color: #505050;
            font-size: 24px;
            padding-bottom: 30px;
            line-height: 1;
            padding-left: 20px;

            & .icon {
              font-size: 16px;
              color:  @mainColor;

              &:before {
                transform: rotate(90deg);
              }
            }
          }


          & .swiper-container {
            overflow: auto;
            height: 420px;

            & .swiper-wrapper {
              position: relative;
              width: 640px;
              height: 350px;
              margin: 0 auto;
              box-shadow: 0 0 12px #e6e6e6;
              border-radius: 5px;

              & img {
                width: 100%;
                height: 100%;
                background-color: #f7f7f7;
              }
            }

            & .swiper-business-plan-pagination {

              & /deep/.swiper-pagination-bullet {
                width: 50px;
                height: 2px;
                background-color: #c8c8c8;
                border-radius: 0;
              }

              & /deep/.swiper-pagination-bullet-active {
                background-color: #ff8847;
              }
            }
          }
        }

        & .news {
          position: relative;
          float: left;
          width: 500px;
          padding: 0 0 0 60px;

          & .title {
            position: relative;
            color: #505050;
            font-size: 24px;
            padding-bottom: 30px;
            line-height: 1;
            padding-left: 20px;

            & .icon {
              font-size: 16px;
              color: @mainColor;

              &:before {
                transform: rotate(90deg);
              }
            }

            & a {
              position: absolute;
              top: 8px;
              right: 0;
              font-size: 12px;
              line-height: 1.5;
              color: #787878;
              text-decoration: none;
            }
          }

          & ul {
            margin: 0;
            padding: 0;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 12px #e6e6e6;
            zoom: 1;

            & li {
              position: relative;
              list-style: none;

              &:last-child a {
                border: none;
              }

              & em {
                display: inline-block;
                vertical-align: super;
                width: 16px;
                height: 16px;
                border-radius: 4px;
                background-color: #c8c8c8;
                text-align: center;
                line-height: 16px;
                font-size: 12px;
                color: #fff;
                font-style: normal;
              }

              & a {
                display: block;
                overflow: hidden;
                height: 27px;
                padding: 22px 0 8px;
                margin: 0 19px;
                border-bottom: 1px solid #c8c8c8;
                font-size: 16px;
                line-height: 1.5;
                color: #505050;
                text-decoration: none;
                text-overflow: ellipsis;
                white-space: nowrap;

                & div {
                  display: inline-block;
                  width: 340px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  padding-left: 10px;
                  box-sizing: border-box;
                  margin-top: -3px;
                }

                & span {
                  position: absolute;
                  top: 23px;
                  right: 20px;
                  font-size: 12px;
                  line-height: 1.5;
                  color: #969696;
                  vertical-align: super;
                }
              }

              &:nth-child(1) em,
              &:nth-child(2) em,
              &:nth-child(3) em {
                background: #ff8847;
                background: linear-gradient(135deg,#ff8847,#fece63);
              }
            }
          }
        }
      }
    }
  }
</style>
