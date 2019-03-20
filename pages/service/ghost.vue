<template>
  <div class="service-ghost">
    <div class="tabList">
      <ul>
        <nuxt-link :to="{path: '/service/ghost'}"><li class="active">BP定制</li></nuxt-link>
        <nuxt-link :to="{path: '/service/diagnosis'}"><li>BP诊断</li></nuxt-link>
      </ul>
    </div>

    <div class="partOne">
      <img src="~static/image/customized/title_bg.png" class="bg">
      <div class="content">
        <div class="title"><span>商业计划书定制服务</span></div>
        <div class="price">价格: 根据项目情况咨询客服</div>
      </div>
    </div>

    <div class="partTwo">
      <div class="avatarList">
        <img src="~static/image/custom_head_user1.jpg">
        <img src="~static/image/custom_head_user2.jpg">
        <img src="~static/image/custom_head_user3.jpg">
        <img src="~static/image/custom_head_user4.jpg">
        <img src="~static/image/custom_head_user5.jpg">
      </div>
      <div class="number"><span>2376</span> 已预约</div>
      <div class="btns">
        <base-button class="btn">在线客服</base-button>
        <base-button class="btn" @click="onReservation">立即预约</base-button>
      </div>
    </div>

    <div class="partThree">
      <img src="~static/image/customized/custom_title.png">
      <div class="textOne">如果你对商业计划书还是一头雾水，让我们来帮助你！一对一专家服务，为你量身定制BP！</div>
      <div class="textTwo">理清商业思路，凸显项目核心价值，<span>写出投资人想要的商业计划书！</span></div>
    </div>

    <div class="partFour">
      <div class="title">服务内容</div>
      <div class="list">
        <div class="card" v-for="(item, index) in serverContentArr" :key="index" :style="{ backgroundImage: `url('${item.url}')` }">
          <div :class="['icon', item.icon ]"></div>
          <div class="heading">{{ item.heading }}</div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
    </div>

    <div class="partFive">
      <div class="title">服务流程</div>
      <div class="process">
        <div class="part" v-for="(item,index) in serverProcessArr" v-bind:key="index">
          <div class="icon"><span :class="[item.icon]"></span></div>
          <div class="tip"><div class="warp"><span>{{ index + 1}}.</span>{{ item.title }}<span class="icon-drop"></span></div></div>
          <div class="content">
            <span>{{ item.text }}</span>
          </div>
          <span class="icon-next" v-if="index !== serverProcessArr.length - 1"></span>
        </div>
      </div>
    </div>

    <div class="partSix">
      <div class="title">融资案例</div>
      <div class="list">
        <div class="item" v-for="(item,index) in financingCase" v-bind:key="index" v-if="6 > index">
          <div v-bind:style="{backgroundImage:'url(' + item.caseImg + ')'}"></div>
        </div>
      </div>
      <div class="btn" v-if="6 <= financingCase.length && financingCase.length > 6">查看更多</div>
    </div>

    <div class="partSeven">
      <div class="title">服务企业</div>
      <div class="content">
        <div v-swiper:serviceCompanySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(index) in 5" :key="index">
              <img :src="customizedImg(`customer_logo${index}.png`)" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets swiper-service-company-pagination"></div>
          <div class="swiper-button-prev swiper-service-company-button-prev"></div><!--左箭头-->
          <div class="swiper-button-next swiper-service-company-button-next"></div><!--右箭头-->
        </div>
      </div>
    </div>

    <div class="partEight" id="certify">
      <div class="title">用户评价</div>
      <div class="content">
        <div v-swiper:certifySwiper="certifySwiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(index) in 10">
              <img :src="customizedImg(`custom_evaluate${index}.jpg`)" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets swiper-certify-pagination"></div>
          <div class="swiper-button-prev swiper-certify-button-prev"></div><!--左箭头-->
          <div class="swiper-button-next swiper-certify-button-next"></div><!--右箭头-->
        </div>
      </div>
    </div>

    <div class="partNine">
      <div class="title">投资机构</div>
      <div class="content">
        <div v-swiper:investmentAgencySwiper="investmentAgencySwiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(index) in 2" :key="index">
              <img :src="customizedImg(`agency_logo${index}.png`)" />
            </div>
          </div>
          <div class="swiper-pagination swiper-investment-agency-pagination swiper-pagination-bullets"></div>
          <div class="swiper-button-prev swiper-investment-agency-button-prev"></div><!--左箭头-->
          <div class="swiper-button-next swiper-investment-agency-button-next"></div><!--右箭头-->
        </div>
      </div>
    </div>

    <no-ssr>
      <!-- 定制预约订单 -->
      <base-modal v-model="showReservation" :backdrop="showReservation">
        <div class="popupReservation">
          <div class="title">我要咨询</div>
          <div class="line">
            <base-icon-input class="input-box"></base-icon-input>
          </div>
          <div class="line">
            <base-icon-input class="input-box"></base-icon-input>
          </div>

          <div>
            <div class="heading">融资阶段</div>
            <div class="select">
              <span>种子轮</span>
              <span>天使轮</span>
              <span>Pre A/A轮</span>
              <span>B轮</span>
            </div>
            <div class="footer">填写完资料后,我们将由专人跟您联系做一对一的沟通,亦可以添加微信:yui0506,进行咨询</div>
          </div>
          <base-button class="btn">确定</base-button>
        </div>
      </base-modal>
    </no-ssr>
  </div>
