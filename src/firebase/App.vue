<template>
  <div id="app">
    <Login v-if="!store.currentUser"></Login>
    <div v-else>
      <Logout :user="store.currentUser"></Logout>
      <BallsList :balls="store.balls"></BallsList>
      <BallNew @add="addBall"></BallNew>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";

import store from "./store";

import Login from "./components/Login";
import Logout from "./components/Logout";
import BallNew from "./components/BallNew";
import BallsList from "./components/BallsList";

export default {
  components: {
    Login,
    Logout,
    BallNew,
    BallsList
  },
  data() {
    return {
      store
    };
  },
  methods: {
    addBall({ message }) {
      store.writeBall(message);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
