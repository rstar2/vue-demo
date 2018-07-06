<template>
  <div id="app">
    <h1>{{ answer }}</h1>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    // local component's data/state
    return {
      answer: 0
    };
  },
  mounted() {
    const api = "https://yesno.wtf/api";

    // Usage:
    // all are the same instances in fact (Vue.axios === this.axios === this.$http)
    // 1. globally
    Vue.axios
      .get(api)
      .then(response => response.data)
      .then(data => {
        this.answer = `One ${data.answer}`;
      });

    // 2. from single file component
    setTimeout(() => {
      this.axios.get(api)
        .then(response => response.data)
        .then(data => {
          this.answer = `Two ${data.answer}`;
        });
    }, 2000);

    setTimeout(() => {
      this.$http.get(api)
        .then(({ data }) => {
          this.answer = `Three ${data.answer}`;
        });
    }, 5000);
  }
};
</script>
