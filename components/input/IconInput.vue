<template>
  <div :class="['icon-input', {'focus': isFocus}, {'error': isInputed && !isFocus && isError}]">
    <span :class="icon">
      <img v-if="iconUrl !== ''" :src="iconUrl"/>
    </span>
    <nuts-input
      :type="type"
      :placeholder="placeholder"
      :value="inputValue"
      v-model="inputValue"
      @focus="onFocus"
      @change="updateValue($event)"
    ></nuts-input>
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
  },
  data () {
    return {
      inputValue: this.value,
      isFocus: false,
      isInputed: false,
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
  },
  methods: {
    updateValue (event) {
      console.error('触发底层');

      const value = event.target.value;
      if (value.trim() === this.value) return;
      this.$emit('input', value);
    },
    onFocus (isFocus) {
      console.error(isFocus);

      this.isFocus = isFocus;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon-input {
  position: relative;
  margin: 0 auto;
  padding: 9px;
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  box-sizing: border-box;
  color: #c6c6c6;
  font-size: 20px;
  display: flex;
  & .icon {
    padding: 2px;
    width: 15px;
    height: 20px;
    font-size: 16px;
    color: #c6c6c6;
  }
  & input {
    flex: 1;
    width: 100%;
    height: 20px;
    margin-left: 10px;
    font-size: 14px;
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
</style>
