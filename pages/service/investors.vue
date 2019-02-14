<template>
  <div class="service-investors">
    <nuxt-link  class="ad" :to="{path: 'featured-project'}"  target="_blank">
      <img src="~/static/image/banner_invest_selection.jpg" />
    </nuxt-link>


    <div class="selectArea">
      <!-- 投资领域 -->
      <div class="btnBox">
        <div class="title">投资领域:</div>
        <div class="industrylList">

          <span
            v-for="item in industryLabels"
            :class="['item', {'actived': item.industry_id === conditonIndustry[0] }]"
          >{{item.name}}</span>
        </div>
      </div>

      <div class="filter">
        <span>智能推荐</span><span class="icon-filter"></span>
      </div>

      <div class="filterBox">
        <div class="background"></div>
        <div class="content">
          <div class="link">
            <span>智能推荐</span>
          </div>
          <div class="link">
            <span>浏览数</span>
          </div>
          <div class="link">
            <span>最新上线</span>
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="prompt">若投资人一周内未回复，系统会将投递金原路返还。</div>
      <div class="card" v-for="(item,index) in investorsList" :key="item.account">
        <img v-bind:src="(item.card.head_image_url) ? item.card.head_image_url : require('~/static/image/setup_head.jpg')" class="avatar">
        <div class="recommend" v-if="item.flag === 'recommend'">荐</div>
        <div class="combination">
          <div class="content">
            <div class="info">
              <div class="name">{{(item.card)? item.card.name : ''}}</div>
              <div class="job">{{(item.card)? item.card.title : ''}}</div>
            </div>
            <div class="area">
              <span>投资领域: {{ownIndustryName(item).join('、')}}</span>
            </div>
          </div>
          <div class="record">
            <!--<div class="count" v-html="showMessage"></div>-->
            <div class="price">
              <div class="info">{{(item.investor) ? item.investor.deliverPrice / 100 : 0}}<span class="unit">元/次</span></div>
              <div class="text">付费向Ta投BP</div>
            </div>
          </div>
        </div>
      </div>

      <base-pagination
        :pageIndex="pageIndex"
        :total="total"
        :pageSize="pageSize"
        path="/service/investors?pageIndex="
        v-if="total > 1"
      ></base-pagination>
    </div>

    <div class="empty" v-if="total === 0">
      <span class="icon icon-noresult"></span>
      <div class="text">
        <span>没有找到想要的信息?</span>
        <span>换个关键词搜索</span>
      </div>
    </div>

  </div>
</template>

<script>
  import BasePagination from '@/components/pagination/Pagination';
  import $Server from '@/server/index';
  import axios from 'axios';
  import _ from 'lodash';
  import qs from 'qs';

  let conditonIndustry = [0]; // 筛选条件: 行业
  let conditonSearch = []; // 筛选条件: 搜索框
  let conditonOrder = 'default'; // 筛选条件 1.created_at 2.pv 3.default
  let order = 'desc';
  const pageSize = 10;
  let total = 0;
  let pageIndex = 1;

  export default {
    name: 'service-investors',
    data () {
      return {
        conditonIndustry,
        conditonSearch,
        conditonOrder,
        pageIndex,
        pageSize: pageSize,
      };
    },
    components: {BasePagination},
    methods: {
      ownIndustryName (item) {
        if (!item.user_module) {
          return [];
        } else {
          let ownIndustry = [];
          // 遍历投资人列表将投资领域ID存入数组
          for (let i = 0; i < item.user_module.length; i++) {
            if (item.user_module[i].type === 'preference') {
              ownIndustry = ownIndustry.concat(
                item.user_module[i].data.field
              );
            }
          }
          // 遍历投资领域列表将投资领域ID转化为名字
          let IndustryNameList = [];
          for (let j = 0; j < ownIndustry.length; j++) {
            for (let x = 0; x < this.industryLabels.length; x++) {
              if (ownIndustry[j] === this.industryLabels[x].industry_id) {
                IndustryNameList.push(this.industryLabels[x].name);
              }
            }
          }
          // 数组去重
          return [...new Set(IndustryNameList)];
        }
      },
    },
    watchQuery: ['pageIndex'],
    async asyncData (context) {
      const pageIndex = qs.parse(context.query).pageIndex || 1;
      // 获取行业标签
      function getLabels () {
        const url = `${$Server.api}/industry`;
        const params = {};
        return $Server.get(url, params);
      }

      // TODO:获取投资人列表
      function getInvestorsList () {
        const url = `${$Server.apiPr}`;
        const searchCondition = Array.from(conditonSearch).length === 0 ? [] : conditonSearch;
        const params = {
          query: `query {
            user (search: ${JSON.stringify(searchCondition)},
                  userModuleField: ${conditonIndustry},
                  field: "${conditonOrder}",
                  pr_state: [1],
                  limit: 1000,
                  investorState: 0,
                  order: "${order}"){
              id,
              pv,
              account,
              card {
                _id,name,phone,email,title,profile,head_image_url
              },
              flag,
              user_module (type: "preference",limit: 1){id, name, type, data, metadata, created_at, updated_at, user_id},
              investor {
                id, sort, deliverPrice, deliverCount, deliverIncome, state, deliverFinish, deliverAnswerRate,
                user { id, gender }
              },
            }
          }`,
        };
        return $Server.get(url, params);
      }
      return axios.all([getLabels(), getInvestorsList()])
        .then(axios.spread((industryLabels, investorsList) => {
          const getIndustryArr = () => {
            industryLabels.data.unshift({ name: '全部', industry_id: 0, show: '1' });
            return _.remove(industryLabels.data, (item) => {
              return item.show === '1';
            });
          };

          const getInvestorsArr = () => {
            let arr = [];
            for (let i = 0; i < investorsList.data.user.length; i++) {
              if (investorsList.data.user[i].investor) {
                if (investorsList.data.user[i].investor.state === 0) {
                  arr.push(investorsList.data.user[i]);
                }
              }
            }
            total = Math.ceil(arr.length / pageSize);
            return _.slice(arr, (pageIndex - 1) * pageSize, (pageIndex) * pageSize);
          };
          return {
            industryLabels: getIndustryArr(),
            investorsList: getInvestorsArr(),
            pageIndex,
            total,
          };
        }))
        .catch(() => {
          context.error({ statusCode: 404, message: '投资人列表获取失败' });
        });
    },
  };
