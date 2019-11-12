<template>
  <div id="app">
    <h1>Random User</h1>
    <div class="person" v-for="(person, index) in persons" :key="index">
      <div class="left">
        <img :src="person.picture.large">
      </div>
      <div class="right">
        <p>{{ person.name.first }} {{ person.name.last }}</p>
        <ul>
          <li>
            <strong>Birthday:</strong> {{ person.dob.date | formatDate }}
          </li>
          <li class="text-capitalize">
            <strong>Location:</strong> {{ person.location.city }},
            {{ person.location.state }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      persons: []
    };
  },
  beforeMount() {
    this.getUsers();
  },
  mounted() {
    // with VueJS the 'this' inside the 'this.onScroll' will be the concrete Vue instance
    // and not the global window instance (or the event source taret) as normally in window.addEventListener()
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    getUsers(count = 5) {
      for (let i = 0; i < count; i++) {
        axios.get(`https://randomuser.me/api/`).then(response => {
          this.persons.push(response.data.results[0]);
        });
      }
    },

    // NOTE: Don;t make it arrow function
    onScroll() {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        this.getUsers(3);
      }
    }
  },
  filters: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  }
};
</script>

<style style lang="less">
.person {
  background: #ccc;
  border-radius: 2px;
  width: 20%;
  margin: 0 auto 15px auto;
  padding: 15px;

  img {
    width: 100%;
    height: auto;
    border-radius: 2px;
  }

  p:first-child {
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 900;
  }

  .text-capitalize {
    text-transform: capitalize;
  }
}
</style>
