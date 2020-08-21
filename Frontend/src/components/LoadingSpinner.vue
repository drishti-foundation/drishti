<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="loading-spinner">
    <circle cx="50" cy="50" r="45" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'loading-spinner',
});
</script>

<style lang="scss" scoped>
.loading-spinner {
  animation: 2s linear infinite svg-animation;
  max-width: 100px;
  height: 1.2rem;

  circle {
    animation: 1.4s ease-in-out infinite both circle-animation;
    display: block;
    fill: transparent;
    stroke: white;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 280;
    stroke-width: 0.8rem;
    transform-origin: 50% 50%;
  }
}

@keyframes svg-animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes circle-animation {
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}
</style>
