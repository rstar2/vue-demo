<template>
  <div>
    <RecycleScroller class="scroller" :items="list" :item-size="32">
      <template #before>Hey! I'm a message displayed before the items!</template>

      <template v-slot="{ item }">
        <div class="user">{{ item.name }}</div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    // TODO: polulate it
    this.list = [];
  }
};
</script>

<style scoped>
.scroller {
  height: 100%;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>

