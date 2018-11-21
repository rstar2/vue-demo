<template>
    <D3Map :center="[-7.584838, 33.561041]"></D3Map>
</template>

<script>
import D3Map from "./components/D3Map";

export default {
  components: {
    D3Map
  }
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
