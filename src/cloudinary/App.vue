<template>
  <div id="app">
    <h1 class="centered">Cloudinary image</h1>
    <hr>

    <cld-image :publicId="imageId" :cloudName="cloudName">
        <!-- <cld-transformation effect="cartoonify" />
        <cld-transformation radius="max" />
        <cld-transformation effect="outline:100" color="lightblue" />
        <cld-transformation background="lightblue" />
        <cld-transformation height="300" crop="scale" /> -->
    </cld-image>
  </div>
</template>

<script>

const CLD_CLOUD_NAME = 'magic-media';
const CLD_FOLDER_NAME = 'mladost-shit';

export default {
  created() {
    this.cloudName = CLD_CLOUD_NAME;
  },
  computed: {
    imageId() {
      return `${CLD_FOLDER_NAME}/bike.jpg`;
    },
  }
};
</script>
