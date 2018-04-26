<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ countdown$ }}</h1>
    <button v-stream:click="snooze$"  :disabled="disable$">Snooze</button>
    <button v-stream:click="dismiss$" :disabled="disable$">Dismiss</button>
  </div>
</template>

<script>
import { Observable } from "rxjs";

export default {
  domStreams: ["snooze$", "dismiss$"],
  subscriptions() {
    const countdown$ = Observable.interval(1000)
      .startWith(5)
      .scan(time => time - 1)
      .takeWhile(time => time > 0)
      // when timer is finished conact it  with a new stream  - just the "wake up" text
      .concat(Observable.of("Wake up!!!"))

      // we have to share the initial/first stream before repeating it
      .share()
      // repeat all when Snooze button is pressed
      .repeatWhen(() => this.snooze$.takeUntil(this.dismiss$))

      // emit the last event
      .concat(Observable.of("Have a nice day"))
      .do(value => console.log("From countdown$", value))

      // because of the 'startWith()' the intial value (5) is emitted value is rightaway
      // the tempate subscribes to the 'countdown$' stream, and
      // then when the template subscribes to the 'disable$' stream it again suscribes to 'countdown$'
      .shareReplay();

    const disable$ = countdown$
    .do(value => console.log("From disable$", value))
    .map(value => value !== "Wake up!!!");


    return {
      countdown$,
      disable$
    };
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

a {
  color: #42b983;
}
</style>
