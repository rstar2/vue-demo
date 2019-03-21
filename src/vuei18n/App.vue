<template>
  <v-app>
    <v-container fluid >
      <v-layout align-center row wrap>
        <v-flex xs12>
            <v-select :items="locales" v-model="locale"></v-select>
        </v-flex>
        <v-flex xs12 sm3>
          <h1>{{ $t("dialog.title") }}</h1>
        </v-flex>
        <v-flex xs12 sm3>
          <h3>1 - {{ $t("dialog.body", {msg: 'hello'}) }}</h3>
        </v-flex>
        <v-flex xs12 sm3>
          <h3>2 - {{ $t("dialog.bodyList", ['hello']) }}</h3>
        </v-flex>
        <v-flex xs12 sm3>
          <h3> {{ text }}</h3>
        </v-flex>
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
