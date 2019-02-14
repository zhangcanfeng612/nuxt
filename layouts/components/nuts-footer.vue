<template>
  <div class="nuts-footer">
    <div class="container">
      <div class="intro">
        <div class="parall one"></div>
        <div class="parall flip two"></div>
        <div class="parall flip three"></div>
        <div class="parall flip four"></div>
        <div class="parall five"></div>
      </div>

      <div class="left">
        <ul class="navbar">
          <li><nuxt-link :to="{path: '/resource/white-paper'}" title="疯狂BP-区块链白皮书">区块链白皮书</nuxt-link></li>
          <li class="split">|</li>
          <li><nuxt-link :to="{path: '/resource/business-plan'}" title="疯狂BP-商业计划书范文">商业计划书范文</nuxt-link></li>
          <li class="split">|</li>
          <li><nuxt-link :to="{path: '/resource/research-report'}" title="疯狂BP-行业研究报告">行业研究报告</nuxt-link></li>
          <li class="split">|</li>
          <li><nuxt-link :to="{path: '/other/site-map'}" title="疯狂BP-网站地图">网站地图</nuxt-link></li>
        </ul>
        <div class="link">
          <nuxt-link :to="{path: '/other/about-us'}" title="疯狂BP-关于我们">关于我们</nuxt-link>
          <div>友情链接</div>
          <ul>
            <li v-for="(item,index) in friendshipLinks" :key="index">
              <a :href="item.url" target="_blank" :title="item.title">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div class="record">
          <span>© 2018 Nutsbp.com, All Rights Reserved. 闽ICP备16023469号-2</span>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302002021">闽公网安备 35020302002021号</a>
        </div>
      </div>

      <div class="right">
        <ul class="contact">
          <li><span>微信公众号</span>nutsbpbp</li>
          <li><span>客服微信</span>yui0506</li>
          <li><span>邮箱</span>service@nutsbp.com</li>
        </ul>
        <div class="weichat2">免费商业计划书资源</div>
        <div class="weichat">关注微信公众号</div>
        <div class="download">下载疯狂BP</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nuts-footer',
  data () {
    return {
      friendshipLinks: [
        {url: 'http://www.nutsbp.com', title: '疯狂BP'},
        {url: 'http://www.capitalnuts.com', title: '坚果资本'},
        {url: 'http://www.th-vc.com/', title: '清控银杏'},
        {url: 'http://www.ofcapital.com/ofcweb/', title: '东方富海'},
        {url: 'http://www.chuangkem.com', title: '创客猫'},
        {url: 'https://www.bufanbiz.com', title: '不凡商业'},
        {url: 'https://www.islide.cc', title: 'iSlide'},
        {url: 'https://www.pptboss.com', title: 'pptboss'},
      ],
    };
  },
  methods: {
    initBallAnimation () {
      $(document).on('mousemove', (i) => {
        function moveBlcok (x, y) {
          return {
            'margin-top': `${-((i.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / y).toFixed(1)}px`,
            'margin-left': `${-((i.pageX - $(window).innerWidth() / 2) / x).toFixed(1)}px`,
          };
        }
        $('.parall.one').css(moveBlcok(80, 80));
        $('.parall.two').css(moveBlcok(40, 40));
        $('.parall.three').css(moveBlcok(20, 20));
        $('.parall.four').css(moveBlcok(60, 60));
        $('.parall.five').css(moveBlcok(100, 100));
        $('.parall.six').css(moveBlcok(120, 140));
      });
    },
  },
  mounted () {
    this.initBallAnimation();
  },
};
</script>

