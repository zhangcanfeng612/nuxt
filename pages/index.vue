<template>
  <section class="container">
    <no-ssr>
      <div class="swiper">
        <base-slider animation="fade" class="advertisement-slide" width="1028px" height="200px">
          <base-slider-item v-for="(i, index) in advertisement" :key="index">
            <div v-bind:style="{backgroundImage:'url(' + i.bannerImg + ')'}" class="img" ></div>
          </base-slider-item>
        </base-slider>
      </div>
    </no-ssr>

    <base-pagination
      :pageIndex="1"
      :total="10"
      :pageSize="10">
    ></base-pagination>

    <base-check-box></base-check-box>

    <base-switch-btn></base-switch-btn>

    <no-ssr>
      <base-radial-progress-bar
        :diameter="200"
        :completed-steps="2"
        :total-steps="10">
        <p>总数: 10</p>
        <p>完成数: 2</p>
      </base-radial-progress-bar>
    </no-ssr>


    <div @click="onBouncePage('personalInfo')">点击跳转</div>
    <h2>{{ $store.state.counter.visible }}记录于localstorage</h2>
    <button @click="addVal">add</button>
    <button @click="lessVal">less</button>
    <div>{{ AcceptData }}</div>
    <div>{{ project }}</div>
    <button @click="onLoading">点击loading</button>
    <button @click="onModal">点击显示模态框</button>
    <div class="icon-edit">全局css-fonttell</div>
    <button @click="onNutsAccount">点击显示登录弹窗</button>
  </section>
</template>

<script>
import $Server from '../service';

// 组件
import { BaseSlider, BaseSliderItem } from '@/components/swiperSlide/index.js';
import BasePagination from '@/components/pagination/Pagination';
import BaseCheckBox from '@/components/checkBox/CheckBox';
import BaseSwitchBtn from '@/components/switchBtn/switchBtn';
import BaseRadialProgressBar from '@/components/RadialProgressBar/RadialProgressBar';

export default {
  data () {
    return {
      project: 'default',
      advertisement: [
        {
          'bannerName': '会员免费无限下载',
          'bannerImg': '//www.nutsbp.com/uploadfile/2018/0813/20180813061651695.jpg',
          'bannerUrl': 'http://bp.nutsbp.com/PersonalCenter/Member',
          'bannerType': '会员',
          'bannerDescription': '',
        },
        {
          'bannerName': '商业计划书定制服务',
          'bannerImg': '//www.nutsbp.com/uploadfile/2018/0813/20180813061203206.jpg',
          'bannerUrl': 'http://www.nutsbp.com/service-ghost',
          'bannerType': '计划书 商业',
          'bannerDescription': '',
        },
        {
          'bannerName': '邀请好友领300元抵用券',
          'bannerImg': '//www.nutsbp.com/uploadfile/2018/0810/20180810022104551.jpeg',
          'bannerUrl': 'sharePage',
          'bannerType': '',
          'bannerDescription': '',
        },
        {
          'bannerName': '36氪报道',
          'bannerImg': '//www.nutsbp.com/uploadfile/2018/0810/20180810021841366.jpeg',
          'bannerUrl': 'http://36kr.com/p/5146165.html',
          'bannerType': '疯狂BP 36氪',
          'bannerDescription': '',
        },
        {
          'bannerName': '商业计划书范文下载',
          'bannerImg': '//www.nutsbp.com/uploadfile/2018/0810/20180810022208700.jpeg',
          'bannerUrl': '//www.nutsbp.com/business-plan',
          'bannerType': '',
          'bannerDescription': '',
        },
      ],
    };
  },
  components: {
    BaseSlider,
    BaseSliderItem,
    BasePagination,
    BaseCheckBox,
    BaseSwitchBtn,
    BaseRadialProgressBar,
  },
  methods: {
    onBouncePage (page) {
      page = page || '/';
      this.$router.push({
        path: page,
        params: {
          page: '页面传递参数',
        },
      });
    },
    addVal () {
      this.$store.dispatch('counter/add', {visible: this.$store.state.counter.visible});
    },
    lessVal () {
      this.$store.dispatch('counter/less', {visible: this.$store.state.counter.visible});
    },
    onLoading () {
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASELOADING',
        title: '你好',
        text: '数据成功传输',
      });
    },
    onModal () {
      this.$store.dispatch('GlobalComponent/show', {
        component: 'BASEMODAL',
        sloter: '你好',
      });
    },
    onNutsAccount () {
      this.$store.dispatch('GlobalComponent/show', {
        component: 'NUTSACCOUNT',
        page: 'login',
      });
    },
  },
  async asyncData (context) {
    const url = 'https://httpbin.org/get';
    const data = {};
    return $Server.get(url, data)
      .then((res) => {
        return { AcceptData: res.headers.Accept };
      })
      .catch((e) => {
        context.error({ statusCode: 404, message: 'Post not found' });
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
.container {
  color: red;
}

button {
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: aqua;
  border: 1px solid #ff8847;
  margin: 20px;
}

.img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
