// See https://akryum.github.io/v-tooltip/#/

<template>
  <div>
    <button v-tooltip="{content: msg, placement: 'bottom'}">
      Tooltip
    </button>

    <button v-tooltip.top-center="'Not reactive'">Hover me</button>

    <v-popover :auto-hide="false" :placement="'left'">
      <button>Click me</button>

      <template slot="popover">
        <input class="tooltip-content" v-model="msg" placeholder="Tooltip content" />
        <p>
          {{ msg }}
        </p>

        <div>
          <a v-close-popover class="btn btn-close">Close</a>
        </div>
      </template>
    </v-popover>
  </div>
</template>

<script>
import Vue from 'vue';
import VTooltip from 'v-tooltip';

Vue.use(VTooltip, {
  disposeTimeout: 5000,
});

VTooltip.options.defaultDelay = {
  show: 300,
  hide: 0,
};


export default {
  data() {
    return {
      msg: 'Yeee - reactive'
    };

  }
}
</script>

<style lang="less">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }

  &.popover {
    @color: #25c582;

    .popover-inner {
      background: @color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(0,0,0, .1);
    }

    .popover-arrow {
      border-color: @color;
    }

    .btn-close {
      background: red;
    }
  }
}
</style>


