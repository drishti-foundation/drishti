<template>
  <transition name="account-wrapper">
    <div v-if="show" class="account-wrapper" @click="$emit('close')">
      <div class="account-details" @click.stop>
        <p class="name">{{ username }}</p>
        <hr />
        <router-link v-if="isAdmin" to="/admin">
          Admin Console
        </router-link>
        <router-link to="/change-password" class="change-password">
          Change Password
        </router-link>
        <button class="logout" @click="logoutAndClose()">
          Logout
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

interface CMethods {
  logoutAndClose: () => void;
  logout: () => Promise<boolean>;
}

interface CComputed {
  username: string;
  isAdmin: boolean;
}

interface CProps {
  show: boolean;
}

export default Vue.extend<{}, CMethods, CComputed, CProps>({
  name: 'account-details',
  methods: {
    ...mapActions(['logout']),
    async logoutAndClose() {
      if (await this.logout()) {
        this.$emit('close');
      }
    },
  },
  computed: {
    ...mapState(['username']),
    isAdmin() {
      return this.username === 'admin';
    },
  },
  props: {
    show: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/vars.scss';

.account-wrapper {
  position: fixed;
  height: var(--vh);
  z-index: 100;
  width: 100%;

  &-enter-active,
  &-leave-active {
    transition: 0.3s;
  }

  &-enter,
  &-leave-to {
    .account-details {
      transform: translateX(calc(100% + 0.5rem));
    }
  }

  hr {
    background-color: #333333;
  }

  button {
    cursor: pointer;
  }

  * {
    display: block;
    margin: 0.5rem 0;
    font-size: 1rem;
  }
}

.account-details {
  position: absolute;
  top: 6rem;
  right: 0.3rem;
  padding: 0.8rem 1.5rem;
  background: $lbg;
  box-shadow: 0.4rem 0.6rem 0.8rem #0000001a, -0.4rem -0.6rem 0.8rem #0000001a;
  border-radius: 1rem;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: translateX(0);

  .name {
    font-size: 1.3rem;
    font-weight: 500;
  }
}

@media screen and (max-width: 750px) {
  .account-details {
    top: auto;
    bottom: 5rem;
  }
}
</style>
