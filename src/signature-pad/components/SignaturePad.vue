<template>
	<div>
    	Test
  </div>
</template>

<script>
import "signature_pad";

export default {
  data() {
    return {
      signature: null
    };
  },

  // change the show animation
  created() {
    // non-reactive property - once created
    this.modalDialogEl = null;
  },

  mounted() {
    // const modalEl = this.$refs.myModalRef.$el;
  },

  methods: {
    setState() {
    }
  }
};
</script>
