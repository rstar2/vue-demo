<template>
  <div>
    <!-- For components guarded before route navigation
       'loading' state makes sense only when the same compoenent is re-used
       and thus updated - e.g. in beforeRouteUpdate()  -->
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
const fetchData = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ name: `${id} fetched before navigation` }), 2000);
  });
};

export default {
  data() {
    return {
      loading: false,
      error: null,
      data: null
    };
  },

  beforeRouteEnter(to, from, next) {
    // NOTE in 'beforeRouteEnter' we still don't have access to 'this' as the VM instance
    // but in the 'next' callback we have
    fetchData(to.params.id)
      .then(data => {
        next(vm => vm.setData(null, data));
      })
      .catch(error => {
        next(vm => vm.setData(error, null));
      });
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    this.setData(null, null);

    fetchData(to.params.id)
      .then(data => {
        this.setData(null, data);
      })
      .catch(error => {
        this.setData(error, null);
      })
      .then(next);
  },

  methods: {
    setData(error, data) {
      this.error = error;
      this.data = data;
      this.loading = !(error || data);
    }
  }
};
</script>

