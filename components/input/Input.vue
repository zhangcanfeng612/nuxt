<template>
  <div class="input-box">
    <input v-bind="$props" v-model="inputValue" :type="inputType" :name="name"
           :class="[{'disabled': disabled},{'input-control': !isCleanStyle}]"
           @focus="_focus"
           @blur="_blur"
           @keyup="_keyup"
           @keydown="_keydown"
            :readonly="readonly">
    <div class="errorMsg" v-show="errorMsg">{{ errorValue }} </div>
  </div>
</template>
<script>
  export default {
    name: 'BaseInput',
    data () {
      return {
        inputValue: this.value,
        inputType: this.type,
        errorValue: this.errorMsg,
      };
    },
    watch: {
      inputValue (val) {
        this.$emit('input', val);
      },
    },
    props: {
      type: {
        type: String,
        default: 'text',
      },
      placeholder: String,
      value: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      maxLength: {
        type: Number,
        default: 50,
      },
      isCleanStyle: {
        type: Boolean,
        default: false,
      },
      errorMsg: {
        default: null,
      },
      name: String,
      focus: Function,
      change: Function,
      blur: Function,
      keyup: Function,
      keydown: Function,
    },
    watchL: {
      errorMsg (value) {
        this.errorValue = `*${value.message}`;
      },
    },
    methods: {
      _focus (e) {
        // this.$emit('focus', e);
        this.$emit('focus', true);
        return this.focus ? this.focus(e) : '';
      },
      _blur (e) {
        // this.$emit('blur', e);
        this.$emit('focus', false);
        return this.blur ? this.blur(e) : '';
      },
      _keyup (e) {
        // this.$emit('keyup', e);
        this.$emit('keyup', false);
        return this.keyup ? this.keyup(e) : '';
      },
      _keydown (e) {
        // this.$emit('keydown', e);
        this.$emit('keydown', true);
        return this.keydown ? this.keydown(e) : '';
      },
    },
  };
</script>


<style lang="less" scoped>
  & .input-box {
    display: inline-block;

    & input {
      width: 100%;
      color: #787878;
      font: inherit;
      font-size: 15px;
      vertical-align: middle;
      background-color: transparent;
      border: none;
      box-sizing: border-box;
      outline: none;
    }

    & .errorMsg {
      text-align: left;
      margin-top: 10px;
      font-size: 12px;
      color: #ff3700;
    }


    .input-control {
      background-color: #fff;
      border: 1px solid #b4b4b4;
      height: 38px;
      line-height: 38px;
      padding: 0 10px;
      width: 100%;
      overflow: hidden;
      color: #666;
      font-size: 14px;
      border-radius: 5px;
      box-sizing: border-box;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out 0s;

      &:hover {
        border-color: #c6c6c6;
      }

      //输入错误
      &.error {
        /*border-color: #f00;*/
        /*color: #f00;*/
      }

      //获取焦点
      &:focus,
      &.focus {
        border-color: #ff8847;
        color: #333;
        /*box-shadow: 2px 2px 5px #ebeaea;*/
      }

      //禁止输入类
      &.disabled {
        background-color: #ddd;
        cursor: not-allowed;
        border-color: #ccc;
      }

      &.placeholder {
        color: #999;
      }
    }

    div.input-control {
      line-height: 38px;
    }
  }
</style>


