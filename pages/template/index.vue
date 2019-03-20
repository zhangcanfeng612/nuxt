<template>
  <div class="container">
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

    <div class="tabbox">

      <!-- 导航 -->
      <div class="heading">
        <div class="tab">
          <nuxt-link :to="{path: 'template',query: { type: 'recommend' }}" @click="type = 'recommend'" :class="[{'active': type === 'recommend'}]">网站推荐模板</nuxt-link>
          <nuxt-link :to="{path: 'template',query: { type: 'mechanism' }}" @click="type = 'mechanism'" :class="[{'active': type === 'mechanism'}]">机构推荐模板</nuxt-link >
          <nuxt-link :to="{path: 'template',query: { type: 'profession' }}" @click="type = 'profession'" :class="[{'active': type === 'profession'}]">专业模板</nuxt-link >
        </div>
      </div>

      <div class="content">
        <ul>
          <!-- 网站推荐模板 -->
          <li v-if="type === 'recommend'">
            <!-- 行业 -->
            <div class="labels">
              <div class="title">行业:</div>
              <div class="list">
                <ul>
                  <li :class="[{'active': item.label === industry}]" v-for="(item,index) in recommendLabes" :key="index" v-if="item.label !== '机构模板'">
                    <nuxt-link :to="{path: 'template',query: { type: 'recommend', pageindex: 1, industry: item.label }}"
                    >{{ (item.label) ? item.label: '全部' }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <slide-card v-for="(item) in slides" :key="item.template_resource_id" :template="item"></slide-card>

            <base-pagination
              :pageIndex="pageIndex"
              :total="total"
              :pageSize="pageSize"
              path="/template?type=recommend&pageindex="
              v-if="total > 1"
            ></base-pagination>
          </li>

          <!-- 机构推荐模板 -->
          <li v-if="type === 'mechanism'">
            <slide-card v-for="(item) in slides" :key="item.template_resource_id" :template="item"></slide-card>
            <base-pagination
              :pageIndex="pageIndex"
              :total="total"
              :pageSize="pageSize"
              path="/template?type=mechanism&pageindex="
              v-if="total > 1"
            ></base-pagination>
          </li>

          <!-- 专业模板 -->
          <li v-if="type === 'profession'">
          </li>
        </ul>

        <div class="empty" v-if="total === 0">
          <span class="icon icon-noresult"></span>
          <div class="text">
            <span>没有找到想要的信息?</span><span>换个关键词搜索</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import _ from 'lodash';
  import qs from 'qs';

  import $Server from '@/server/index';
  import SlideCard from '@/layouts/components/nuts-template-slide';
  import BasePagination from '@/components/pagination/Pagination';

  const pageSize = 12;
  export default {
    data () {
      return {
        advertisement: this.$store.state.Banner.BPBANNER,
        pageSize: pageSize,
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
      };
    },
    components: {
      SlideCard,
      BasePagination,
    },
    watchQuery: ['type', 'pageindex', 'industry'],
    async asyncData (context) {
      let type = qs.parse(context.query).type || 'recommend'; // recommend or mechanism or profession
      let pageIndex = qs.parse(context.query).pageindex || 1;
      let industry = qs.parse(context.query).industry || '';

      // 获取网页推荐模板
      function getRecommendTemplate () {
        const url = `${$Server.api}/template_resource`;
        const params = {
          field: 'o',
          order: 'asc',
          type: 'layout',
          rank_type: 'rank1',
          keys: (industry === '') ? [] : [industry],
        };
        return $Server.get(url, params);
      }

      // 获取机构推荐模板
      function getMechanismTemplate () {
        const url = `${$Server.api}/template_resource`;
        const params = {
          field: 'o',
          order: 'desc',
          type: 'layout',
          keys: ['机构模板'],
        };
        return $Server.get(url, params);
      }

      // 获取企业模板
      function getProfessionTemplate () {
        const url = `${$Server.api}/template_resource`;
        const params = {
          field: 'o',
          order: 'desc',
          type: 'layout',
          keys: ['企业模板'],
        };
        return $Server.get(url, params);
      }

      // 获取所有label
      function getLabel () {
        const url = `${$Server.api}/template_resource/label`;
        const params = {
          type: 'industry',
        };
        return $Server.get(url, params);
      }

      switch (type) {
        case 'recommend': // 网站推荐
          return axios.all([getRecommendTemplate(), getLabel()])
            .then(axios.spread((slides, labels) => {
              const labelsArr = labels.data;
              labelsArr.unshift({label: ''});
              return {
                recommendLabes: labelsArr,
                type: type,
                slides: _.slice(_.sortBy(slides.data, ['rank']), (pageIndex - 1) * pageSize, (pageIndex) * pageSize),
                total: Math.ceil(_.sortBy(slides.data, ['rank']).length / pageSize),
                pageIndex: pageIndex,
                industry: industry,
              };
            }))
            .catch(() => {
              context.error({ statusCode: 404, message: 'BP获取失败' });
            });

        case 'mechanism': // 机构推荐模板
          return axios.all([getMechanismTemplate()])
            .then(axios.spread((slides) => {
              return {
                type: type,
                slides: _.slice(slides.data, (pageIndex - 1) * pageSize, (pageIndex - 1) * pageSize + pageSize),
                total: Math.ceil(slides.data.length / pageSize),
                pageIndex: pageIndex,
                recommendLabes: [],
                industry: '',
              };
            }))
            .catch(() => {
              context.error({ statusCode: 404, message: 'BP获取失败' });
            });

        case 'profession': // 企业模板
          return axios.all([getProfessionTemplate()])
            .then(axios.spread((slides) => {
              return {
                type: type,
                slides: _.slice(slides.data, (pageIndex - 1) * pageSize, (pageIndex - 1) * pageSize + pageSize),
                total: Math.ceil(slides.data.length / pageSize),
                pageIndex: pageIndex,
                recommendLabes: [],
                industry: '',
              };
            }))
            .catch(() => {
              context.error({ statusCode: 404, message: 'BP获取失败' });
            });
      }
    },
  };
</script>

<style lang="less" scoped>
  & .container {
    min-width: 1200px;
    width: 100%;
    background-color: #f7f7f7;

    & .swiper-container {
      display: block;
      height: 240px;
      width: 1200px;
      margin: 100px auto 0;

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

    & .tabbox {
      width: 1200px;
      min-height: 400px;
      margin: 20px auto 0;

      & .heading {
        position: relative;
        width: 100%;
        height: 48px;
        margin-top: 50px;
        border-bottom: 1px solid #c8c8c8;

        & .tab {
          position: absolute;
          bottom: 0;

          & a {
            display: inline-block;
            width:160px;
            height:40px;
            line-height: 40px;
            text-align: center;
            text-decoration: none;
            font-size: 14px;
            color:rgba(120,120,120,1);
            cursor: pointer;
            background:rgba(242,242,242,1);
            border: 1px solid rgba(220, 220, 220, 1);
            border-bottom: none;
            transition: all .2s linear;
            box-sizing: border-box;
            border-radius:5px 5px 0 0;
            vertical-align: bottom;

            &:hover:not(.active) {
              height: 48px;
              line-height: 48px;
              color: rgb(80,80,80);
            }
          }

          & .active {
            height: 47px;
            line-height: 47px;
            color: white;
            border: none;
            background:linear-gradient(180deg,rgba(254,214,100,1),rgba(255,136,71,1));
          }
        }
      }

      & .content {
        position: relative;
        margin: 0 -10px;
        overflow: hidden;
        font-size: 14px;
        padding: 20px 0 50px;

        & .labels {
          position: relative;
          display: flex;
          margin: 0 10px;
          padding-bottom: 60px;

          & .title {
            padding-right: 10px;
            height: 24px;
            line-height: 24px;
            border: 1px solid transparent;
            color: #787878;
          }

          & .list {
            flex: 1;

            & li {
              display: inline-block;
              height: 24px;
              line-height: 24px;
              padding: 0 10px;
              border: 1px solid transparent;
              cursor: pointer;
              color: rgb(120, 120, 120);

              & a {
                text-decoration: none;
                color: rgb(120, 120, 120);
              }
            }

            & .active {
              border-color: #ff8847;
              border-radius: 3px;

              & a {
                color: #ff8847!important;
              }
            }
          }
        }
      }

      & .empty {
        display: block;
        text-align: center;
        color: #969696;

        & .icon {
          display: block;
          font-size: 120px;
          margin: 174px 0 31px;
        }

        & .text {
          display: inline-block;
          width: 140px;
          font-size: 14px;
          line-height: 1.5;
        }
      }
    }
  }
</style>
