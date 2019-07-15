<template>
  <div>
    <ImageLazy src="./assets/image1.png" :sources="[{src: './assets/image1.png', minWidth: 300}]"/>
    <hr style="margin:250px 0" />
    <ImageLazy src="./assets/image2.png" />
    <hr style="margin:250px 0" />
    <ImageLazy src="./assets/image3.png" />
    <hr style="margin:250px 0" />
    <ImageLazy src="./assets/image4.png" />
  </div>
</template>

<script>
</script>

<style>
body {
  background-color: #56585a;
  text-align: center;
}
</style>

