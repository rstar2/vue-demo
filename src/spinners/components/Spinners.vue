<template>
  <div class="samples">
    <ul>
      <li>
        <flower-spinner :animation-duration="2500" :size="70" :color="spinnerColor" />
      </li>
      <li>
        <pixel-spinner :animation-duration="2000" :pixel-size="70" :color="spinnerColor" />
      </li>
      <li>
        <hollow-dots-spinner
          :animation-duration="1000"
          :dot-size="15"
          :dots-num="3"
          :color="spinnerColor"
        />
      </li>
      <li>
        <intersecting-circles-spinner :animation-duration="1200" :size="70" :color="spinnerColor" />
      </li>
      <li>
        <orbit-spinner :animation-duration="1200" :size="55" :color="spinnerColor" />
      </li>
      <li>
        <radar-spinner :animation-duration="2000" :size="60" :color="spinnerColor" />
      </li>
      <li>
        <scaling-squares-spinner :animation-duration="1250" :size="65" :color="spinnerColor" />
      </li>
      <li>
        <half-circle-spinner :animation-duration="1000" :size="60" :color="spinnerColor" />
      </li>
      <li>
        <trinity-rings-spinner :animation-duration="1500" :size="66" :color="spinnerColor" />
      </li>
      <li>
        <fulfilling-square-spinner :animation-duration="4000" :size="50" :color="spinnerColor" />
      </li>
      <li>
        <circles-to-rhombuses-spinner
          :animation-duration="1200"
          :circles-num="3"
          :circle-size="15"
          :color="spinnerColor"
        />
      </li>
      <li>
        <semipolar-spinner :animation-duration="2000" :size="65" :color="spinnerColor" />
      </li>
      <li>
        <self-building-square-spinner :animation-duration="6000" :size="40" :color="spinnerColor" />
      </li>
      <li>
        <swapping-squares-spinner :animation-duration="1000" :size="65" :color="spinnerColor" />
      </li>

      <li>
        <fulfilling-bouncing-circle-spinner
          :animation-duration="4000"
          :size="60"
          :color="spinnerColor"
        />
      </li>
      <li>
        <fingerprint-spinner :animation-duration="1500" :size="64" :color="spinnerColor" />
      </li>
      <li>
        <spring-spinner :animation-duration="3000" :size="60" :color="spinnerColor" />
      </li>
      <li>
        <atom-spinner :animation-duration="1000" :size="60" :color="spinnerColor" />
      </li>
      <li>
        <looping-rhombuses-spinner
          :animation-duration="2500"
          :rhombus-size="15"
          :color="spinnerColor"
        />
      </li>
      <li>
        <breeding-rhombus-spinner :animation-duration="2000" :size="65" :color="spinnerColor" />
      </li>
    </ul>
  </div>
</template>

<script>
import { HollowDotsSpinner } from "epic-spinners";
import { PixelSpinner } from "epic-spinners";
import { FlowerSpinner } from "epic-spinners";
import { IntersectingCirclesSpinner } from "epic-spinners";
import { OrbitSpinner } from "epic-spinners";
import { FingerprintSpinner } from "epic-spinners";
import { TrinityRingsSpinner } from "epic-spinners";
import { FulfillingSquareSpinner } from "epic-spinners";
import { CirclesToRhombusesSpinner } from "epic-spinners";
import { SemipolarSpinner } from "epic-spinners";
import { BreedingRhombusSpinner } from "epic-spinners";
import { SwappingSquaresSpinner } from "epic-spinners";
import { ScalingSquaresSpinner } from "epic-spinners";
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
import { RadarSpinner } from "epic-spinners";
import { SelfBuildingSquareSpinner } from "epic-spinners";
import { SpringSpinner } from "epic-spinners";
import { LoopingRhombusesSpinner } from "epic-spinners";
import { HalfCircleSpinner } from "epic-spinners";
import { AtomSpinner } from "epic-spinners";

export default {
  components: {
    HollowDotsSpinner,
    PixelSpinner,
    FlowerSpinner,
    IntersectingCirclesSpinner,
    OrbitSpinner,
    FingerprintSpinner,
    TrinityRingsSpinner,
    FulfillingSquareSpinner,
    CirclesToRhombusesSpinner,
    SemipolarSpinner,
    BreedingRhombusSpinner,
    SwappingSquaresSpinner,
    ScalingSquaresSpinner,
    FulfillingBouncingCircleSpinner,
    RadarSpinner,
    SelfBuildingSquareSpinner,
    SpringSpinner,
    LoopingRhombusesSpinner,
    HalfCircleSpinner,
    AtomSpinner
  },
  data() {
    return {
      spinnerColor: "#ff1d5e"
    };
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  padding: 50px;
  height: 150px;
  width: 150px;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
