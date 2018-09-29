<template>
  <input class="component-input"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @change="updateValue($event)"
    @focus="onFocus($event)"
    @blur="onBlur($event)"
  />
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateValue (event) {
      console.error('触发底层');

      const value = event.target.value;
      if (value.trim() === this.value) return;
      this.$emit('input', value);
    },
    onFocus (event) {
      this.$emit('focus', true);
    },
    onBlur (event) {
      this.$emit('focus', false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.component-input {
  color: #c5c5c5;
  font: inherit;
  font-size: 15px;
  vertical-align: middle;
  background-color: rgba(0,0,0,0);
  border: none;
  box-sizing: border-box;
  outline: none;
}

.component-input::placeholder {
  color: #969696;
}
</style>
