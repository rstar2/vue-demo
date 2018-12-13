<template>
  <div id="app">
    <!--
    depending on 'unmask' prop first argument is
    `value` if `unmask=false`,
    `unmaskedValue` if `unmask=true`,
    `typedValue` if `unmask='typed'`
    -->
    <imask-input
      v-model="numberModel"
      :mask="Number"
      radix="."
      :unmask="true"
      @accept="onAccept"
      placeholder="Enter number here"
    />

    <input v-imask="phoneMask" :value="phoneValue"  @accept="onAcceptDir" @complete="onCompleteDir">
  </div>
</template>

<script>
// https://unmanner.github.io/imaskjs/
// https://github.com/uNmAnNeR/imaskjs/tree/master/packages/vue-imask

import { IMaskComponent } from "vue-imask";

import { IMaskDirective } from "vue-imask";

export default {
  components: {
    "imask-input": IMaskComponent
  },
  directives: {
    imask: IMaskDirective
  },
  data() {
    return {
      numberModel: "",

      phoneValue: "9",
      phoneMask: {
        mask: "+{7}(000)000-00-00",
        lazy: false
      }
    };
  },
  methods: {
    onAccept(value) {
      console.log("accept", this.numberModel);
    },

    onAcceptDir(e) {
      const maskRef = e.detail;
      console.log("accept from directive", maskRef.value, this.phoneValue);
    },
    onCompleteDir(e) {
      const maskRef = e.detail;
      console.log(
        "complete from directive",
        maskRef.unmaskedValue,
        this.phoneValue
      );
    }
  },
  beforeCreate() {}
};
</script>
