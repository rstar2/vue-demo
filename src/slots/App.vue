<template>
  <BaseLayout>
    <!-- If used <template> then the corresponding slot in the patent is replaced with the contents-->
    <template slot="header">
      <h1>Here might be a page title</h1>
    </template>

    <!-- This is the dafault slot,
      e.g. same as <template slot="default"></template>
      or just <template slot></template> -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <!-- Could be used any HDML tag, not just <template> -->
    <!-- In this case the corresponding slot in the parent is replaced with the whole tag (DIV in this case) -->
    <div slot="footer">
      <p>Here's some contact info</p>
    </div>

    <!-- Extract the passed prom the parent BaseLayout component scope properties. Here we use ES6 destructuring  -->
    <!-- If used 'template'  tag then "slot-scope" is the same as "scope"  -->
    <template slot="footer-ex" slot-scope="{result, choices}">
      <p v-if="!result.isFinished">Result: {{result.value}}</p>
      <p v-for="(choice, index) in choices" :key="index">{{choice}}</p>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from './BaseLayout.vue';

export default {
  components: {
    BaseLayout
  }
};
</script>