</script>

<style lang="less" scoped>
  & .service-investors {
    top: 100px;
    width: 1200px;
    color: #505050;
    margin: 100px auto 0;

    & .ad {
      width: 1200px;
      height: 240px;
      cursor: pointer;
    }

    & .selectArea {
      position: relative;
      min-height: 136px;
      padding-top: 75px;
      border-bottom: 1px solid #c8c8c8;

      & .btnBox {
        display: flex;
        width: 752px;
        padding: 0 0 27px 20px;

        & .title {
          width: 220px;
          padding-top: 6px;
          text-align: center;
        }

        & .industrylList {
          & .item {
            display: inline-block;
            height: 26px;
            line-height: 26px;
            margin-left: 2px;
            margin-bottom: 8px;
            padding: 0 10px;
            border-radius: 3px;
            font-size: 14px;
            cursor: pointer;
          }
          & .item:hover {
            color: rgb(100, 100, 100);
          }
          & .actived,
          & .actived:hover {
            border: 1px solid #ff8847;
            color: #ff8847;
          }
        }
      }

      & .filter {
        position: absolute;
        display: inline-block;
        right: 50px;
        top: 75px;
        font-size: 14px;
        cursor: pointer;

        & .icon-filter {
          margin-left: 6px;
        }
      }

      & .filterBox {
        display: none;
        position: absolute;
        text-align: center;
        top: 105px;
        left: 1036px;
        z-index: 100000;

        & .background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        & .content {
          position: absolute;
          width: 135px;
          border: 1px solid rgb(200, 200, 200);
          box-sizing: border-box;
          color: rgb(200, 200, 200);
          background-color: rgba(255,255,255,1);
          box-shadow: 5px 7px 5px rgba(12,3,7,0.12);

          & .link {
            display: inline-block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            font-size: 12px;
            cursor: pointer;
            text-decoration: none;
            color: #787878;

            & span {
              display: inline-block;
              width: 80%;
              height: 100%;
              box-sizing: border-box;
            }
          }
          & .link:hover {
            background-color: #f5f5f5;
            color: #646464;
          }

          & .link:not(:last-child) {
            & span {
              border-bottom: 1px solid rgb(200, 200, 200);
            }
          }
        }
      }
    }

    & .list {
      & .prompt {
        position: relative;
        width: 1000px;
        margin: 20px 0 43px;
        font-size: 14px;

        &:before {
          position: absolute;
          content: "*";
          width: 5px;
          height: 5px;
          color: #ff8847;
          top: 5px;
          left: -10px;
        }
      }

      & .card {
        position: relative;
        display: inline-block;
        width: 520px;
        height: 170px;
        background-color: #ffffff;
        box-shadow: 0 0 15px rgba(12,3,7,.1);
        color: rgb(0, 0, 0);
        cursor: pointer;
        margin-bottom: 60px;
        padding-bottom: 20px;
        box-sizing: border-box;
        border-radius: 5px;

        &:nth-child(even) {
          margin-left: 40px;
        }

        &:nth-child(odd) {
          margin-left: 120px;
        }

        & .avatar {
          position: absolute;
          top: 50%;
          left: -38px;
          transform: translate(0, -50%);
          width: 76px;
          height: 76px;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(12,3,7,.2);
          object-fit: cover;
        }

        & .recommend {
          position: absolute;
          width: 20px;
          top: 40px;
          left: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          border: 2px solid #ffffff;
          background-color: #ff3700;
          border-radius: 50%;
          color: #ffffff;
          font-size: 12px;
          z-index: 10;
        }

        & .combination {
          display: flex;

          & .content {
            width: 300px;
            & .info {
              display: inline-block;
              max-width: 250px;
              margin: 26px 0 35px 66px;

              & .name {
                width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 24px;
              }

              & .job {
                width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 15px;
              }
            }

            & .area {
              width: 300px;
              margin-left: 66px;
              font-size: 14px;
              line-height: 1.7;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }

          & .record {
            flex: 1;
            margin-right: 20px;
            text-align: right;

            & .count {
              height: 14px;
              margin: 25px 0 62px;
              font-size: 14px;

              & span {
                color: #ff8847;
              }
            }

            & .price {
              font-size: 12px;

              & .info {
                font-size: 26px;
                padding-left: 17px;
              }

              & .unit {
                font-size: 14px;
              }

              & .text {
                color: #969696;
                font-size: 12px;
                margin-top: 10px;
              }
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
</style>
