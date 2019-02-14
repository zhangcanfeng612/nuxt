<template>
  <div class="slide-card">
    <div class="box">
      <div class="slide-img">
        <img v-lazy="imgObj" />
      </div>
      <div class="icon icon-delete"></div>
      <div class="block">
        <div class="round">
          <div class="icon icon-edit">
            <span>编辑</span>
          </div>
        </div>
      </div>
      <div class="foot">
        <button class="footBtns">
          <a href="//editor.nutsbp.com/share/53sedeno7qtk15410593921090i4cbvn8e659e193e" target="_blank" class="previewLink">
            <p class="icon icon-preview"></p>
            <p>预览</p>
          </a>
        </button>
        <button class="footBtns">
          <p class="icon icon-export"></p>
          <p>导出</p>
        </button>
        <button class="footBtns">
          <p class="icon icon-create"></p>
          <p>复制</p>
        </button>
        <button class="footBtns">
          <p class="icon icon-delivery"></p>
          <p>找投资人</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import $Server from '@/server/index';
  export default {
    data () {
      return {
        imgObj: {
          src: this.slide.index_thumbnail_url,
          error: `${$Server.imgCdn}/007/image/nuts_bp_pc/my_bp/my_bp_preset_page.png`,
          loading: `${this.slide.index_thumbnail_url}?basic=25p_60q`,
        },
      };
    },
    props: {
      slide: {
        type: Object,
        default: {},
        required: true,
      },
    },
  };
</script>

<style lang="less" scoped>
  .slide-card {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 320px;
    height: 188px;

    & .box {
      position: relative;
      width: 100%;
      height: 100%;

      & .icon-delete {
        position: absolute;
        font-size: 15px;
        color: #ffffff;
        z-index: 100;
        top: 10px;
        right: 10px;
        opacity: 0;
        cursor: pointer;
      }

      & .block {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        opacity: 0;
        transition: opacity 0.23s linear;
        cursor: pointer;

        & .round {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #ff8847;
          color: #ffffff;
          font-size: 18px;
          text-align: center;
          transform: translate(-50%,-50%);
          z-index: 10;

          & .icon-edit {
            position: absolute;
            top: 10px;
            font-size: 18px;
            left: 50%;
            transform: translateX(-50%);
          }

          & span {
            position: absolute;
            display: block;
            font-size: 14px;
            margin-top: 6px;
            word-break: keep-all;
          }
        }

      }

      & .slide-img {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        & img {
          width: 100%;
          height: 100%;
          transition: opacity .23s linear;
        }
      }

      & .foot {
        position: absolute;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 0;
        bottom: 0;
        background-color: #ffffff;
        box-shadow: 0 3px 8px #c8c8c8;
        overflow: hidden;
        transition: all .23s linear;
        z-index: 1;

        & .footBtns {
          flex: 1;
          font-size: 13px;
          color: #666666;
          text-align: center;
          line-height: 1.5;
          border: none;
          background: none;
          outline: none;
          cursor: pointer;
          transition: all .23s linear;

          & .previewLink {
            text-decoration: none;
            color: #666;
          }
        }

        & .footBtns:hover {
          & .icon {
            color: #ff8847;
          }
        }
      }
    }

    & .box:hover {
      & .icon-delete {
        opacity: 1;
      }
      & .block {
        opacity: 1;
      }

      & .foot {
        height: 54px;
        bottom: -54px;
      }
    }

    & .loading {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      color: rgba(255,255,255,1);
    }
  }
</style>
