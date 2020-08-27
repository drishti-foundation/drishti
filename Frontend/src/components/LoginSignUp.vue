<template>
  <transition name="form-wrapper">
    <div v-if="show" class="form-wrapper" @click="$emit('close')">
      <form :about="`${pageName} Form`" @click.stop @submit.prevent="handleSubmit" class="form">
        <div class="tab-bar">
          <button @click.prevent="showLogin = true" :class="{ sel: showLogin }">
            Login
          </button>
          <button @click.prevent="showLogin = false" :class="{ sel: !showLogin }">
            Sign Up
          </button>
          <button @click.prevent="$emit('close')" class="close">
            ×
          </button>
          <span
            class="highlight"
            :style="{
              width: showLogin ? '4ch' : '6ch',
              transform: `translateX(${showLogin ? '0' : '7'}ch)`,
            }"
          ></span>
        </div>
        <h3>{{ pageName }}</h3>
        <label for="username" placeholder="Username">
          Username
        </label>
        <input
          title="Username"
          name="username"
          id="username"
          placeholder="Username"
          type="text"
          v-model="username"
          required
        />
        <div class="password">
          <label for="password">Password</label>
          <button @click.prevent="showPassword = !showPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <input
          title="Password"
          name="password"
          placeholder="Password"
          id="password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          autoCapitalize="false"
          autoComplete="false"
          autoCorrect="false"
          autoSave="false"
          required
        />
        <transition name="otp">
          <div v-if="!showLogin" class="otp">
            <label for="otp" placeholder="OTP">
              OTP
              <span :title="otpTitle" class="question">
                ?
              </span>
            </label>
            <input
              title="OTP"
              name="otp"
              id="otp"
              placeholder="OTP"
              type="text"
              v-model="otp"
              required
            />
          </div>
        </transition>
        <button class="btn" type="submit" :disabled="isDisabled">
          <loading-spinner v-if="isLoading" />
          <template v-else>
            {{ pageName }}
          </template>
        </button>
      </form>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

import LoadingSpinner from './LoadingSpinner.vue';

const otpTitle = `\
Due to limited translation capabilities, Hindi Braille has been limited to select NGOs.
English Braille is available for everyone regardless if you have an account or not.
If you want Hindi Braille, contact us at mail.drishtifoundation@gmail.com.`;

interface CData {
  showLogin: boolean;
  username: string;
  password: string;
  otp: string;
  showPassword: boolean;
  otpTitle: string;
}

interface CMethods {
  login: (credentials?: Credentials) => Promise<boolean>;
  signup: (payload: SignUpPayload) => Promise<boolean>;
  handleSubmit: () => void;
}

interface CComputed {
  pageName: string;
  isDisabled: boolean;
  isLoading: boolean;
}

interface CProps {
  show: boolean;
}

export default Vue.extend<CData, CMethods, CComputed, CProps>({
  name: 'login-signup',
  data: () => ({
    showLogin: true,
    username: '',
    password: '',
    otp: '',
    showPassword: false,
    otpTitle,
  }),
  methods: {
    ...mapActions(['login', 'signup']),
    async handleSubmit() {
      const credentials = { username: this.username.trim(), password: this.password.trim() };
      let success = false;
      if (this.showLogin) {
        success = await this.login(credentials);
      } else {
        success = await this.signup({ credentials, otp: this.otp.trim() });
      }
      if (success) {
        this.$emit('close');
      }
    },
  },
  computed: {
    ...mapState(['isLoading']),
    pageName() {
      return this.showLogin ? 'Login' : 'Sign Up';
    },
    isDisabled() {
      const userDataValid = (this.username.trim().length && this.password.trim().length) === 0;
      if (this.showLogin) {
        return userDataValid;
      }

      return userDataValid || this.otp.trim().length === 0;
    },
  },
  props: {
    show: Boolean,
  },
  watch: {
    show(show) {
      if (!show) {
        this.username = '';
        this.password = '';
        this.otp = '';
        this.showPassword = false;
      }
    },
  },
  components: {
    LoadingSpinner,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

$greyed: #444444;

.form-wrapper {
  @include flex-box;

  position: fixed;
  width: 100%;
  height: var(--vh);
  z-index: 100;
  background: #00000069;

  &-enter-active,
  &-leave-active {
    transition: 0.5s;
  }
  &-enter,
  &-leave-to {
    background: #00000000;

    .form {
      transform: translateY(calc(-55% - 50vh));
    }
  }
}

.form {
  padding: 2rem 3.5rem;
  background-color: $lbg;
  box-shadow: 0.4rem 0.6rem 0.8rem #0000001a;
  width: min-content;
  border-radius: 1rem;
  transform: translateY(0);
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

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

    &:focus {
      border: 2px solid black !important;
    }

    &::placeholder {
      font-size: 1rem;
    }
  }
}

.tab-bar {
  margin-bottom: 1rem;
  position: relative;

  button {
    color: $greyed;
    text-align: left;
    width: 8ch;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;

    &.sel,
    &:hover {
      color: black;
    }

    &:focus {
      border: none !important;
    }
  }

  .close {
    font-size: 1.1rem;
    margin-left: auto;
    display: inline-block;
    position: absolute;
    right: 0;
    width: min-content;
  }

  .highlight {
    transition: 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    width: 6ch;
    margin-top: 2px;
    height: 4px;
    background: $highlight;
    display: block;
  }
}

h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
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

.otp {
  overflow: hidden;
  transition: 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  transform: translateX(0);
  height: 6.2rem;

  &-enter,
  &-leave-to {
    transform: translateX(calc(100% + 7rem));
    height: 0;
  }
}

.question {
  font-size: 0.7rem;
  color: $greyed;
  border: 1px solid $greyed;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  text-align: center;
  margin-left: 0.5rem;
}

.btn {
  margin-top: 0.5rem;
  margin-bottom: 0.8rem;
  width: 11ch;
}

@keyframes from-right {
  from {
    transform: translateX(calc(100% + 7rem));
    height: 0;
  }
  to {
    transform: translateX(0);
    height: 6.2rem;
  }
}
</style>
