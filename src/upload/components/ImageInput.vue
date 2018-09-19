<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFileBrowse()">
      <slot name="activator"></slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input type="file"
       ref="file"
       :name="uploadFieldName"
       @change="onFileChange(
          $event.target.name, $event.target.files)"
       style="display:none">

    <!-- error dialog displays any potential error messages -->
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{errorText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorText = null" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // NOTE!!! - Use "value" to enable v-model (together with the 'input' emitted event)
    value: Object
  },

  data: () => ({
    errorText: null,
    uploadFieldName: "file",
    maxSize: 1024
  }),

  computed: {
    errorDialog() {
      return !!this.errorText;
    }
  },

  methods: {
    launchFileBrowse() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      const { maxSize } = this;
      let imageFile = file[0];
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match("image.*")) {
          // check whether the upload is an image
          this.errorText = "Please choose an image file";
        } else if (size > 1) {
          // check whether the size is greater than the size limit
          this.errorText =
            "Your file is too big! Please select an image under 1MB";
        } else {
          // Append file into FormData and turn file into image URL
          let formData = new FormData();
          let imageURL = URL.createObjectURL(imageFile);
          formData.append(fieldName, imageFile);

          // Emit the FormData and image URL to the parent component
          // NOTE!!! Use event name "input" to enable the v-model (together with the 'value' property)
          this.$emit("input", { formData, imageURL });
        }
      }
    }
  }
};
</script>
