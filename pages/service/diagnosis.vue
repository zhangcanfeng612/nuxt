<template>
  <div class="service-diagnosis">
    <div class="tabList">
      <ul>
        <nuxt-link :to="{path: '/service/ghost'}"><li>BP定制</li></nuxt-link>
        <nuxt-link :to="{path: '/service/diagnosis'}"><li class="active">BP诊断</li></nuxt-link>
      </ul>
    </div>

    <div class="partOne">
      <img src="~/static/image/diagnosis/title_bg.png" class="bg">
      <div class="content">
        <div class="title"><span>商业计划书诊断服务</span></div>
        <div class="price" v-if="isActive(this.diagnosisData)">{{ price }}</div>
      </div>
    </div>

    <div class="partTwo">
      <div class="avatarList">
        <img src="~/static/image/custom_head_user7.jpg">
        <img src="~/static/image/custom_head_user8.jpg">
        <img src="~/static/image/custom_head_user9.jpg">
        <img src="~/static/image/custom_head_user10.jpg">
        <img src="~/static/image/custom_head_user11.jpg">
      </div>
      <div class="number"><span>{{ amount }}</span> 已预约</div>
      <div class="btns">
        <base-button class="btn">在线客服</base-button>
        <base-button class="btn" @click="onPay">{{ amountPrice }}</base-button>
      </div>
    </div>

    <div class="partThree">
      <img src="~/static/image/diagnosis/diagnosis_title.png">
      <div class="textOne">改了无数次BP,还是不知道问题在哪里?</div>
      <div class="textTwo">疯狂BP全新诊断服务，为你<span>写全方位扫描项目、行业、BP内容及逻辑。</span>让你一步到位，做出最佳BP！</div>
    </div>

    <div class="partFour">
      <div class="title">服务流程</div>
      <div class="process">
        <div class="part" v-for="(item,index) in serviceProcess" v-bind:key="index">
          <div class="icon"><span :class="item.icon"></span></div>
          <div class="tip"><div class="warp"><span>{{ index + 1}}.</span>{{ item.title }}<span class="icon-drop"></span></div></div>
          <div class="content">
            <span>{{ item.text }}</span>
          </div>
          <span class="icon-next" v-if="index !== serviceProcess.length - 1"></span>
        </div>
      </div>
    </div>

    <div class="partFive">
      <div class="title">导师介绍</div>
      <div class="list">
        <div class="member" v-for="(item,index) in teamInfo" :key="index">
          <div class="avatar"><img :src="diagnosisImg(item.avatar)"></div>
          <div class="content">
            <div class="name">{{ item.name }}</div>
            <div class="detail"><span>{{ item.detail }}</span></div>
            <div class="text">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="partSix">
      <div class="title">成功案例</div>
      <div class="list">
        <div class="item" v-for="(item,index) in successCase" v-bind:key="index" v-if="6 > index">
          <div v-bind:style="{backgroundImage:'url(' + item.caseImg + ')'}"></div>
        </div>
      </div>
      <div class="btn" v-if="6 <= successCase.length && successCase.length > 6">查看更多</div>
    </div>

    <div class="partSeven" id="certify">
      <div class="title">用户评价</div>
      <div class="content">
        <div v-swiper:certifySwiper="certifySwiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(index) in 8">
              <img :src="diagnosisImg(`diagnosis_evaluate${index}.jpg`)" />
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets swiper-certify-pagination"></div>
          <div class="swiper-button-prev swiper-certify-button-prev"></div><!--左箭头-->
          <div class="swiper-button-next swiper-certify-button-next"></div><!--右箭头-->
        </div>
      </div>
    </div>

    <div class="partEight">
      <div class="title">常见问题</div>
      <div class="content">
        <div class="box" v-for="(item, index) in questionConfig" :key="index" v-if="index < questionConfig.length">
          <!-- TODO: columns 的计算依赖浏览器环境，采用其它标签或no-ssr -->
          <no-ssr>
            <table>
              <tr><td class="index">Q{{index}}</td><td class="question">{{item.question}}</td></tr>
              <tr><td></td><td class="answer">{{item.answer}}</td></tr>
            </table>
          </no-ssr>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import BaseButton from '@/components/button/button.vue';
  import $Server from '@/server/index';
  import axios from 'axios';
  import _ from 'lodash';
  import $Auth from '@/plugins/util/authUtil';
  import { mapState } from 'vuex';
  export default {
    name: 'service-diagnosis',
    components: { BaseButton },
    data () {
      return {
        serviceProcess: [
          {title: '客户提交BP', text: '客户需要提交自己BP给疯狂BP的顾问团队。', icon: 'icon-submit'},
          {title: '专业团队诊断', text: '疯狂BP顾问团队将成立专门小组，从不同维度针对客户的BP进行诊断和分析，并撰写相应分析报告。', icon: 'icon-delivery'},
          {title: '提供BP诊断报告', text: '专业顾问根据产品、商业模式、行业、市场等方面对BP做全方位的分析和诊断，为创业者提供专业的修改意见反馈。', icon: 'icon-carry'},
        ],
        teamInfo: [
          {name: '王曌宇', detail: '疯狂BP联合创始人', text: '曾任坚果资本投资总监，主导投资国内最大宠物寄养平台“小狗在家”等，尽调过50+早期创业公司，深刻理解投资人与创业者诉求。', avatar: 'custom_team_wzy.jpg'},
          {name: '王志伟', detail: '疯狂BP联合创始人', text: '坚果资本合伙人主导多家上市公司的并购和上市发行，熟悉资本市场，投资30+公司，85%发展良好，进入下一轮。', avatar: 'custom_team_wzw.jpg'},
          {name: '黄珊珊', detail: '疯狂BP高级顾问', text: '曾任一线创业媒体记者，采访数百优秀公司及优秀机构合伙人，擅长商业亮点提炼及BP诊断、制作。', avatar: 'custom_team_hss.jpg'},
        ],
        questionConfig: [
          {question: '问：为什么需要BP诊断？', answer: '答：创业者往往不知道自己的商业计划书的逻辑是否合理，结构是否完整，对于投资人在商业计划书中会关切的问题感到迷茫。疯狂BP将站在专业的角度为你从逻辑、文字表述、设计风格、市场观点上给你优化意见。'},
          {question: '问：你们诊断的BP，能获得投资吗？', answer: '答：融资成功需要优秀的商业计划书，投资人同样也关注团队、产品、商业模式等综合方面，同时还与您的路演水平和技巧密切相关。我们只为你的商业计划书提供指导意见，理清商业思路，并不确保融资的成功性。'},
          {question: '问：创业者需要做什么？', answer: '答：支付诊断服务订单后，BP顾问会与您对接。你只需要提供一份相对完整的商业计划书，就可以获得相应诊断和指导意见。'},
          {question: '问：诊断报告需要多久？', answer: '答：提交商业计划书之后，你会在2-3个工作日内收到诊断指导报告。'},
        ],
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
                let filter = `blur(${Math.abs(slideProgress)}px)grayscale(29%)`;
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
      ...mapState({
        signInfo: state => state.PersonalInfo.SIGNINFO.data.data,
        cardInfo: state => state.PersonalInfo.CARDINFO.data.data,
      }),
      diagnosisImg () {
        return (name) => {
          return require(`~/static/image/diagnosis/${name}`);
        };
      },
      successCase () {
        return _.filter(this.$store.state.Banner.USERCASE, (item) => {
          return item.caseType === 'bpCheck';
        });
      },
      amount () {
        let amount = '';
        if (!_.isEmpty(this.diagnosisData)) {
          amount = `${this.diagnosisData.sold + this.diagnosisData.baseSold}`;
        }
        return amount;
      },
      price () {
        return `价格: ¥ ${this.diagnosisData.priceYuan}`;
      },
      amountPrice () {
        let pay = '';
        if (this.isActive(this.diagnosisData)) {
          pay = `立刻抢购 / ¥ ${this.diagnosisData.priceYuan}`;
        } else {
          pay = '立即预约';
        }
        return pay;
      },
    },
    methods: {
      isActive (data) {
        return data.state === 1 && data.amount > data.paid;
      },
      onPay () {
        const isLogin = $Auth.isLogin;
        const vm = this;
        if (!isLogin) {
          this.$store.dispatch('GlobalComponent/show', {
            component: 'NUTSACCOUNT',
            page: 'login',
          });
        } else {
          // 1. lodaing
          this.$store.dispatch('GlobalComponent/show', {
            component: 'BASELOADING',
          });

          // 2. 查询是否可以创建订单(有可能因为订单进入页面后订单售空,因此需重新查询)
          const url = `${$Server.apiV3}/diagnosis/active`;
          const data = {};
          $Server.get(url, data)
            .then((res) => {
              const serverData = res.data;
              this.$store.dispatch('GlobalComponent/hide', {
                component: 'BASELOADING',
              });
              if (this.isActive(serverData)) {
                // 3. 创建订单
                const url = `${$Server.apiV3}/diagnosis/log/create`;
                const data = {
                  diagnosis: serverData.id,
                  user: vm.signInfo.id,
                };
                $Server.post(url, data)
                  .then((res) => {
                    console.error(`完成创建订单:`, res);
                    // 4. 跳转支付页
                    this.$router.push({
                      path: '/pay',
                      query: {
                        type: 'diagnosis',
                        id: res.data.id,
                        u: vm.signInfo.id,
                      },
                    });
                  });
              } else {
                // 错误提示
                this.$store.dispatch('GlobalComponent/hide', {
                  component: 'BASELOADING',
                });

                this.$store.dispatch('GlobalComponent/show', {
                  component: 'BASEMODAL',
                  type: 'fail',
                  sloter: '订单创建失败,请刷新重试或联系客服咨询',
                });
              }
            });
        }
      },
    },
    async asyncData (context) {
      // 获取诊断服务信息
      function getDiagnosis () {
        const url = `${$Server.apiV3}/diagnosis/active`;
        const params = {};
        return $Server.get(url, params);
      }
      return axios.all([getDiagnosis()])
        .then(axios.spread((diagnosisData) => {
          return {
            diagnosisData: diagnosisData.data,
          };
        }))
        .catch(() => {
          context.error({ statusCode: 404, message: '融资案例获取失败' });
        });
    },
  };
</script>

<style lang="less" scoped>
  & .service-diagnosis {
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
      background: 50% 0 url('~/static/image/diagnosis/diagnosis_banner.jpg') no-repeat;
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
          /* background-color: var(--colorMain); */
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
              font-size: 14px;
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

    & .partFive {
      height: 650px;
      margin-top: 10px;
      color: #000;

      & .title {
        text-align: center;
        font-size: 28px;
        padding: 70px 0 76px;
      }

      & .list {
        display: flex;
        justify-content: space-between;

        & .member {
          position: relative;
          display: inline-block;
          width: 340px;
          vertical-align: top;
          text-align: center;

          & .avatar {
            position: relative;
            display: inline-block;
            padding: 0 15px;
            z-index: 10;
          }

          & img {
            position: relative;
            width: 142px;
            height: 142px;
            border-radius: 50%;
            box-shadow: 0 3px 8px #c8c8c8;
          }

          & .content {
            position: absolute;
            width: 340px;
            height: 321px;
            background-color: #ffffff;
            top: 70px;
            border-radius: 8px;

            & .name {
              font-size: 24px;
              padding: 100px 0 30px;
            }
            & .detail {
              position: relative;
              display: inline-block;
              width: 100%;
              font-size: 16px;
              z-index: 10;

              & span {
                position: relative;
                padding: 0 14px;
                background-color: #fff;
                z-index: 100;
                font-size: 16px;
                color: #ff8847;
              }
            }

            & .detail span:before {
              position: absolute;
              content: '';
              width: 230px;
              height: 1px;
              top: 9px;
              left: 50%;
              transform: translate(-50%,0);
              background-color: #c8c8c8;
              z-index: -1;
            }

            & .text {
              display: inline-block;
              padding: 0 44px;
              line-height: 1.5;
              margin-top: 40px;
              font-size: 14px;
            }
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

    & .partSeven {
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
        background: 50% 0 url('~/static/image/customized/evaluate_bg.png') no-repeat;

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

    & .partEight {
      background-color: #ffffff;
      margin-top: 10px;
      color: rgb(0,0,0);
      margin-bottom: 45px;
      & .title {
        text-align: center;
        font-size: 28px;
        padding: 69px 0 67px;
      }
      & .content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 0 40px;
        & .box {
          position: relative;
          width: 390px;
          margin-bottom: 60px;

          & table {
            position: relative;
            display: inline-block;
            width: 100%;
            height: 100%;
            border-collapse: collapse;

            & td {
              padding: 10px 10px 0;
            }
            & th {
              border: 1px solid #c8c8c8;
            }
            & td{
              border: 1px solid #c8c8c8;
              border-top: none;
            }
            & tr:first-child {
              & th {
                border-top: 0;
              }
            }
            & tr:last-child  {
              & td {
                border-bottom: 0;
              }
            }
            & tr td:first-child {
              border-left: 0;
            }
            & tr th:first-child {
              border-left: 0;
            }
            & tr td:last-child {
              border-right: 0;
            }
            & tr th:last-child {
              border-right: 0;
            }

            & .index {
              padding: 10px;
              color: #c8c8c8;
            }

            & .question {
              font-size: 16px;
              line-height: 1.3;
              color: #ff8847;
            }
            & .answer {
              height: 123px;
              font-size: 14px;
              margin: 15px 0 0 15px;
              line-height: 2;
            }
          }
        }
      }

    }
  }
</style>
