<template>
  <div id="app">
    <h1>Hello {{ username }}!</h1>
    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/user">Go to User</router-link>
      <router-link to="/bar">Go to Bar</router-link>
      <router-link to="/nested">Go to Nested</router-link>
      <router-link to="/named">Go to Named</router-link>
    </p>

    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  // By injecting the router, we get access to it as this.$router
  // as well as the current route as this.$route inside of any component:
  computed: {
    username () {
      // We will see what `params` is shortly
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
};
</script>
