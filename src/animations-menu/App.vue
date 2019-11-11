<template>
  <div id="app">
    <header class="header">
      <Hamburger :isOpen="isMenuOpen" @click.native="isMenuOpen = !isMenuOpen"/>
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

html {
  height: 100%;
}

*, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

$activeLink: #E6FF65;
$paleLink: #c4ffc0;
$linkUnderline: #3b8272;

button {
  transition: all 0.2s ease;
  border: 2px dashed transparent;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: none;
    border: 2px dashed $activeLink;
  }
}

a {
  color: $paleLink;
  transition: all 0.3s ease;
  text-decoration-color: $linkUnderline;
  outline: 2px dashed transparent;

  &:hover,
  &:focus {
    color: $activeLink;
    outline-offset: 5px;
    outline: 2px dashed $activeLink;
    text-decoration-color: $activeLink;
  }
}

.header {
  padding: 10px;
  background-size: 980px;
  width: 100%;
  z-index: 90;
  position: fixed;
}
</style>
