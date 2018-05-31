<template>
  <div id="app">
    <h1 class="centered">Drag And Drop exampes</h1>
    <hr>
    <dnd></dnd>
    <hr>
    <vuedragable></vuedragable>
    <hr>
  </div>
</template>

<script>
import DnD from "./components/DnD";
import VueDragable from "./components/VueDragable";

export default {
  components: {
    dnd: DnD,
    vuedragable: VueDragable
  }
};
</script>
