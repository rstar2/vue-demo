<template>
  <div id="app">
    <SignaturePad ref="signaturePad" @onBegin="onBegin" @onEnd="onEnd($event)"></SignaturePad>
    <div>
      <button @click="clear">Clear</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import SignaturePad from "./components/SignaturePad.vue";

export default {
  data() {
    return {};
  },
  components: {
    SignaturePad
  },
  methods: {
    onBegin(event) {
      console.log("onBegin");
      console.dir(event);
    },
    onEnd(event) {
      console.log("onEnd");
      console.dir(event);
    },
    clear() {
      this.$refs.signaturePad.clear();
    },
    save() {
      console.log("IsEmpty - ", this.$refs.signaturePad.isEmpty());
      const url = this.$refs.signaturePad.toDataURL();
      console.log("Data", url);
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