<style lang="less" scoped>
  & .nuts-footer {
    position: relative;
    height: 425px;
    background: url('~/static/image/footer/bg.jpg') repeat-x center;
    background-color: transparent;
    background-size: cover;
    margin-top: 130px;

    & .parall {
      display: block;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      position: absolute;
      top: -45px;
      left: 7%;
    }

    & .parall:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 150px;
      height: 150px;
      background-image: url('~/static/image/footer/ball1.png');
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
      animation: scale 10s linear infinite;
    }

    & .one:after {
      width: 120px;
      height: 120px;
    }

    & .two {
      top: -50px;
      left: 80%;
    }

    & .two:before,
    & .two:after {
      width: 100px;
      height: 100px;
      background-image: url('~/static/image/footer/ball2.png');
      animation-delay: -1s;
    }

    & .three {
      top: 130px;
      left: -249px;
    }

    & .three:before,
    & .three:after {
      width: 110px;
      height: 110px;
      background-image: url('~/static/image/footer/ball3.png');
      animation-delay: -2s;
    }

    & .four {
      top: 172px;
      left: 49%;
    }

    & .four:before,
    & .four:after {
      width: 85px;
      height: 85px;
      background-image: url('~/static/image/footer/ball4.png');
      animation-delay: -3s;
    }

    & .five {
      top: 263px;
      left: 80%;
    }

    & .five:before,
    & .five:after {
      width: 89px;
      height: 90px;
      background-image: url('~/static/image/footer/ball5.png');
      animation-delay: -4s;
    }


    & .container {
      position: relative;
      width: 1200px;
      margin: 0 auto;
    }

    & .left {
      padding-top: 132px;
    }

    & .navbar {
      margin: 0;
      padding: 0;


      & li {
        float: left;
        list-style: none;

        & span,
        & a {
          display: block;
          color: #fbf1aa;
          font-size: 16px;
          line-height: 1.5;
          text-decoration: none;
        }

        & a {
          &:hover {
            color: #ffffff;
            text-decoration: underline;
          }
        }
      }

      & .split {
        width: 1px;
        height: 21px;
        margin: 0 10px;
        color: #dc5706;
      }
    }

    & .link {
      position: relative;
      margin-top: 60px;
      padding: 0 0 0 90px;

      > a {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        padding: 5px 20px 5px 0;
        font-size: 12px;
        line-height: 1.5;
        border-right: 1px solid #dc5706;
        color: #fbf1aa;
        text-decoration: none;

        &:hover {
          color: #ffffff;
          text-decoration: none;
        }
      }

      & div {
        position: absolute;
        top: 0;
        left: 45px;
        width: 24px;
        padding: 5px 20px;
        font-size: 12px;
        line-height: 1.5;
        color: #dc5706;
      }

      & ul {
        width: 300px;
        margin: 0;
        padding: 0 0 0 20px;

        & li {
          float: left;
          width: 75px;
          padding: 2px 0;
          list-style: none;

          & a {
            display: block;
            color:  #fbf1aa;
            font-size: 12px;
            line-height: 1.5;
            text-decoration: none;

            &:hover {
              color: #ffffff;
              text-decoration: underline;
            }
          }
        }
      }

      & .split {
        width: 1px;
        margin: 0 20px;
        background-color: #ff8847;
      }
    }

    & .record {
      letter-spacing: 0;
      display: inline-block;
      margin-top: 48px;
      color: #dc5706;
      font-size: 20px;
      transform: scale(.5);
      line-height: 1.5;
      transform-origin: left;
    }

    & .copyright {
      vertical-align: super;
    }

    & .record {

      span,
      a {
        float: left;
      }

      a {
        display: inline-block;
        background: url(http://www.beian.gov.cn/img/ghs.png) no-repeat 10px center;
        padding-left: 35px;
        color: #dc5706;
        text-decoration: none;
      }
    }

    & .copyright {
      margin-top: 5px;
    }

    & .right {
      position: absolute;
      top: 132px;
      right: 0;
    }

    & .weichat2,
    & .weichat,
    & .download {
      float: left;
      width: 115px;
      height: 140px;
      background: no-repeat center bottom;
      color: #ffffff;
      font-size: 12px;
      line-height: 1.5;
      text-align: center;
    }

    & .weichat2 {
      margin-right: 15px;
      background-image: url('~/static/image/footer/weichat-qrcode2.jpg');
    }

    & .weichat {
      margin-right: 15px;
      background-image: url('~/static/image/footer/weichat-qrcode.jpg');
    }

    & .download {
      margin-right: 15px;
      background-image: url('~/static/image/footer/download-qrcode.jpg');
    }

    & .contact {
      float: left;
      margin-right: 135px;

      & li {
        list-style: none;
        color: #ffffff;
        font-size: 14px;
        line-height: 2.22;
        padding-bottom: 12px;

        & span {
          display: block;
          color: #dc5706;
        }
      }

      & li:nth-child(1) {
        margin-top: -4px;
      }
    }
  }

</style>
