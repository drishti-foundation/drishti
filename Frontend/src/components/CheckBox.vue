<!-- eslint-disable max-len -->
<template>
  <button
    v-if="locked"
    aria-disabled
    :disabled="true"
    class="gbtn flex disabled"
    :title="`${name} is only available for account holders.`"
  >
    <span class="flex">
      <svg class="svg" viewBox="0 0 172 172">
        <g
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
        >
          <path d="M0,172v-172h172v172z" fill="none"></path>
          <g fill="#cccccc">
            <path
              d="M86,0c-21.99099,0 -39.69231,17.70132 -39.69231,39.69231v26.46154c-14.54868,0 -26.46154,11.91286 -26.46154,26.46154v52.92308c0,14.54868 11.91286,26.46154 26.46154,26.46154h79.38462c14.54868,0 26.46154,-11.91286 26.46154,-26.46154v-52.92308c0,-14.54868 -11.91286,-26.46154 -26.46154,-26.46154v-26.46154c0,-21.99099 -17.70132,-39.69231 -39.69231,-39.69231zM86,13.23077c15.06551,0 26.46154,11.39603 26.46154,26.46154v26.46154h-52.92308v-26.46154c0,-15.06551 11.39603,-26.46154 26.46154,-26.46154zM86,99.23077c7.28726,0 13.23077,5.94351 13.23077,13.23077c0,4.6256 -2.63581,9.17368 -6.61538,11.16346v15.29808c0,3.97957 -2.63581,6.61538 -6.61538,6.61538c-3.97956,0 -6.61538,-2.63581 -6.61538,-6.61538v-15.29808c-3.97956,-1.98978 -6.61538,-6.53786 -6.61538,-11.16346c0,-7.28726 5.94351,-13.23077 13.23077,-13.23077z"
            ></path>
          </g>
        </g>
      </svg>
      {{ name }}
    </span>
    <p class="subtext">available for account holders</p>
  </button>
  <button
    v-else
    role="checkbox"
    class="gbtn flex"
    @click="$emit('click', $event)"
    auto-focus
    :aria-checked="checked"
  >
    <svg class="svg" viewBox="0 0 110 110">
      <rect class="box" x="5" y="5" width="100" height="100" transform="rotate(90 55 55)" />
      <path :class="checked ? 'check' : 'unchecked'" d="M90,20 L45.7,75.1 L20.2,55.4" />
    </svg>
    {{ name }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

interface CProps {
  name: string;
  checked: boolean;
  locked: boolean;
}

export default Vue.extend<{}, {}, {}, CProps>({
  name: 'check-box',
  props: {
    name: String,
    checked: Boolean,
    locked: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.svg {
  display: inline-block;
  height: 1.5rem;
  margin-right: 0.5rem;

  .unchecked {
    stroke: white;
    fill: none;
    stroke-width: 20;
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: uncheck 0.75s linear forwards;
  }

  .check {
    stroke: white;
    fill: none;
    stroke-width: 20;
    stroke-dasharray: 200;
    stroke-dashoffset: 0;
    animation: check 0.75s linear forwards;
  }

  .box {
    stroke: $background;
    stroke-width: 7;
    fill: none;
  }
}

.flex {
  @include flex-box;
}

.disabled {
  flex-direction: column;
}

.subtext {
  margin-top: 0.5ch;
  font-size: 0.7rem;
}

@keyframes check {
  0% {
    stroke-dashoffset: -200;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes uncheck {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 200;
  }
}
</style>
