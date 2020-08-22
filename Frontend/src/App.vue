<template>
  <div id="app" class="app">
    <notifications />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  mounted() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);

    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    });

    this.$store.dispatch('login');
  },
});
</script>

<style lang="scss" src="./styles/global.scss"></style>

<style lang="scss" scoped>
@import './styles/vars.scss';

.app {
  @include flex-box(flex-start, center, column);

  width: 100vw;
  min-height: var(--vh);
}
</style>
