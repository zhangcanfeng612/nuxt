<template>
  <div>
    <div :class="['icon-input', {'focus': isFocus}, {'error': isInputed && !isFocus && isError}]">
      <span :class="icon">
        <img v-if="iconUrl !== ''" :src="iconUrl"/>
      </span>

      <nuts-input
        class="base-input"
        :type="type"
        :placeholder="placeholder"
        :value="inputValue"
        v-model="inputValue"
        :isCleanStyle="true"
        @focus="onFocus"
        @change="updateValue($event)"
        :readonly="readonly"
      ></nuts-input>
    </div>
    <div class="errorMsg" v-show="this.errorMsg">{{ errorValue }}</div>
  </div>
</template>

<script>
import Input from './Input.vue';

export default {
  name: 'IconInput',
  components: {
    'nuts-input': Input,
  },
  props: {
    isError: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: 'icon-phone',
    },
    iconUrl: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'normal',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
    value: {
      type: String,
      default: '',
    },
    errorMsg: {
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      inputValue: this.value,
      isFocus: false,
      isInputed: false,
      errorValue: this.errorMsg,
    };
  },
  computed: {
    icon () {
      return `${this.iconClass} icon`;
    },
  },
  watch: {
    inputValue (value) {
      this.isInputed = true;
      this.$emit('input', value);
    },
    errorMsg (value) {
      if (value) {
        this.errorValue = `*${value.message}`;
      }
    },
  },
  methods: {
    updateValue (event) {
      const value = event.target.value;
      if (value.trim() === this.value) return;
      this.$emit('input', value);
    },
    onFocus (isFocus) {
      this.isFocus = isFocus;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

& .icon-input {
  display: flex;
  position: relative;
  margin: 0 auto;
  padding: 9px;
  border: 1px solid #b4b4b4;
  border-radius: 5px;
  box-sizing: border-box;
  color: #b4b4b4;
  font-size: 20px;

  & .icon {
    width: 15px;
    height: 20px;
    font-size: 16px;
    color: #b4b4b4;

    &:before {
      padding-top: 2px;
    }
  }

  & .input-box {
    flex: 1;
    margin-left: 10px;
    font-size: 14px;

    & input {
      /*flex: 1;*/
      width: 100%;
      /*height: 20px;*/
      /*margin-left: 10px;*/
      /*font-size: 14px;*/
    }
  }

  & .errorMsg {
    text-align: left;
    margin-top: 10px;
    font-size: 12px;
    color: #ff3700;
  }
}

.icon-input:hover {
  border-color: #c6c6c6;

  & .icon {
    color: #c6c6c6;
  }
}

.icon-input.focus {
  border-color: #ff8847;

  & .icon {
    color: #ff8847;
  }
}

.icon-input.error {
  border-color:red;

  & .icon {
    color: red;
  }
}

& .base-input {
  flex: 1;
  margin-left: 10px;
  font-size: 14px;

  /deep/ input {
    border-width: 0;
    outline: none;
  }
}
</style>
