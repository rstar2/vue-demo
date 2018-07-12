<template>
  <div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item">
      <form novalidate @submit.stop.prevent="showSnackbar = true">
        <div>
          <div for="snackbar-center" class="md-body-2">Position</div>
          <md-radio v-model="position" id="snackbar-center" name="snackbar-horizontal" value="center">Centered</md-radio>
          <md-radio v-model="position" id="snackbar-left" name="snackbar-horizontal" value="left">Left</md-radio>
        </div>

        <div>
          <div class="md-body-2">Duration</div>

          <md-switch v-model="isInfinity">Infinite</md-switch>

          <md-field>
            <label for="snackbar-duration">Miliseconds</label>
            <md-input type="number" id="snackbar-duration" v-model.number="duration" :disabled="isInfinity"></md-input>
          </md-field>
        </div>

        <md-button type="submit" class="md-primary md-raised">Open Snackbar</md-button>

        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
          <span>Connection timeout. Showing limited messages!</span>
          <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
        </md-snackbar>
      </form>
      </div>
      <div class="md-layout-item">
        Second column
      </div>
    </div>

    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-25">
        <md-field>
          <label for="vertical">Vertical</label>
          <md-select id="vertical" v-model="vertical">
            <md-option value="top">Top</md-option>
            <md-option value="center">Center</md-option>
            <md-option value="bottom">Bottom</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item md-size-25">
        <md-field>
          <label for="horizontal">Horizontal</label>
          <md-select id="horizontal" v-model="horizontal">
            <md-option value="left">Left</md-option>
            <md-option value="center">Center</md-option>
            <md-option value="right">Right</md-option>
            <md-option value="space-around">Space Around</md-option>
            <md-option value="space-between">Space Between</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <div class="example">
      <div class="md-layout md-gutter" :class="`md-alignment-${vertical}-${horizontal}`">
        <div class="md-layout-item md-size-25">
          <span>Lorem ipsum dolor sit amet.</span>
        </div>

        <div class="md-layout-item md-size-25">
          <span>Repellat praesentium quasi ipsa totam, delectus aperiam deleniti, voluptates inventore.</span>
        </div>

        <div class="md-layout-item md-size-25">
          <span>Excepturi natus dolorem maxime.</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    showSnackbar: false,
    position: "center",
    duration: 4000,
    isInfinity: false,

    horizontal: null,
    vertical: null
  })
};
</script>

<style lang="scss" scoped>
  @import "~vue-material/src/components/MdAnimation/variables";
  @import "~vue-material/src/theme/engine";

  .md-layout {
    transition: .3s $md-transition-stand-timing;
  }

  .example .md-layout-item {
    min-height: 40px;
    transition: .3s $md-transition-stand-timing;

    span {
      width: 100%;
      height: 100%;
      padding: 8px;
      display: block;
      background: md-get-palette-color(blue, 200);
    }
  }
</style>
