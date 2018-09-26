<template>
  <transition name="modal-mask" @after-leave="afterLeave">
  <div
    class="modal-mask"
    v-show="value"
    @click="clickBackdrop"
    :class="{ 'modal-transparent': !backdrop}">
    <transition name="modal">
      <div v-show="value" @click.stop class="modal-content">
        <!-- <slot v-html="sloter"></slot> -->
        <div v-html="sloter"></div>
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
    },

    watch: {
      'value' (val) {
        this.init(val);
      },
    },

    methods: {
      close () {
        this.$store.dispatch('GlobalComponent/hide', {
          component: 'BASEMODAL',
        });
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

      afterLeave () {
        this.$emit('afterLeave');
      },

      clickBackdrop () {
        this.close();
      },

      init (show) {
        if (show) {
          this.$emit('show');
          this.showHandler();
        } else {
          this.$emit('hide');
        }
      },
    },

    created () {
      this.init(this.value);
    },
  };
</script>



<style scoped>
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
  background: rgba(0, 0, 0, 0.8);
  outline: none;
}

.modal-mask.modal-transparent {
  background: transparent;
  pointer-events: none;
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
  pointer-events: auto;
  padding: 50px;
  text-align: center;
  color: rgb(200,200,200);
  background-color: #ffffff;
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

</style>
