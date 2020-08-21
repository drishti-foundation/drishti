<template>
  <div class="admin">
    <nav class="nav-bar">
      <router-link class="logo" to="/">
        <svg viewBox="0 0 50 100" class="back">
          <path d="M50 0 L0 50 L50 100" fill="transparent" stroke="white" stroke-width="10" />
        </svg>
        <img src="@/assets/drishti.png" alt="drishti logo" />
      </router-link>
    </nav>
    <main>
      <h1>Admin Console</h1>
      <button class="btn" @click="generateOTP()">
        <loading-spinner v-if="isLoading" />
        <template v-else>
          Generate OTP
        </template>
      </button>
      <p v-if="otp" class="otp">{{ otp }}</p>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import LoadingSpinner from '@/components/LoadingSpinner.vue';

interface CData {
  otp: string | null;
  isLoading: boolean;
}

interface CMethods {
  generateOTP: () => void;
}

export default Vue.extend<CData, CMethods, {}>({
  name: 'admin',
  data: () => ({
    otp: null,
    isLoading: false,
  }),
  methods: {
    async generateOTP() {
      this.isLoading = true;
      this.otp = (await this.$store.state.client.service('admin-func').get('otp')).otp;
      this.isLoading = false;
    },
  },
  components: {
    LoadingSpinner,
  },
});
</script>

<style lang="scss" scoped>
$max-width: 70vw;

.admin {
  width: $max-width;
  height: var(--vh);
  margin: 0 auto;

  main {
    position: relative;
    top: 5rem;
    padding: 2rem 0;
  }

  h1 {
    font-size: 3.5rem;
    margin: 1rem 0;
  }

  .btn {
    margin: 0.5rem 0;
  }
}
</style>
