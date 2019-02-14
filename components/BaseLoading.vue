<template>

  <div id="Loading">
    <div class="background" v-bind:style="{backgroundColor: backgroundColor}"></div>
    <div class="container">
      <div class="spinner" v-if="show === 1">
        <div class="bubble-1"></div>
        <div class="bubble-2"></div>
      </div>
      <div class="lines" v-if="show === 2">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NutsLoading',
  props: {
    msg: {
      type: String,
      default: '读取中',
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0,0,0,.7)',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      show: 2,
    };
  },
  mounted () {
    console.error(this.text);
  },
};
</script>

<style scoped>

#Loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  text-align: center;

  & .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  & .container {
    position: relative;
    width: 100px;
    height: 100px;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;

    & .line:nth-last-child(3) {
      animation: loadingA 1.5s 0s infinite;
    }

    & .line:nth-last-child(2) {
      animation: loadingA 1.5s 0.5s infinite;
    }

    & .line:nth-last-child(1) {
      animation: loadingA 1.5s 1s infinite;
    }

    & .line {
      display: inline-block;
      width: 16px;
      height: 20px;
      border-radius: 16px;
      background-color: #ff8847;
      margin: 0 2px;
    }

    & .spinner {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto;
      animation: loadingI 1.5s linear infinite;

      & .bubble-1,
      & .bubble-2 {
        animation: bounce 2s ease-in-out infinite;
      }

      & .bubble-1,
      & .bubble-2 {
        position: absolute;
        top: 0;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background-color: #ff8847;
      }

      & .bubble-1 {
        animation-delay: -1s;
        top: auto;
        bottom: 0;
      }
    }
  }
}

@keyframes loadingA {
  50% {
    height: 45px;
  }
  100% {
    height: 16px;
  }
}

@keyframes loadingI {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
