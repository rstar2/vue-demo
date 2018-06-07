<template>
	<div :style="computedStyle">
    	<canvas ref="canvas" style="width:100%; height:100%"></canvas>
  </div>
</template>

<script>
import SignaturePad from "signature_pad";

const DEFAULT_OPTIONS = {
  minWidth: 0.5,
  maxWidth: 2.5,
  throttle: 16,
  minDistance: 5,
  backgroundColor: "rgba(0,0,0,0)",
  penColor: "black",
  velocityFilterWeight: 0.7
};

function resizeCanvas(signaturePad, canvas) {
  const data = signaturePad.isEmpty() ? null : signaturePad.toData();

  const ratio = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);
  signaturePad.clear(); // otherwise isEmpty() might return incorrect value

  // put back the data
  if (data) {
    signaturePad.fromDataURL(data);
  }
}

export default {
  name: "SignaturePad",
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    },
    customStyle: {
      type: Object
    },
    saveType: {
      type: String,
      default: "image/png"
    },
    options: {
      type: Object,
      default: () => ({})
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    computedStyle() {
      const { width, height, customStyle } = this;
      return { width, height, ...customStyle };
    }
  },

  created() {
    // non-reactive property - once created
    this.signaturePad = null;
  },

  mounted() {
    const { options } = this;
    const canvas = this.$refs.canvas;
    const signaturePad = new SignaturePad(canvas, {
      ...DEFAULT_OPTIONS,
      ...this.options,
      onBegin: (e => {
        this.$emit("onBegin", e);
      }).bind(this),
      onEnd: (e => {
        this.$emit("onEnd", e);
      }).bind(this)
    });
    this.signaturePad = signaturePad;

    const _resizeCanvas = resizeCanvas.bind(null, signaturePad, canvas);
    window.addEventListener("resize", _resizeCanvas);
    _resizeCanvas();
  },
  // Right before the component is destroyed,
  // also destroy the SignaturePad - at least unbind the event listeners.
  beforeDestroy: function() {
    this.signaturePad.off();
  },

  methods: {
    isEmpty() {
      return this.signaturePad.isEmpty();
    },
    clear() {
      this.signaturePad.clear();
    },
    toDataURL(type) {
      return this.signaturePad.toDataURL(type || this.saveType);
    },
    fromDataURL(url) {
      this.signaturePad.fromDataURL(url);
    },
    on() {
      this.signaturePad.on();
    },
    off() {
      this.signaturePad.off();
    },
    undo() {
      const data = this.signaturePad.toData();
      if (data) {
        data.pop();
        this.signaturePad.fromData(data);
      }
    },

    addWaterMark(data = {}) {
      // var vCanvas = document.getElementById(_this.uid);
      // var textData = {
      //   text: data.text || "",
      //   x: data.x || 20,
      //   y: data.y || 20,
      //   sx: data.sx || 40,
      //   sy: data.sy || 40
      // };
      // var ctx = vCanvas.getContext("2d");
      // ctx.font = data.font || "20px sans-serif";
      // ctx.fillStyle = data.fillStyle || "#333";
      // ctx.strokeStyle = data.strokeStyle || "#333";
      // if (data.style == "all") {
      //   ctx.fillText(textData.text, textData.x, textData.y);
      //   ctx.strokeText(textData.text, textData.sx, textData.sx);
      // } else if (data.style == "stroke") {
      //   ctx.strokeText(textData.text, textData.sx, textData.sx);
      // } else {
      //   ctx.fillText(textData.text, textData.x, textData.y);
      // }
      // _this.sig._isEmpty = false;
    }
  }
};
</script>
