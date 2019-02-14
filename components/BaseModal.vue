<!-- 注: 该组件用于全局的提示信息 -->
<template>
  <transition name="modal-mask">
    <div
      class="modal-mask"
      v-show="value"
      @click="clickBackdrop"
      :class="{ 'modal-transparent': !backdrop}">
      <transition name="modal">
        <div v-show="value" @click.stop class="modal-content">
          <!-- 成功 -->
          <div class="ui-success" v-if="type === 'success'">
            <svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-3" transform="translate(2.000000, 2.000000)">
                  <circle id="Oval-2" stroke="rgba(165, 220, 134, 0.2)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                  <circle  class="ui-success-circle" id="Oval-2" stroke="#A5DC86" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                  <polyline class="ui-success-path" id="Path-2" stroke="#A5DC86" stroke-width="4" points="19 38.8036813 31.1020744 54.8046875 63.299221 28"></polyline>
                </g>
              </g>
            </svg>
          </div>

          <!-- 失败 -->
          <div class="ui-error" v-if="type === 'fail'">
            <svg  viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-2" transform="translate(2.000000, 2.000000)">
                  <circle id="Oval-2" stroke="rgba(252, 191, 191, .5)" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                  <circle  class="ui-error-circle" stroke="#F74444" stroke-width="4" cx="41.5" cy="41.5" r="41.5"></circle>
                  <path class="ui-error-line1" d="M22.244224,22 L60.4279902,60.1837662" id="Line" stroke="#F74444" stroke-width="3" stroke-linecap="square"></path>
                  <path class="ui-error-line2" d="M60.755776,21 L23.244224,59.8443492" id="Line" stroke="#F74444" stroke-width="3" stroke-linecap="square"></path>
                </g>
              </g>
            </svg>
          </div>

          <!-- sloter -->
          <div v-html="sloter" class="text"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        timer: null,
      };
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      timeout: {
        type: Number,
      },
      backdrop: {
        type: Boolean,
        default: true,
      },
      sloter: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'success',
      },
      callback: {
        type: Function,
        default: () => {},
      },
    },
    watch: {
      'value' (val) {
        this.update(val);
      },
    },
    methods: {
      onClose () {
        this.$store.dispatch('GlobalComponent/hide', {
          component: 'BASEMODAL',
        });
        this.callback();
      },
      showHandler () {
        clearTimeout(this.timer);
        this.$nextTick(() => {
          let $input = this.$el && this.$el.querySelector('input');
          if ($input) {
            $input.focus();
          } else {
            this.$el && this.$el.focus();
          }
          if (this.timeout) {
            this.timer = setTimeout(() => {
              this.close();
            }, this.timeout);
          }
        });
      },
      clickBackdrop () {
        this.onClose();
      },
      update (show) {
        if (show) {
          this.$emit('show');
          this.showHandler();
        } else {
          this.$emit('hide');
        }
      },
    },
    created () {
      this.update(this.value);
    },
  };
</script>



<style lang="less">
  /* 模态框切换动画(包括弹窗的动画) */
  .modal-mask.modal-transparent {
    background: transparent;
    pointer-events: none;
  }

  .modal-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    outline: none;
  }

  .modal-enter-active {
    animation: bounce-in .5s;
  }
  .modal-leave-active {
    animation: bounce-out .3s;
  }

  /* 淡入最终态 */
  .modal-mask-enter-active {
    transition: opacity 0.5s
  }

  /* 淡出最终态 */
  .modal-mask-leave-active {
    transition: opacity 0.5s;
    opacity: 0;
    position: fixed;
  }

  /* 淡入初始态 */
  .modal-mask-enter {
    opacity: 0;
  }

  .modal-content {
    /*max-width: 400px;*/
    pointer-events: auto;
    text-align: center;
    color: rgb(200,200,200);
    background-color: #ffffff;
    box-shadow: rgba(12, 3, 7, 0.2) 0 20px 35px 0;
    border-radius: 5px;

    & .text {
      font-size: 20px;
      padding: 20px 100px;
    }
  }


  /* 成功 || 失败动画 */
  & .ui-success,
  & .ui-error {
    width: 100px; height: 100px;
    margin: 40px auto;
    // border:1px solid #eee;
  }

  & .ui-success{
    &-circle {
      stroke-dasharray: 260.75219024795285px, 260.75219024795285px;
      stroke-dashoffset: 260.75219024795285px;
      transform-origin: center center;
      stroke-linecap: round;
      animation: ani-success-circle 1s ease-in both;
    }
    &-path {
      stroke-dasharray: 60px, 64px;
      stroke-dashoffset: 62px;
      stroke-linecap: round;
      animation: ani-success-path .4s 1s ease-in both;
    }
  }

  @keyframes ani-success-circle {
    to{stroke-dashoffset: 782.2565707438586px;}
  }

  @keyframes ani-success-path {
    0% {stroke-dashoffset: 62px;}
    65% {stroke-dashoffset: -5px;}
    84%{stroke-dashoffset: 4px;}
    100%{stroke-dashoffset: -2px;}
  }

  & .ui-error{
    &-circle{
      stroke-dasharray:260.75219024795285px, 260.75219024795285px;
      stroke-dashoffset: 260.75219024795285px;
      animation: ani-error-circle 1.2s linear;
    }
    &-line1{
      stroke-dasharray: 54px, 55px;
      stroke-dashoffset: 55px;
      stroke-linecap: round;
      animation: ani-error-line .15s 1.2s linear both;
    }
    &-line2{
      stroke-dasharray: 54px, 55px;
      stroke-dashoffset: 55px;
      stroke-linecap: round;
      animation: ani-error-line .2s .9s linear both;
    }
  }

  @keyframes ani-error-line{
    to { stroke-dashoffset: 0; }
  }

  @keyframes ani-error-circle {
    0% {
      stroke-dasharray: 0, 260.75219024795285px;
      stroke-dashoffset: 0;
    }
    35% {
      stroke-dasharray: 120px, 120px;
      stroke-dashoffset: -120px;
    }
    70% {
      stroke-dasharray: 0, 260.75219024795285px;
      stroke-dashoffset: -260.75219024795285px;
    }
    100% {
      stroke-dasharray: 260.75219024795285px, 0;
      stroke-dashoffset: -260.75219024795285px;
    }
  }

  @keyframes bounce-in {
    from {
      opacity: 0;
      transform: scale3d(0.5, 0.5, 0.5);
    }

    20% {
      opacity: 0.5;
      transform: scale3d(1.2, 1.2, 1.2);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes bounce-out {
    from {
      transform: scale3d(1, 1, 1);
    }

    20% {
      opacity: 0.5;
      transform: scale3d(0.5, 0.5, 0.5);
    }

    to {
      opacity: 0;
      transform: scale3d(0, 0, 0);
    }
  }


  @keyframes ani-success-circle {
    to{stroke-dashoffset: 782.2565707438586px;}
  }

  @keyframes ani-success-path {
    0% {stroke-dashoffset: 62px;}
    65% {stroke-dashoffset: -5px;}
    84%{stroke-dashoffset: 4px;}
    100%{stroke-dashoffset: -2px;}
  }
</style>
