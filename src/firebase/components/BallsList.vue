<template>
  <div>
    <div v-for="ball in balls" :key="ball.id">
      {{ ball.author_name }} bucked {{ ball.message }} at {{ ball.createdOn }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["balls"],
};
</script>
