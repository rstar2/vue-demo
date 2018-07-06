<template>
  <v-app>
    <v-container grid-list-xl>
      <v-layout align-center>
        <!-- <v-flex xs12 sm6 d-flex> -->
            <v-select xs12 sm6 :items="locales" v-model="locale"></v-select>
        <!-- </v-flex> -->
        <h1 xs12 sm6>{{ $t("dialog.title") }}</h1>
        <h3 xs12 sm6>{{ $t("dialog.body", {msg: 'hello'}) }}</h3>
        <h3 xs12 sm6>{{ $t("dialog.bodyList", ['hello']) }}</h3>

        <h3> {{ text }}</h3>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { locales } from "./messages";

export default {
  // if implemented as local-data
  // data() {
  //   return {
  //     locales,
  //     locale: this.$i18n.locale
  //   };
  // },
  // watch: {
  //   locale(newValue) {
  //     // chnage the locale globally
  //     this.$i18n.locale = newValue;
  //   }
  // },

  // if implemented as computed
  computed: {
    locales() {
      return locales;
    },

    locale: {
      get() {
        return this.$i18n.locale;
      },
      set(newValue) {
        // chnage the locale globally
        this.$i18n.locale = newValue;
      }
    }
  },

  // localize from the Compoenent programatically
  data() {
    return {
      text: '',
    };
  },
  mounted() {
    let count = 0;
    setInterval(() => {
      this.text = this.$t('text', { count: ++count }) ;
    },1000);
  },
};
</script>
