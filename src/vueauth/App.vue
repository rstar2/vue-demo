<template>
  <div id="app">
    <h1>{{ count }}</h1>
    <h1>Is even :{{ isEven }}</h1>
    <button @click="add" >Add</button>
    <button @click="remove" >Remove</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      min: 0,
      max: 10
    };
  }
};
</script>
