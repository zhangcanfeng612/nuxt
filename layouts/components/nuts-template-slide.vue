<template>
  <div class="slide">
    <div class="img">
      <img v-if="coverPicture !== ''" v-lazy="imgObj">
    </div>

    <div class="block">
      <div class="round" @click="onCreate">
        <div class="iconOne icon-edit">
          <span>创建</span>
        </div>
      </div>

      <div class="footer">
        <div class="templateName"> {{ title }} </div>
        <div class="iconTwo icon-preview"  v-if="template.slide_count">{{template.slide_count || ''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import $Server from '@/server/index';
  import $bpUtil from '@/plugins/util/bpUtil';
  export default {
    props: ['template'],
    computed: {
      title () {
        return this.template.name;
      },
      coverPicture () {
        return `${$Server.caseImgCdn}/nutsbp/template/resource/${this.template.template_resource_id}/case/all.jpg`;
      },
      /**
       * [limit description]
       * @return {[type]} [description]
       */
      limit () {
        return this.template.metadata !== null
          ? JSON.parse(this.template.metadata).isFreeMode === true
            ? JSON.parse(this.template.metadata).pageSize
            : 11
          : 11;
      },
      imgObj () {
        return {
          src: `${this.coverPicture}`,
          // loading: `${this.coverPicture}?basic=5p_60q`,
          // error: 'http://az.img.nutsbp.com/dev/nutsbp/template/resource/610/case/all.jpg',
        };
      },
    },
    methods: {
      onCreate () {
        this.$store.dispatch('GlobalComponent/show', {
          component: 'BASELOADING',
        });
        $bpUtil.onCreate(this.template, (res) => {
          console.error(res);
          this.$store.dispatch('GlobalComponent/hide', {
            component: 'BASELOADING',
          });
          this.$store.dispatch('GlobalComponent/show', {
            component: 'BASEMODAL',
            type: 'success',
            sloter: '创建完成',
            // },
          });
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  & .slide {
    display: inline-block;
    position: relative;
    margin: 36px 10px 0;
    width: 285px;
    height: 405px;
    box-shadow: 0 0 8px 0 rgba(12, 3, 7, 0.11);
    box-sizing: border-box;
    cursor: pointer;
    padding: 4px;


    & .img {
      position: relative;
      width: 100%;
      height: 100%;

      & img {
        width: 100%;
        height: 100%;
        /* width: 311px;
        height: 447px; */
        /* margin-top: 6px; */
      }

      & img[lazy="loading"] {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      & img[lazy="error"] {
        transform: scale(1.2,.5);
      }
    }

    & .block {
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      color: rgb(255, 255, 255);
      line-height: 30px;
      font-size: 12px;
      z-index: 10;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.65) 0%,
        rgba(0, 0, 0, 0.63) 1%,
        rgba(0, 0, 0, 0) 28%,
        rgba(0, 0, 0, 0) 51%,
        rgba(0, 0, 0, 0) 52%,
        rgba(0, 0, 0, 0) 66%,
        rgba(0, 0, 0, 0.65) 100%
      ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient(
        startColorstr="#a6000000",
        endColorstr="#a6000000",
        GradientType=0
      ); /* IE6-9 */
      /*box-shadow: var(--shadow);*/
      & .round {
        position: absolute;
        left: 50%;
        bottom: 40px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #ff8847;
        font-size: 18px;
        transform: translateX(-50%);
        z-index: 10;

        & .iconOne {
          position: absolute;
          top: 6px;
          font-size: 18px;
          left: 50%;
          transform: translateX(-50%);
        }

        & span {
          position: absolute;
          display: block;
          width: 60px;
          font-size: 14px;
          margin-top: -10px;
        }
      }

      & .footer {
        display: flex;
        position: absolute;
        width: 100%;
        height: 30px;
        top: 0;
        & .templateName {
          display: inline-block;
          line-height: 1;
          margin: 10px 0 0 16px;
        }
        & .iconTwo {
          flex: 1;
          line-height: 1;
          text-align: right;
          margin: 10px 10px 0 0;
          font-size: 12px;
          white-space: nowrap;
        }
      }
    }
  }

  & .slide:hover {
    & .block {
      opacity: 1;
    }
  }
</style>
