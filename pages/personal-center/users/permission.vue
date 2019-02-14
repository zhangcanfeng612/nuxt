<template>
  <div class="personal-center-permission">
    <div v-if="list.length !== 0">
      <div class="tip"><span>提示: 关闭之后该BP无法被其他人查看</span></div>
      <div class="list">
        <div class="card" v-for="(item,index) in list" :key="index">
          <img :class="[{'active': !isPromise(item)}]" v-lazy="imgObj(item)" />
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="time">最后更新时间: {{ formatDate(item) }}</div>
          </div>
          <div class="option">
            <div :class="['radio', {'active': isPromise(item)}]" @click="onToggle(index)">
              <div class="inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="list.length === 0"  class="empty">
        <!-- 当前暂无BP -->
    </div>

  </div>
</template>

<script>
  import $Server from '@/server/index';
  import axios from 'axios';

  export default {
    name: 'personal-center-permission',
    methods: {
      onToggle (index) {
        // TODO: 开关权限
        this.list(index).share_privacy_id = 3;
      },
      imgObj (slide) {
        return {
          src: slide.index_thumbnail_url,
          error: `${$Server.imgCdn}/007/image/nuts_bp_pc/my_bp/my_bp_preset_page.png`,
          loading: `${slide.index_thumbnail_url}?basic=25p_60q`,
        };
      },
      formatDate (slide) {
        const time = new Date(slide.update_time);
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate();
        return `${year}-${month}-${date}`;
      },
      isPromise (slide) {
        return slide.share_privacy_id === 1;
      },
    },
    async asyncData (context) {
      // 获取所有BP
      const getSlide = function () {
        const url = `${$Server.api}/slide`;
        const params = {};
        return $Server.get(url, params);
      };

      return axios.all([getSlide()])
        .then(axios.spread((slides) => {
          return {
            list: slides.data,
          };
        }))
        .catch(() => {
          context.error({ statusCode: 404, message: 'BP获取失败' });
        });
    },
  };
</script>

<style lang="less" scoped>
  & .personal-center-permission {

    & .tip {
      display: block;
      width: 650px;
      padding: 43px  0 0;
      margin: 0 auto;
      border-bottom: 1px solid #c8c8c8;

      & span {
        display: inline-block;
        padding: 0 0 12px 27px;
        font-size: 12px;
        color: #ff8847;
      }
    }



    & .list {
      height: 600px;
      padding: 0 49px;

      & .card {
        display: flex;
        border-bottom: 1px solid #cccccc;
        height: 150px;

        & img {
          width: 158px;
          height: 89px;
          margin: 31px 0 0 29px;
          border: 1px solid #cbcbcb;
          box-shadow: 0 0 10px #c5c5c5;
        }
        & img.active {
          filter: grayscale(100%);
        }

        & .content {
          margin-left: 26px;
          color: #787878;

          & .title {
            font-size: 16px;
            height: 16px;
            margin-top: 45px;
          }
          & .time {
            font-size: 12px;
            margin-top: 14px;
          }
        }

        & .option {
          position: relative;
          flex: 1;

          & .radio {
            position: absolute;
            right: 32px;
            top: 61px;
            background-color: #c6c6c6;
            width: 50px;
            height: 25px;
            border-top-right-radius: 13px 50%;
            border-bottom-right-radius: 13px 50%;
            border-bottom-left-radius: 13px 50%;
            border-top-left-radius: 13px 50%;
            text-align: right;
            cursor: pointer;
            transition: all .23s;

            & .inner {
              position: absolute;
              top: 2px;
              left: 2px;
              width: 21px;
              height: 21px;
              background-color: #fff;
              border-radius: 50%;
              transition: all .23s;
            }
          }

          & .radio.active {
            background-color: #ff8847;

            & .inner {
              right: 2px;
              left: auto;
            }
          }
        }
      }
    }
  }
</style>
