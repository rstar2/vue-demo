<template>
  <div id="card">
    <div id="title" ref="title"></div>
  </div>
</template>

<script>
import * as Rx from "rxjs";

// Linear Interpolation
function lerp(start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  return {
    x: start.x + dx * 0.1,
    y: start.y + dy * 0.1,
  };
}

export default {
  mounted() {
    const docEl = document.documentElement;
    const cardEl = this.$el;
    const titleEl = this.$refs["title"];

    // Stream of all mousemove events
    const { clientWidth, clientHeight } = docEl;

    const mouseMove$ = Rx.Observable.fromEvent(docEl, "mousemove")
      .map(event => ({ x: event.clientX, y: event.clientY }));

    const touchMove$ = Rx.Observable.fromEvent(docEl, 'touchmove')
      .map(event => ({x: event.touches[0].clientX, y: event.touches[0].clientY}));

    const move$ = Rx.Observable.merge(mouseMove$, touchMove$);

    // To create a smooth linear interpolation,
    // you just need to care about the latest mouse/touch position on every animation tick
    // schedule it to emit values only on every animation frame (normally about every 16 to 17ms)
    const animationFrame$ = Rx.Observable.interval(0, Rx.Scheduler.animationFrame);

    // smooth move - that emits the latest values from move$
    // only whenever animationFrame$ emits a value
    const smoothMove$ = animationFrame$
      .withLatestFrom(move$, (frame, move) => move);

    const smoothMoveLerp$ = smoothMove$
      .scan((current, next) => lerp(current, next));
      // or simplified: .scan(lerp)

    // Apply values to elements
    // move$
    // smoothMove$
    smoothMoveLerp$
      .subscribe(pos => {
      // titleEl.innerHTML = `${pos.x}, ${pos.y}`;

      const rotX = pos.y / clientHeight * -50 - 25;
      const rotY = pos.x / clientWidth * 50 - 25;

      cardEl.style = `transform: rotateX(${rotX}deg) rotateY(${rotY}deg);`;
    });
  }
};
</script>

<style lang="less">
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

#card {
  height: 50vmin;
  width: 90vmin;
  background-color: white;
  // background-image: linear-gradient(
  //     to bottom,
  //     rgba(black, 0.3),
  //     rgba(black, 0.3)
  //   ),
  //   url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/8442566463_5e3e1714cf_z.jpg);
  background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/181794/8442566463_5e3e1714cf_z.jpg);
  background-size: cover;
  // box-shadow: 0 1rem 3rem rgba(black, 0.2);
  transform-style: preserve-3d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 10vmin;
  color: white;

  &:before {
    content: "Hover to see the effect.";
    display: block;
    position: absolute;
    font-size: 1rem;
    bottom: 100%;
    margin-bottom: 1rem;
    color: #555;
    font-weight: bold;
  }
}

body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 1000px;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

// html {
//   background: linear-gradient(to bottom, #dbe6ed, #cfdde5);
// }

*,
*:before,
*:after {
  box-sizing: border-box;
  position: relative;
}
</style>
