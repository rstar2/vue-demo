<template>
  <div>
    Logged in as {{user.displayName}}
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  props: ["user"],
  methods: {
    logout() {
      firebase.auth().signOut();
    },
  }
};
</script>
