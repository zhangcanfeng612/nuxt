<template>
    <div class="back-top" :style="{right:right+'px',bottom:bottom+'px'}" v-show="show" @click="_click">
        <a v-text="text">返回顶部</a>
    </div>
</template>
<script>
    export default {
      name: 'backTop',
      data () {
        return {
          show: true,
        };
      },
      props: {
        text: {
          type: String,
          default: '返回顶部',
        },
        height: {
          type: Number,
          default: 200,
        },
        bottom: {
          type: Number,
          default: 30,
        },
        right: {
          type: Number,
          default: 30,
        },
        duration: {
          type: Number,
          default: 200,
        },
      },
      components: {},
      methods: {
        _getScrollTop () {
          return document.documentElement.scrollTop || document.body.scrollTop;
        },
        _windowScroll () {
          if (this._getScrollTop() > this.height) {
            this.show = true;
          } else {
            this.show = false;
          }
        },
        _click () {
          let top = this._getScrollTop();
          let v = top / this.duration;
          let timer = setInterval(function () {
            // 30ms的距离
            top -= Math.abs(v * 30);
            if (top <= 1) {
              top = 0;
              clearInterval(timer);
            }
            document.body.scrollTop = top;
            document.documentElement.scrollTop = top;
          }, 30);
          this.$emit('click');
        },
      },
      computed: {},
      mounted () {
        window.addEventListener('scroll', this._windowScroll);
      },
      filters: {},
    };
</script>

<style lang="less" scoped>
  .back-top {
    position: fixed;
    z-index: 99;
    & a {
      display: block;
      padding: 10px;
      color: #fff;
      text-align: center;
      border-radius: 2px;
      background: #2d8cf0;
      cursor: pointer;
    }
  }
</style>

