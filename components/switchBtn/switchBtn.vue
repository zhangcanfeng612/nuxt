<template>
  <div class="switch" :disabled="disabled" @click="click">
    <div class="switch-background" :class="backgroundClass">
      <div class="switch-spot" :style="positionStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      checked: this.value,
    };
  },
  computed: {
    backgroundClass () {
      let s = `switch-background-${this.checked}`;
      if (this.disabled) {
        s += '-disabled';
      }
      return s;
    },
    positionStyle () {
      if (this.checked) {
        return 'left: 43px';
      }
    },
  },
  methods: {
    click () {
      if (this.disabled) {
        return;
      }
      this.checked = !this.checked;
      this.$emit('click', this.checked);
    },
  },
};
</script>

<style lang="less" scoped>
.switch {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;

  width: 80px;
  height: 40px;
  border: none;

  & .switch-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 30px;

    transition-property: all;
    transition-duration: .35s;
    transition-timing-function: ease-out;

    & .switch-spot {
      position: absolute;

      border-radius: 34px;
      height: 34px;
      width: 34px;
      top: 3px;
      left: 3px;
      box-shadow: inset 0 0 0 1px rgb(198, 198, 198);

      background-color: var(--colorWhite);
      box-sizing: border-box;

      content: '';

      transition-property: all;
      transition-duration: .35s;
      transition-timing-function: cubic-bezier(.59,.01,.5,.99);
    }
  }
  & .switch-background-true {
    box-shadow: inset 0 0 0 1px #ff8847;
    background-color: #ff8847;
    cursor: pointer;
  }
  & .switch-background-false {
    box-shadow: inset 0 0 0 1px varrgb(198, 198, 198);
    background-color: rgb(198, 198, 198);
    cursor: pointer;
  }
  & .switch-background-true-disabled {
    box-shadow: inset 0 0 0 1px rgb(198, 198, 198);
    cursor: not-allowed;
  }
  & .switch-background-false-disabled {
    box-shadow: inset 0 0 0 1px rgb(198, 198, 198);
    cursor: not-allowed;
  }
}
</style>
