<template>
  <div>
    <image-lazy v-for="(_, index) in images" :key="index" :index="index" />
  </div>
</template>

<script>
const images = Array(11);
const sourcesWidths = [200, 400, 800];

// let Wbpack import all assets so that they appear in the build folder
images.forEach((_, index) => {
    const i = index + 1;
    require(`./assets/image${i}.jpg`);
    ['tiny', ...sourcesWidths].map(suffix => require(`./assets/resized/image${i}_${suffix}.jpg`));
});

const imageComponent = {
  template:
    `<div>
      <ImageLazy
        :src="src"
        :placeholder="placeholder"
        :sources="sources"/>
      <hr style="margin:250px 0"/>
    </div>`,
  props: {
    index: {type: Number, required: true}
  },
  computed: {
    src() {
      return this.getImageSrc();
    },
    placeholder() {
      return this.getImageSrc(true);
    },
    sources() {
      const sources = sourcesWidths.map(width => {
        return {src: this.getImageSrc(width), minWidth: width};
      });

      // after some min width use the real-defualt image
      sources.push({src: this.src, minWidth: 1000})

      return sources;
    }
  },
  methods: {
    /**
     * @param {Boolean|Number} [option] if true - this is for placehoder,
     *                                  if number - this is width param
     */
    getImageSrc(option) {
      let prefix = '';
      let suffix = '';
      if (option) {
        // all assets/images are served from the 'assets' folder - on build time in webpack.config.js
        // even though the source resources can be are in the relative assets/resized
        // prefix = 'resized/';
        if (true === option) {
          suffix = '_tiny';
        } else {
          suffix = `_${option}`;
        }

      }
      return `./assets/${prefix}image${this.index+1}${suffix}.jpg`;
    },
  }

}

export default {
  components: {'image-lazy' : imageComponent},
  beforeCreate() {
    this.images = images;
  }
}
</script>

<style>
body {
  background-color: #56585a;
  text-align: center;
}
</style>

