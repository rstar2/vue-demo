<template>
  <div id="app">
    <simple-upload></simple-upload>

    <hr>

    <avatar-upload></avatar-upload>
  </div>
</template>

<script>
import SimpleUpload from "./components/SimpleUpload";
import AvatarUpload from "./components/AvatarUpload";

export default {
  components: {
    SimpleUpload,
    AvatarUpload
  }
};
</script>
