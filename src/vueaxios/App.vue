<template>
  <div id="app">
    <h1>{{ count }}</h1>
    <h1>Is even :{{ isEven }}</h1>
    <button @click="add" >Add</button>
    <button @click="remove" >Remove</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    // local component's data/state
    return {
      min: 0,
      max: 10
    };
  },
  computed: {
    // local computed state
    // ...,

    ...mapGetters([
      // Mounts the "count" getter to the scope of your component.
      "count"
    ]),

    // or if we want to change the name how it's used in the internal's scope
    ...mapGetters({
      countNewName: "count"
    }),

    // the same - direct accessing the store's state property through it's getter
    isEven() {
      return this.$store.getters.isEven;
    },

    // invoke the getter function
    isEqual(val) {
      return this.$store.getters.isEqual(val);
    }
  },

  methods: {
    // call actions (which can be synchronous or asynchronous)
    // better is to always use them no matter if they internally just call the mutations
    add() {
      this.$store.dispatch("add")
        .then(result => console.log(result));
    },
    remove() {
      this.$store.dispatch("changeBy", { val: -1 })
        .then(result => console.log(result));
    },

    // Directly call the mutations (which are synchtonous and don't return value -just update the store's state)
    addCommit() {
      this.$store.commit("changeBy", { val: 1 });
    },
    removeCommit() {
      this.$store.commit("changeBy", { val: -1 });
    },

    // could use mapMutations also to directly map mutations' names to methods names'
    // so now there's a 'changeBy(payload)' method that internally will call 'this.$store.commit("changeBy", payload);'
    ...mapMutations(["changeBy"])
  }
};
</script>
