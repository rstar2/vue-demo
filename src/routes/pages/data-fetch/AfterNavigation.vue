<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="data" class="content">
      <h2>{{ data.name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      error: null,
      data: null
    };
  },

  // fetch the data when the view is created and the data is
  // already being observed
  created() {
    this.fetchData();
  },

  watch: {
    // call again the method if the route changes
    // NOTE - watchers/data/computed/methods/hooks CANNOT be arrow functions
    '$route': function () {
      this.loading = true;
      this.error = null;
      this.data = null;
      this.fetchData();
    }
  },

  methods: {
    fetchData() {
      new Promise((resolve, reject) => {
        const id = this.$route.params.id
        setTimeout(() => resolve({ name: `${id} fetched after navigation` }), 2000);
      })
        .then(data => this.data = data)
        .catch(error => (this.error = error))
        .then(() => (this.loading = false));
    }
  }
};
</script>

