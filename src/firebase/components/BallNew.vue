<template>
  <form @submit.prevent="create">
    <input type="text" autofocus v-model="message" />
    <input type="submit" value="Add ball" :disabled="!message"/>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: null
    };
  },
  methods: {
    create() {
      this.$emit("add", { message: this.message });
      this.message = null;
    }
  }
};
</script>
