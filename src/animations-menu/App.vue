<template>
  <div id="app">
    <header class="header">
      <Hamburger :isOpen="isMenuOpen" />
      <Menu :isOpen="isMenuOpen" :items="menuItems" @menu-item="onMenuItem"/>
    </header>
  </div>
</template>

<script>
import Hamburger from "./components/Hamburger";
import Menu from "./components/Menu";

export default {
  components: {
    Hamburger, Menu
  },
  data() {
    return {
      menuItems: [
        { label: "speaking" },
        { label: "projects" },
        { label: "resume" },
        {
          label: "blog",
          externalUrl: "https://medium.com/@krystalcampioni",
          showExternalIcon: true
        }
      ],
      isMenuOpen: false
    };
  },
  methods: {
    onMenuItem(index) {
      console.log('Clicked', this.menuItems[index]);

    }
  }
};
</script>

<style lang="scss">

*, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.header {
  padding: 10px;
  background-size: 980px;
  width: 100%;
  z-index: 90;
  position: fixed;
}
</style>
