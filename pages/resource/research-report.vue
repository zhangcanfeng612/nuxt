<template>
  <div class="research-report">
    <!-- 广告banner-->
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in advertisement">
          <img :src="banner.bannerImg">
        </div>
      </div>

      <div class="swiper-button-prev"></div><!--左箭头-->
      <div class="swiper-button-next"></div><!--右箭头-->

      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>

    <!-- 栏目 -->
    <div class="tabList">
      <ul>
        <nuxt-link :to="{path: '/template'}"><li>区块链白皮书</li></nuxt-link>
        <nuxt-link :to="{path: '/template'}"><li>商业计划书范文</li></nuxt-link>
        <nuxt-link :to="{path: '/template'}" class="active"><li>行业研究报告</li></nuxt-link>
      </ul>
    </div>

    <!-- 行业筛选 -->
    <div class="classification">
      <div class="option">
        <div class="title">应用场景:</div>
        <ul>
          <li v-for="(item, index) in labels" :key="index" :class="[{'active': item.label_url_route === activeLabel}]">
            <nuxt-link
              :to="{path: 'business-plan',query: { pageindex: 1, label: item.label_url_route }}"
            >{{ (item.label) ? item.label: '全部' }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <div class="card" v-for="(item, index) in slides" :key="index">
        <div class="cover">
          <img :src="item.thumbnail" :alt="item.seo_title" v-lazy="imgObj(item)">
          <div class="option">
            <div @click="onPreview(item)">预览</div>
            <div @click="onDownload(item)">下载</div>
          </div>
          <span class="mark" v-if="item.grade === 2">黄金用户免费下载</span>
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>

    <!-- 分页器 -->
    <base-pagination
      :pageIndex="pageIndex"
      :total="total"
      :pageSize="pageSize"
      path="/research-report?pageindex="
      v-if="total > 1"
    ></base-pagination>
  </div>
</template>

<script lang="ts">
  import axios from 'axios';
  import _ from 'lodash';
  import qs from 'qs';

  import $Server from '@/server/index';
  import BasePagination from '@/components/pagination/Pagination.vue';

  const pageSize = 24;
  export default {
    name: 'research-report',
    watchQuery: ['pageindex', 'label'],
    components: {
      BasePagination,
    },
    data () {
      return {
        pageSize: pageSize,
        advertisement: this.$store.state.Banner.ESSAYBANNER,
        swiperOption: {
          loop: true,
          autoplay: true,
          freeMode: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          controller: true,
          // effect: 'fade',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
          },
        },
      }
    },
    methods: {
      imgObj (item)  {
        return {
          src: item.thumbnail_url,
          error: `${$Server.imgCdn}/007/image/nuts_bp_pc/my_bp/my_bp_preset_page.png`,
          loading: `${item.thumbnail_url}?basic=25p_60q`,
        }
      },
      onPreview (item) {
        window.open(`${item.url}?reader=ow365&v=3-4.22.0`);
      },
      onDownload (item) {
        this.downloadLink(item.url);
      },
      downloadLink(url, fileName = null) {
        let $downloadFrame = document.createElement('iframe');
        $downloadFrame.id = '__downloadFrame';
        $downloadFrame.name = '__downloadFrame';
        $downloadFrame.style.position = 'absolute';
        $downloadFrame.style.top = '-9999px';
        $downloadFrame.style.left = '-9999px';
        document.body.appendChild($downloadFrame);

        let $a = document.createElement('a');
        $a.href = url;
        $a.target = '__downloadFrame';
        if (fileName !== null) {
          // TODO: $a.download = fileName;
        }
        document.body.appendChild($a);
        $a.click();
        setTimeout(() => {
          document.body.removeChild($a);
          // TODO:  $a = null;
        }, 1000);
      }
    },
    async asyncData (context) {
      let pageIndex = qs.parse(context.query).pageindex || 1;
      let activeLabel = qs.parse(context.query).label || '';
      // 获取应用场景
      function getLabels () {
        const url = `${$Server.api}/research_report/label`;
        const params = {};
        return $Server.get(url, params);
      }

      // 获取范文
      function getslides () {
        const url = `${$Server.api}/research_report`;
        const params = {
          label: activeLabel
        };
        return $Server.get(url, params);
      }

      return axios.all([getslides(), getLabels()])
        .then(axios.spread((slides, labels) => {
          labels.data.unshift({label: '', label_url_route: ''});
          return {
            activeLabel,
            labels: labels.data,
            slides: _.slice(slides.data, (pageIndex - 1) * pageSize, (pageIndex) * pageSize),
            total: Math.ceil(slides.data.length / pageSize),
            pageIndex: pageIndex,
          };
        }))
        .catch(() => {
          context.error({ statusCode: 404, message: '范文/栏目获取失败' });
        });
    },
  };
</script>

