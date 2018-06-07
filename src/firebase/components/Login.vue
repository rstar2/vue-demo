<template>
  <div>
    <button @click="login">Login With Google</button>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
  }
};
</script>
