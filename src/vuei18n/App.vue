<template>
  <v-app>
    <v-container grid-list-xl>
      <v-layout wrap align-top>
        <v-flex xs12 sm6>
            <v-select :items="locales" v-model="locale"></v-select>
        </v-flex>
        <h1>{{ $t("dialog.title") }}</h1>
        <h3>{{ $t("dialog.body", {msg: 'hello'}) }}</h3>
        <h3>{{ $t("dialog.bodyList", ['hello']) }}</h3>
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


    // TODO: localize from the Compoenent programatically
  },


};
</script>
