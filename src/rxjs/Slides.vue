<template>
  <div id="slides">
    <h2>Slides:</h2>
    <h2>{{ slide }}</h2>
    <button @click="onSlide(-1)">Prev</button>
    <button @click="onSlide(1)">Next</button>
  </div>
</template>

<script>
import * as Rx from "rxjs";

export default {
  data() {
    return {
      slide: "Test"
    };
  },
  methods: {
    onSlide(count) {
      this.slideButtons$.next(count);
    }
  },
  mounted() {
    const slides = ["0", "1", "2", "3", "4"];

    // // 'zip' with 'interval' makes scheduled emitting from a collection
    // let slides$ = Rx.Observable.zip(
    //   Rx.Observable.from(slides),
    //   Rx.Observable.interval(1000).take(slides.length),
    // )
    // .repeat(-1) // 'repeat' indefinately
    // .subscribe(
    //   ([slide]) => {
    //     this.slide = slide;
    //   }
    // );

    // this stream will listen to the buttons controlling the slider
    this.slideButtons$ = new Rx.Subject();

    const keys$ = Rx.Observable.fromEvent(document, "keydown").pluck("key");
    const left$ = keys$.filter(key => key === "ArrowLeft").mapTo(-1);
    const right$ = keys$.filter(key => key === "ArrowRight").mapTo(1);

    // this stream will listen to the keys controlling the slider
    const slideKeys$ = Rx.Observable.merge(left$, right$).throttleTime(250);

    // this is converted stream (from both slider controlling streams) to slide index
    const index$ = Rx.Observable.merge(this.slideButtons$, slideKeys$)
      .startWith(0)
      .scan((index, count) => index + count);

    // extract the real slide from the
    const slides$ = Rx.Observable.of(slides)
      .combineLatest(index$)
      .map(([slides, index]) => [slides, index % slides.length])
      .map(([slides, index]) => [slides, index >= 0 ? index : slides.length + index])
      .map(([slides, index]) => slides[index])
      .subscribe(slide => {
        this.slide = slide;
      });
  }
};
</script>
