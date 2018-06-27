<template>
  <div id="app">
    <h1>App</h1>
    <p>
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/simple">Go to Simple</router-link>
      <router-link to="/simple-other">Go to SimpleOther</router-link>

      <router-link to="/user">Go to User (guest)</router-link>
      <router-link to="/user/Rumen">Go to User (Rumen)</router-link>
      <router-link :to="{ name: 'user', params: { id: 'Rumen' }}">Again Go to User (Rumen)</router-link>
      <!-- This is not working - 'params' are ignored if 'path'is provided -->
      <!-- <router-link :to="{ path: '/user', params: { id: 'Rumen' }}">Again Go to User (Rumen)</router-link> -->

      <router-link to="/profile/Neshev">Go to Profile (Neshev)</router-link>
      <router-link to="/admin">Go to Admin</router-link>


      <router-link to="/nested">Go to Nested</router-link>

      <router-link to="/named">Go to Named</router-link>

      <router-link to="/lazy">Go to Lazy</router-link>

      <router-link to="/data-fetch/after/Rumen">Go to Data-Fetch-After 1</router-link>
      <router-link to="/data-fetch/after/Neshev">Go to Data-Fetch-After 2</router-link>
      <router-link to="/data-fetch/before/Rumen">Go to Data-Fetch-Before 1</router-link>
      <router-link to="/data-fetch/before/Neshev">Go to Data-Fetch-Before 2</router-link>

      <button @click="programatic">Programatic Go to User (Rumen)</button>
      <button @click="goBack">Go Back</button>
    </p>

    <hr>

    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // By injecting the router, we get access to it as this.$router
  // as well as the current route as this.$route inside of any component:
  methods: {
    programatic() {
        this.$router.push({ name: 'user', params: { id: 'Rumen' }});
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>
