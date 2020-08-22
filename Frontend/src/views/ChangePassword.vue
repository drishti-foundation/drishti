<template>
  <div class="page">
    <nav class="nav-bar">
      <router-link class="logo" to="/">
        <svg viewBox="0 0 50 100" class="back">
          <path d="M50 0 L0 50 L50 100" fill="transparent" stroke="white" stroke-width="10" />
        </svg>
        <img src="@/assets/drishti.png" alt="drishti logo" />
      </router-link>
    </nav>
    <form class="form" @submit.prevent="changePassword()">
      <h3>Change Password</h3>
      <div class="password">
        <label for="new-password">New Password</label>
        <button @click.prevent="showNewPassword = !showNewPassword">
          {{ showNewPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <input
        title="New Password"
        name="new-password"
        placeholder="New Password"
        id="new-password"
        :type="showNewPassword ? 'text' : 'password'"
        v-model="newPassword"
        autoCapitalize="false"
        autoComplete="false"
        autoCorrect="false"
        autoSave="false"
        required
      />
      <div class="password">
        <label for="confirm-password">Confirm Password</label>
        <button @click.prevent="showConfirmPassword = !showConfirmPassword">
          {{ showConfirmPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <input
        title="Confirm Password"
        name="confirm-password"
        placeholder="Confirm Password"
        id="confirm-password"
        :type="showConfirmPassword ? 'text' : 'password'"
        v-model="confirmPassword"
        autoCapitalize="false"
        autoComplete="false"
        autoCorrect="false"
        autoSave="false"
        required
      />
      <button :disabled="!isValid" type="submit" class="btn">
        Change
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface CData {
  newPassword: string;
  confirmPassword: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
}

interface CMethods {
  changePassword: () => void;
}

interface CComputed {
  isValid: boolean;
}

export default Vue.extend<CData, CMethods, CComputed>({
  name: 'change-password',
  data: () => ({
    newPassword: '',
    confirmPassword: '',
    showNewPassword: false,
    showConfirmPassword: false,
  }),
  methods: {
    async changePassword() {
      if (await this.$store.dispatch('changePassword', this.newPassword)) {
        this.$router.back();
      }
    },
  },
  computed: {
    isValid() {
      return this.newPassword.trim().length !== 0 && this.newPassword === this.confirmPassword;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

$greyed: #444444;

.page {
  @include flex-box;

  height: var(--vh);
  width: 100vw;
}

.nav-bar {
  top: 0;
}

.form {
  padding: 2rem 3.5rem;
  background-color: $lbg;
  box-shadow: 0.4rem 0.6rem 0.8rem #0000001a;
  width: min-content;
  border-radius: 1rem;

  label {
    font-weight: 600;
    color: currentColor;
    font-size: 1.3rem;
    color: $greyed;
  }

  input {
    display: block;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    background-color: white;
    border-radius: 0.3rem;
    padding: 1ch;
    font-size: 1.1rem;
    border: 2px solid rgb(221, 221, 221);
    width: 100%;

    &:focus {
      border: 2px solid black !important;
    }

    &::placeholder {
      font-size: 1rem;
    }
  }
}

h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  width: max-content;
}

.password {
  @include flex-box(space-between);
  color: $greyed;

  button {
    color: currentColor;
    font-weight: 600;
    cursor: pointer;

    &:focus {
      border: none !important;
    }
  }
}
</style>
