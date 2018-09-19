<template>
  <v-app id="avatar-upload">
    <v-container grid-list-xl>
      <image-input v-model="avatar">
        <div slot="activator">
          <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
            <span>Click to add avatar</span>
          </v-avatar>
          <v-avatar size="150px" v-ripple v-else class="mb-3">
            <img :src="avatar.imageURL" alt="avatar">
          </v-avatar>
        </div>
      </image-input>

      <v-slide-x-transition>
        <div v-if="avatar && !uploaded">
          <v-btn class="primary" @click="uploadImage" :loading="uploading">Upload Avatar</v-btn>
        </div>
      </v-slide-x-transition>
    </v-container>
  </v-app>
</template>

<script>
import Vue from "vue";

// $ npm install vuetify
import Vuetify from "vuetify";
Vue.use(Vuetify);
import "vuetify/dist/vuetify.css";

import ImageInput from "./ImageInput";

export default {
  components: {
    ImageInput
  },

  data() {
    return {
      avatar: null,
      uploading: false,
      uploaded: false
    };
  },

  watch:{
    // watch the model's changes
    avatar: {
      handler: function() {
        this.uploaded = false
      },
      deep: true
    }
  },

  methods: {
    uploadImage() {
      this.uploading = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.uploading = false;
      this.uploaded = true;
    }
  }
};
</script>

<style scoped>
#avatar-upload {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>



