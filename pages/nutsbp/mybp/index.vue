<template>
  <div class="container">
    <div class="navigationBar">
      <navigation-bar />
    </div>
    <no-ssr>
      <div class="content">
        <div class="wrap">
          <div class="swiper">
            <base-slider animation="fade" class="advertisement-slide" width="100%" height="200px">
              <base-slider-item v-for="(i, index) in advertisement" :key="index">
                <div v-bind:style="{backgroundImage:'url(' + i.bannerImg + ')'}" class="img" ></div>
              </base-slider-item>
            </base-slider>
          </div>

          <div class="list">
            <slide-card
              v-for="(item) in list"
              class="slide"
              :key="item.unis"
              :slide="item"
            ></slide-card>

            <base-pagination
              :pageIndex="pageIndex"
              :total="total"
              :pageSize="pageSize"
              path="/nutsbp/mybp?pageIndex="
              v-if="total > 1"
            ></base-pagination>
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
  import axios from 'axios';
  import $Server from '@/server/index';
  import qs from 'qs';
  import _ from 'lodash';

  import { BaseSlider, BaseSliderItem } from '@/components/swiperSlide';
  import BasePagination from '@/components/pagination/Pagination';

  import NavigationBar from '@/layouts/components/nuts-navigation-bar';
  import SlideCard from '@/layouts/components/nuts-slide-card';

  const pageSize = 9; // 分页每页的数据
  export default {
    components: {
      NavigationBar,
      BaseSlider,
      BaseSliderItem,
      BasePagination,
      SlideCard,
    },
    middleware: ['onCheckLogin', 'auth'],
    data () {
      return {
        pageSize,
        advertisement: this.$store.state.Banner.BPBANNER,
      };
    },
    // try {
    //   const res = await $Server.get(url, data);
    //   console.error(res);
    // } catch (err) {
    //   const e = new Error(err);
    //   console.error(e);
    // }
    watchQuery: ['pageIndex'],
    async asyncData (context) {
      // 获取所有BP再对数据进行分页
      const pageIndex = qs.parse(context.query).pageIndex || 1;

      // 获取BP
      const getSlide = function () {
        const url = `${$Server.api}/slide`;
        const params = {};
        return $Server.get(url, params);
      };

      return axios.all([getSlide()])
        .then(axios.spread((slides) => {
          // 注意: 在localstrorage记录的数据: 如我的BP,个人信息等,在每次修改时都要重新存入
          return {
            list: _.slice(_.reverse(slides.data), (pageIndex - 1) * pageSize, (pageIndex) * pageSize),
            // list: (_.slice(slides.data)),
            total: Math.ceil(slides.data.length / pageSize),
            pageIndex: pageIndex,
          };
        }))
        .catch(() => {
          context.error({ statusCode: 404, message: 'BP获取失败' });
        });
    },
    mounted () {
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
        setTimeout(() => this.$nuxt.$loading.finish(), 500);
      });
    },
  };
</script>

<style lang="less" scoped>
  & .container {
    display: flex;
    min-width: 1200px;
    width: 100%;
    padding-top: 90px;
    background-color: #f7f7f7;

    & .navigationBar {
      /*position: absolute;*/
      top: 0;
      bottom: 0;
      left: 0;
      width: 180px;
      padding: 50px 0 0;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    }

    & .content {
      flex: 1;
      overflow: auto;
      padding: 20px 20px 0 20px;
      box-sizing: content-box;

      & .wrap {
        position: relative;
        display: flex;
        width: 1060px;
        flex-direction: column;
        height: 100%;
        margin: auto;

        & .swiper {
          & .img {
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }

        & .list {
          margin: -30px -50px 50px 0;

          & .slide {
            margin: 50px 50px 0 0;
          }
        }
      }
    }
  }
</style>
