<template>
  <div id="app">
    <SignaturePad @onBegin="onBegin" @onEnd="onEnd($event)"></SignaturePad>
  </div>
</template>

<script>
import SignaturePad from "./components/SignaturePad.vue";

export default {
  data() {
    return {
    };
  },
  components: {
    SignaturePad
  },
  methods: {
    onBegin(event) {
      console.log('onBegin');
      console.dir(event);
    },
    onEnd(event) {
      console.log('onEnd');
      console.dir( event);
    }

  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

</style>
