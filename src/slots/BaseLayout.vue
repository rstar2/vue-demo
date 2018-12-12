a<template>
  <div class="container">
    <header>
      <div>Header</div>
      <slot name="header">Default Header content - if 'header' slot is not provided</slot>
      <hr>
    </header>

    <main>
      <div>Main</div>
      <slot>Default Main content - if 'default' slot is not provided</slot>
      <hr>
    </main>

    <footer>
      <div>Footer</div>
      <slot name="footer">Default Footer content - if 'footer' slot is not provided</slot>
    </footer>

    <!-- Pass scoped props to the scoped child template -->
    <slot name="footer-ex" :result="result" :choices="data" >Ups</slot>
  </div>
</template>

<script>

export default {
  data() {
    return {
      result: {value: 1, finished: false},
      data: ["One", "Two", "Three"]
    }
  }
};
</script>
