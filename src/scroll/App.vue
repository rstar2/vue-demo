<template>
  <div id="app">
    <h1 class="centered">Scroll me</h1>
    <div class="box" v-scroll="handleScroll">
      <p>Shown once - Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque amet harum aut ab veritatis earum porro praesentium ut corporis. Quasi provident dolorem officia iure fugiat, eius mollitia sequi quisquam.</p>
    </div>
    <div class="box" v-in-view>
      <p>In view checked - Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque amet harum aut ab veritatis earum porro praesentium ut corporis. Quasi provident dolorem officia iure fugiat, eius mollitia sequi quisquam.</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleScroll: function(evt, el) {
      // when reached certain point - show it and forget about it
      if (window.scrollY > 50) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, 0, 0)'
        );
        return true;
      }
    }
  }
};
</script>

<style>
body {
  font-family: "Abhaya Libre", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000;
  color: #fff;
  overflow-x: hidden;
}

h1,
h2,
h3,
h4 {
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  font-weight: 800;
}

#app {
  height: 2000px;
}

.centered {
  margin: 0 auto;
  display: table;
  font-size: 60px;
  margin-top: 100px;
}

.box {
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 20px;
  line-height: 1.3em;
  opacity: 0;
  color: white;
  width: 200px;
  margin: 0 auto;
  margin-top: 30px;
  transform: translate3d(0, -10px, 0);
  perspective: 1000px;
  backface-visibility: hidden;
  background: rgba(255, 255, 255, 0.1);

  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>