<style lang="less" scoped>
  & .research-report {
    width: 1200px;
    background-color: #f7f7f7;
    margin: 0 auto;

    & .swiper-container {
      display: block;
      height: 240px;
      width: 1200px;
      margin-top: 100px;

      & .swiper-slide {
        text-align: center;
        font-size: 38px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;

        & img {
          width: 100%;
          height: 100%;
        }
      }

      & .swiper-pagination-bullets {
        left: 50%;
        transform: translate(-50%,0);
      }
    }

    & .tabList {
      position: relative;
      width: 1200px;
      margin: 108px auto 0;
      border-bottom: 1px solid rgba(220,220,220,1);

      > ul {
        position: absolute;
        bottom: -1px;
        display: inline-block;
        font-size: 0;
        border-bottom: none;
        border-left: none;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        padding: 0;

        li {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #969696;
          font-size: 14px;
          width: 160px;
          background: rgba(242,242,242,1);
          border: 1px solid rgba(220, 220, 220, 1);
          vertical-align: bottom;
          transition: all .2s ease-in-out;
          overflow: hidden;
          border-radius:5px 5px 0 0;
          cursor: pointer;
          margin-left: -1px;
          box-sizing: border-box;

          &:hover {
            height: 47px;
            line-height: 47px;
          }
        }

        a:nth-child(1) li {
          border-top-left-radius: 5px;
        }

        a:last-child li {
          border-top-right-radius: 5px;
        }
      }

      .active {
        position: relative;
        height: 47px;
        line-height: 47px;
        color: white;
        vertical-align: bottom;
        margin-top: -4px;
        margin-left: 0;
        margin-right: -1px;
        background:linear-gradient(180deg,rgba(254,214,100,1),rgba(255,136,71,1));
        border: none;
        z-index: 10;
      }

      .help {
        position: absolute;
        flex: 1;
        right: 0;
        top: -68px;
        text-align: right;
        color: #787878;
        font-size: 14px;

        span {
          position: relative;
          color: #ff8847;
          cursor: pointer;
        }

        span::after {
          position: absolute;
          content: "";
          top: 20px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #ff8847;
        }
      }

      .search_wrap {
        position: absolute;
        padding-left: 100px;
        right: 0;
        top: -39px;
        background-color: white;

        .search_box {
          display: inline-flex;
          vertical-align: middle;
          width:270px;
          height:40px;
          border-radius:5px;
          box-sizing: border-box;
          background-color: #ffffff;
          border: 1px solid #c8c8c8;

          input {
            outline: none;
            resize: none;
            border: none;
            width: 200px;
            font-size: 14px;
            margin-left: 14px;
            font-weight: 200;
          }

          .icon_box {
            flex: 1;
            position: relative;
            display: inline-block;
            height: 40px;
            text-align: center;
            cursor: pointer;
          }

          img {
            width: 16px;
            height: 16px;
            color: #f7f7f7;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            vertical-align: super;
          }
        }
      }
    }

    & .classification {
      position: relative;
      display: flex;
      height: 140px;
      z-index: 10;

      & .option {
        display: flex;
        max-width: 800px;
        margin: 43px 0 21px;
        font-size: 13px;
        color: #333333;

        ul,
        li {
          display: inline-block;
          padding: 0;
          text-align: center;
          margin: 0;
          list-style-type: none;

          a {
            color: #333333;
            text-decoration: none;
            border: 1px solid transparent;
          }
        }

        ul {
          text-align: left;
        }

        li {
          height: 24px;
          line-height: 24px;
          margin-bottom: 8px;
          padding: 0 10px;
          cursor: pointer;
        }

        & .active {
          color: #ff8847;
          border: 1px solid #ff8847;
          border-radius: 3px;
          a {
            color: #ff8847;
          }
        }

        & .title {
          min-width: 60px;
          padding-right: 10px;
          height: 24px;
          line-height: 24px;
          border: 1px solid transparent;
        }
      }
    }

    & .list {
      position: relative;
      display: flex;
      justify-content: flex-start;
      margin-right: -40px;
      flex-flow: row wrap;
      min-height: 371px;
      margin-top: -70px;

      & .card {
        display: inline-block;
        cursor: pointer;
        margin-top: 70px;
        margin-right: 36px;
        width: 270px;
        height: 152px;
        border: 2px solid rgba(0, 0, 0, 0);

        & .cover {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          box-shadow: 0 0 8px #c8c8c8;

          & .option {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: rgba(0, 0, 0, .6);
            z-index: 10;

            > div {
              display: block;
              width: 100px;
              height: 32px;
              text-align: center;
              line-height: 32px;
              border-radius: 5px;
              font-size: 14px;
              color: #ffffff;
              margin: 33px auto 0;
              background-color: #ff8847;
            }

            .btn:not(:first-child) {
              margin: 24px auto 0;
            }
          }

          img {
            position: absolute;
            width: 102%;
            height: 102%;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
          }

          & .mark {
            // position: relative;
            display: inline-block;
            width: 130px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
            background: rgb(232,185,71);
            background: -moz-linear-gradient(-45deg, rgba(232,185,71,1) 25%, rgba(252,238,162,1) 51%, rgba(232,185,71,1) 78%, rgba(232,185,71,1) 78%);
            background: -webkit-linear-gradient(-45deg, rgba(232,185,71,1) 25%,rgba(252,238,162,1) 51%,rgba(232,185,71,1) 78%,rgba(232,185,71,1) 78%);
            background: linear-gradient(135deg, rgba(232,185,71,1) 25%,rgba(252,238,162,1) 51%,rgba(232,185,71,1) 78%,rgba(232,185,71,1) 78%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e8b947', endColorstr='#e8b947',GradientType=1 );
            box-shadow: 0 0 14px rgba(12,3,7,.4);
            z-index: 100;
          }
        }

        & .title {
          font-size: 16px;
          margin-top: 14px;
          text-align: left;
          line-height: 1.3;
          color: #333333;
        }
      }

      & .card:hover {
        .cover {
          position: relative;
          box-sizing: border-box;

          & .option {
            display: block;
          }

          & .mark {
            display: none;
          }
        }
      }
    }
  }
</style>
