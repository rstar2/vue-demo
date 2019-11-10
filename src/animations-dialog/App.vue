<template>
  <div id="app">
    <button @click="isShown=true">Open Dialog</button>
    <Dialog v-if="isShown" @close="isShown=false" />
  </div>
</template>

<script>
import Dialog from "./components/Dialog";

export default {
  components: {
    Dialog
  },
  data() {
    return {
      isShown : false
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bangers|Sintony");

$primary-font-family: "Bangers", cursive;
$green:                #2cd1af;

body,
button {
  font-family: $primary-font-family;
}
button {
  transition: all 0.2s ease-in-out;
  background: $green;
  color: #011e35;
  box-shadow: 0px 2px 0px 2px
    darken($green, 5%), 0 10px 10px 3px rgba(0, 0, 0, 0.5);
  appearance: none;
  border: 0;
  margin: 10px;
  padding: 10px 15px;
  font-size: 24px;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
}
</style>
