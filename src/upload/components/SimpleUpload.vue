<template>
  <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isUploading">
        <h1>Upload files</h1>
        <div class="dropbox">
          <input type="file" multiple accept="image/*" class="input-file"
                :name="fileFieldName" :disabled="isUploading"
                @change="filesChange($event.target.name, $event.target.files);
                fileCount = $event.target.files.length">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isUploading">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      <div v-else>
        <h2 v-if="isFailed">Uploaded failed.</h2>
        <h2 v-if="isSuccess">Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>

        <button @click="reset()">Upload again</button>

        <ul class="list-unstyled" v-if="uploadedFiles">
          <li v-for="(item, index) in uploadedFiles" :key="index">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
        <pre v-if="uploadError">{{ uploadError }}</pre>

      </div>
  </div>
</template>

<script>
// import { upload } from '../services/upload.service';
import { upload } from "../services/upload.service.mock";

const STATUS_INITIAL = 0,
  STATUS_UPLOADING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  props: {
    fileFieldName: {
      type: String,
      default: "files"
    }
  },
  data() {
    return {
      currentStatus: STATUS_INITIAL,
      uploadError: null,
      uploadedFiles: []
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isUploading() {
      return this.currentStatus === STATUS_UPLOADING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    mounted() {
      this.reset();
    },

    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },

    /**
     * @param {FormData} formData
     * @param {String} inputName
     */
    save(formData, inputName) {
      this.currentStatus = STATUS_UPLOADING;

      upload(formData, inputName)
        .then(data => {
          this.currentStatus = STATUS_SUCCESS;

          // new array, so the 'data' is preserved - not referenced from here and possible from other place
          this.uploadedFiles = [].concat(data);
        })
        .catch(err => {
          this.currentStatus = STATUS_FAILED;
          this.uploadError = err.response;
        });
    },

    /**
     * @param {String} inputName
     * @param {FileList} fileList (array like)
     */
    filesChange(inputName, fileList) {
      if (!fileList.length) return;

      // create a FormData object and put the files in it
      const formData = new FormData();

      // append the files to FormData
      // unfortunately FileList is NOT enumerable and for...of is not working
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        formData.append(inputName, file, file.name);
      }

      // save it
      this.save(formData, inputName);
    }
  }
};
</script>

<style lang="less">
// hide the default input tag
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

// add custom dropzone/clickzone
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;

  &:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
}
</style>