</template>

<script>
  import BaseButton from '@/components/button/button.vue';
  import BaseModal from '@/components/Model';
  import { BaseIconInput } from '@/components/input/index';
  // import $Server from '@/server/index'; import axios from 'axios';
  import _ from 'lodash';

  import $Auth from '@/plugins/util/authUtil';

  export default {
    name: 'service-ghost',
    components: { BaseButton, BaseModal, BaseIconInput },
    data () {
      return {
        showReservation: false,
        serverContentArr: [
          {heading: '商业逻辑梳理', text: '梳理商业模式，提供可行性建议，打造符合投资人逻辑的商业计划书结构。', icon: 'icon-structure', url: require('~/static/image/customized/content1_bg.jpg')},
          {heading: '核心优势挖掘', text: '充分挖掘、提炼项目亮点及竞争力，让投资人快速get到项目价值。', icon: 'icon-shovel', url: require('~/static/image/customized/content2_bg.jpg')},
          {heading: '项目估值指导', text: '根据项目阶段和情况，提供科学合理的估值建议。', icon: 'icon-money', url: require('~/static/image/customized/content3_bg.jpg')},
          {heading: '融资计划指导', text: '根据项目发展需求，设置融资金额、出让股权指导建议。', icon: 'icon-meeting', url: require('~/static/image/customized/content4_bg.jpg')},
          {heading: '版面美化设计', text: '专业平面设计师量身定制，美观、大方、商务风，支持多场景展示。', icon: 'icon-beautify', url: require('~/static/image/customized/content5_bg.jpg')},
        ],
        serverProcessArr: [
          {title: '咨询洽谈', text: '前期服务咨询及项目方案、项目需求初步沟通。', icon: 'icon-customer-service'},
          {title: '合同签订', text: '签订合同，明确服务费用、交付周期、保密条约等服务细节。', icon: 'icon-templet'},
          {title: '支付费用', text: '根据服务需求，支付相应的服务费用。', icon: 'icon-money'},
          {title: '定制服务', text: '成立项目服务小组，深入沟通确认项目信息，编撰商业计划书。', icon: 'icon-edit'},
          {title: '项目交付', text: '经客户确认及修改，完成项目商业计划书验收，开启融资之旅。', icon: 'icon-carry'},
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
        investmentAgencySwiperOption: {
          loop: true,
          autoplay: true,
          freeMode: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          effect: 'fade',
          pagination: {
            el: '.swiper-investment-agency-pagination',
            // dynamicBullets: true,
          },
          navigation: {
            nextEl: '.swiper-investment-agency-button-next',
            prevEl: '.swiper-investment-agency-button-prev',
          },
        },
        certifySwiperOption: {
          watchSlidesProgress: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          loop: true,
          autoplay: false,
          loopedSlides: 10,
          pagination: {
            el: '.swiper-certify-pagination',
            // clickable: true,
          },
          navigation: {
            nextEl: '.swiper-certify-button-next',
            prevEl: '.swiper-certify-button-prev',
          },
          on: {
            progress: function (progress) {
              for (let i = 0; i < this.slides.length; i++) {
                let slide = this.slides.eq(i);
                let slideProgress = this.slides[i].progress;
                let modify = 1;
                if (Math.abs(slideProgress) > 1) {
                  modify = (Math.abs(slideProgress) - 1) * 0.1 + 1;
                }
                let translate = slideProgress * modify * 325 + 'px';
                let scale = 1 - Math.abs(slideProgress) / 8;
                let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                let filter = `blur(${Math.abs(slideProgress)}px)`;
                slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                slide.css('filter', filter);
                if (Math.abs(slideProgress) > 3) {
                  slide.css('opacity', 0);
                }
              }
            },
            setTransition: function (transition) {
              for (let i = 0; i < this.slides.length; i++) {
                let slide = this.slides.eq(i);
                slide.transition(transition);
              }
            },
          },
        },
      };
    },
    computed: {
      customizedImg () {
        return (name) => {
          return require(`~/static/image/customized/${name}`);
        };
      },
      financingCase () {
        return _.filter(this.$store.state.Banner.USERCASE, (item) => {
          return item.caseType === 'ghostwrite';
        });
      },
    },
    methods: {
      onReservation () {
        const isLogin = $Auth.isLogin;
        if (!isLogin) {
          this.$store.dispatch('GlobalComponent/show', {
            component: 'NUTSACCOUNT',
            page: 'login',
          });
        } else {
          this.showReservation = true;
        }
      },
    },
  };
</script>


<style lang="less" scoped>
 & .service-ghost {
   width: 1200px;
   margin: 0 auto;
   background-color: #f7f7f7;

   & .tabList {
     position: relative;
     width: 1200px;
     padding: 110px 0;

     & ul {
       position: absolute;
       bottom: 50px;
       left: 50%;
       transform: translate(-50%);
       display: inline-block;
       font-size: 0;

       & li {
         display: inline-block;
         height: 47px;
         line-height: 47px;
         text-align: center;
         color: #ff8847;
         font-size: 14px;
         width: 150px;
         background-color: #f7f7f7;
         vertical-align: top;
         cursor: pointer;
         border: 1px solid #ff8847;
         border-radius: 0;
       }

       & .active {
         position: relative;
         color: #fff;
         vertical-align: bottom;
         border: 1px solid #ff8847;
         margin-top: -4px;
         margin-left: 0;
         margin-right: -1px;
         background-color: #ff8847;
         z-index: 10;
       }

       & a:nth-child(1) li{
         border-top-left-radius: 5px;
         border-bottom-left-radius: 5px;
         border-right: none;
       }

       & a:nth-child(2) li {
         border-top-right-radius: 5px;
         border-bottom-right-radius: 5px;
         border-left: none;
       }
     }
   }

   & .partOne {
     position: relative;
     background: 50% 0 url('~static/image/customized/custom_banner.jpg') no-repeat;
     height: 300px;
     text-align: center;
     color: #fff;

     & .bg,
     & .content {
       position: absolute;
       width: 650px;
       height: 231px;
       top: 111px;
       left: 50%;
       -webkit-transform: translate(-50%);
       transform: translate(-50%);

       & .title {
         font-size: 28px;
         margin-top: 56px;
         font-weight: 400;
       }

       & .price {
         margin-top: 30px;
       }

     }
   }

   & .partTwo {
     display: -webkit-box;
     display: -ms-flexbox;
     display: flex;
     height: 100px;
     line-height: 100px;
     margin-top: 50px;
     border-radius: 5px;
     background-color: #fff;

     & .avatarList {
       display: inline-block;
       vertical-align: super;
       margin-left: 9.2%;

       & img {
         width: 40px;
         height: 40px;
         border-radius: 50%;
         margin-right: 25px;
         vertical-align: middle;
       }
     }

     & .number {
       display: inline-block;
       margin-left: 4.8%;
       font-size: 16px;
       color: #787878;

       & span {
         font-size: 26px;
       }
     }

     & .btns {
       & .btn {
         position: relative;
         display: inline-block;
         padding: 5px;
         box-sizing: border-box;
         font-family: inherit;
         outline: none;
         cursor: pointer;
         height: 50px;
         font-size: 16px;
         border-radius: 5px;
         width: 150px;
         margin-left: 115px;
         color: #787878;
         background-color: #ebebeb;
         border: 1px solid #ebebeb;

         &:nth-child(2) {
           color: #fff;
           background-color: #ff8847;
           border-color: #ff8847;
           width: 220px;
           margin-left: 18px;
         }
       }
     }
   }

   & .partThree {
     height: 390px;
     margin-top: 10px;
     text-align: center;
     font-size: 16px;
     color: #787878;
     border-bottom: 1px solid #c8c8c8;

     & img {
       margin-top: 84px;
     }

     & .textOne {
       margin-top: 60px;
     }

     & .textTwo {
       margin: 20px auto 120px;

       & span {
         color: #ff8847;
       }
     }
   }

   & .partFour {
     text-align: center;
     & .title {
       color: #505050;
       font-size: 28px;
       margin: 130px auto 60px;
     }

     & .list {
       height: 330px;
       display: flex;

       & .card {
         flex: 1;
         height: 300px;
         background-color: rgba(0,0,0,.7);
         cursor: pointer;
         transition: all 0.3s ease-in;
         background-size: cover;

         & .icon {
           font-size: 50px;
           margin: 70px auto 38px;
           color: #ff8847;
         }

         & .heading {
           position: relative;
           font-size: 24px;
           color: #ffffff;
           transition: all 0.3s ease-in;
         }
         & .heading:after {
           position: absolute;
           opacity: 0;
           content: "";
           width: 26px;
           height: 2px;
           background-color: #ff8847;
           margin: 18px auto 18px;
           top: 20px;
           left: 50%;
           transform: translate(-50%,0);
         }

         & .text {
           opacity: 0;
           padding: 0 50px;
           font-size: 16px;
           color: #ffffff;
           transition: all 0.3s ease-in;
         }
       }

       & .card:hover {
         position: relative;
         height: 330px;
         margin-top: -15px;
         /* box-shadow: 3px 0 18px rgba(255,136,71,.8); */
         background-size: cover;
         background-repeat: no-repeat;

         & .icon {
           margin: 40px auto 36px;
         }


         & .heading:after {
           opacity: 1;
         }

         & .text {
           opacity: 1;
           margin-top: 38px;
         }
       }

       & .card:hover::before {
         position: absolute;
         content: "";
         width: 1px;
         height: 300px;
         box-shadow: -2px 0 7px rgba(255,136,71,.8);
         left: 0;
         top: 50%;
         transform: translate(0, -50%);
       }

       & .card:hover::after {
         position: absolute;
         content: "";
         width: 1px;
         height: 300px;
         box-shadow: 2px 0 7px rgba(255,136,71,.8);
         right: 0;
         top: 50%;
         transform: translate(0, -50%);
       }
     }
   }

   & .partFive {
     margin-top: 10px;

     & .title {
       text-align: center;
       font-size: 28px;
       padding: 100px 0 60px;
     }

     & .process {
       position: relative;
       display: flex;
       width: 100%;
       height: 250px;
       margin: 0 auto;
       background-color: #ffffff;

       & .icon {
         position: relative;
         width: 80px;
         height: 80px;
         font-size: 50px;
         color: #ffffff;
         background: #ff8847;
         background: -moz-linear-gradient(45deg, #ff8847 0%, #ffd26e 83%);
         background: -webkit-linear-gradient(45deg, #ff8847 0%,#ffd26e 83%);
         background: linear-gradient(45deg, #ff8847 0%,#ffd26e 83%);
         filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff8847', endColorstr='#ffd26e',GradientType=1 );
         border-radius: 50%;
         margin: 60px auto 0;

         & span {
           font-size: 45px;
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%,-50%);
         }
       }

       & .icon-next {
         position: absolute;
         top: 78px;
         right: -40px;
         color: #c8c8c8;
         font-size: 50px;
       }
       & .part {
         flex: 1;
         position: relative;
         text-align: center;
         cursor: pointer;

         & .tip {
           position: relative;
           z-index: 1000;
           font-size: 22px;
           margin-top: 39px;
           text-align: center;

           & .warp {
             display: inline-block;
             font-size: 20px;
             background-color: #fff;
             padding: 0 10px;
           }
           & .icon-drop {
             position: absolute;
             top: 6px;
             font-size: 10px;
             vertical-align: middle;
             padding-left: 5px;
           }

           & span {
             color: #ff8847;
           }
         }

         & .content {
           position: absolute;
           top: 200px;
           left: 50%;
           transform: translate(-50%,0);
           display: none;
           margin: -12px auto;
           width: 230px;
           height: 153px;
           background-color: #ffffff;
           border: 1px solid #ff8847;
           box-shadow: 5px 7px 5px rgba(12,3,7,0.12);
           z-index: 10;
           border-radius: 5px;

           & span {
             position: absolute;
             top: 50%;
             left: 50%;
             line-height: 1.7;
             transform: translate(-50%,-50%);
             width: 180px;
             font-size:14px;
             color: rgb(120,120,120);

           }
         }
       }
       & .part:hover {
         & .content  {
           display: inline-block;
         }

         & .icon-drop {
           opacity: 0;
         }
       }
     }
   }

   & .partSix {
     color: #000;
     padding-bottom: 70px;

     & .title {
       text-align: center;
       padding: 130px 0 60px;
       font-size: 28px;
     }

     & .list {
       display: flex;
       flex-wrap: wrap;
       margin-right: -90px;

       & .item {
         width: 340px;
         height: 370px;
         margin-bottom: 60px;
         margin-right: 90px;
         cursor: pointer;

         & div {
           width: 100%;
           height: 100%;
           background-repeat: no-repeat;
           background-size: contain;
           transition: all .2s ease;
         }
       }

       & .item:hover {
         & div {
           margin-top: -10px;
         }
       }
     }

     & .btn {
       width: 150px;
       height: 40px;
       line-height: 40px;
       color: #ff8847;
       border: 1px solid  #ff8847;
       border-radius: 5px;
       text-align: center;
       cursor: pointer;
       font-size: 18px;
       margin: 0 auto;
     }
   }


   & .partSeven,
   & .partNine {
     & .title {
       padding: 0 0 60px;
       font-size: 28px;
       color: #505050;
       text-align: center;
     }

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

   & .partEight {
     position: relative;
     width: 1200px;
     margin: 0 auto;

     & .title {
       font-size: 28px;
       color: #505050;
       padding: 60px 0;
       text-align: center;
     }

     & .content {
       padding: 50px 0 0 0;
       background: 50% 0 url('~static/image/customized/evaluate_bg.png') no-repeat;

       & .swiper-container {
         padding-bottom: 60px;
       }

       & .swiper-slide {
         position: relative;
         width: 530px;
         height: 497px;

         & img {
           position: absolute;
           display: block;
           width: 280px;
           height: 497px;
           top: 0;
           left: 50%;
           transform: translate(-50%);
         }
       }

       & .swiper-certify-pagination {
        bottom: 30px;
       }
     }
   }

   & .popupReservation {
     width: 500px;
     height: 600px;

     & .title {
       position: relative;
       margin: 50px auto;
       font-size: 26px;
       text-align: center;
       color: #787878;
     }
   }
 }

</style>
