<template>
  <div id="app">
    <div>{{typing}}</div>

    <input v-model="numberModel" @keyup="onTyping"/>
    <!-- this is of course also working -->
    <input v-model="numberModel" @keyup="debouncedTypingChange"/>
  </div>
</template>

<script>

// import just the debounce function - so
import _debounce from 'lodash/debounce';

export default {
  data() {
    return {
      typing: false,
      numberModel: "",
    };
  },
  created() {
    // with leading: true and trailing: true
    // this function this.debouncedTypingChange will called once at start and once at end
    this.debouncedTypingChange = _debounce(this.typingChange, 1000, {leading:true, trailing:true});
  },

  methods: {
    typingChange() {
      this.typing = !this.typing;
    },

    onTyping() {
      this.debouncedTypingChange();
    }
  }
};
</script>
