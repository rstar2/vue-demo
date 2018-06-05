// https://atomiks.github.io/tippyjs
// https://github.com/kabbouchi/vue-tippy

<template>
  <div>
    <button title="Simple" v-tippy>Fixed tooltip</button>
    <button :title="msg" v-tippy>Reactive tooltip</button>

    <!--  interactive: true - will not close when hover onver the tooltip -->
    <!--  html : '#contentpopup1' - an HTML lement's ID, Could be Vue-Compoenent <vue-asdad id="contentpopup1"/> -->
    <button v-tippy="{
      html : '#contentpopup1',
      interactive: true,
      trigger: 'click',
      animateFill: 'false',
      reactive : true }">HTML interactive - click me!
    </button>
    <div id="contentpopup1">
      <h3>Header</h3>
      <p> {{ msg }} | counter : {{ counter }} </p>
      <button @click="counter++">Increment</button>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import VueTippy from "vue-tippy";

// Vue.use(VueTippy)
Vue.use(VueTippy, {
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }
});

export default {
  data() {
    return {
      counter:0,
      msg: "Yeee"
    };
  },
  created() {
    setTimeout(() => {
      this.msg = "Reactive ahh!";
    }, 2000);
  },
};
</script>
