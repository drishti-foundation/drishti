<template>
  <component :is="type" ref="wrapper" :class="wrapperClass">
    <slot />
  </component>
</template>

<script lang='ts'>
import Vue from 'vue';

interface CData {
  show: boolean;
  observer: IntersectionObserver | null;
}

interface CComputed {
  wrapperClass: string;
}

interface CProps {
  type: string;
  threshold: number;
}

export default Vue.extend<CData, {}, CComputed, CProps>({
  name: 'animate-into-view',
  data: () => ({
    show: false,
    observer: null,
  }),
  computed: {
    wrapperClass() {
      return this.show ? '-show' : '-hide';
    },
  },
  props: {
    type: String,
    threshold: {
      type: Number,
      default: 0.15,
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.show = entry.isIntersecting || this.show;
      },
      { threshold: this.threshold }
    );

    if (this.$refs.wrapper) {
      this.observer.observe(this.$refs.wrapper as Element);
    }
  },
  beforeDestroy() {
    // eslint-disable-next-line no-unused-expressions
    this.observer?.disconnect();
  },
});
</script>
