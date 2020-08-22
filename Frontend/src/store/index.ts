import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import client from './client';

Vue.use(Vuex);

const NOTIFICATION_DUR = 5000;

interface User {
  _id: string;
  username: string;
}

interface AuthState {
  id: string | null;
  username: string | null;
  isLoading: boolean;
  client: typeof client;
}

export default new Store<AuthState>({
  state: {
    id: null,
    isLoading: true,
    username: null,
    client
  },
  mutations: {
    setLoading(state, isLoading = true) {
      state.isLoading = isLoading;
    },
    setUser(state, user: User | null) {
      state.isLoading = false;
      state.username = user?.username ?? null;
      state.id = user?._id ?? null;
    }
  },
  getters: {
    isLoggedin(state) {
      return state.username !== null;
    }
  },
  actions: {
    // Log in either using the given email/password or the token from storage
    async login({ commit }, credentials?: Credentials) {
      try {
        if (!credentials) {
          // Try to authenticate using an existing token
          const { user } = await client.reAuthenticate();
          commit('setUser', user);
        } else {
          commit('setLoading');
          // Otherwise log in with the `local` strategy using the credentials we got
          const { user } = await client.authenticate({
            strategy: 'local',
            ...credentials
          });
          // Make sure auth popup is dismissed before switching to logged in state
          setTimeout(() => commit('setUser', user), 100);
        }
        return true;
      } catch (error) {
        if (credentials) {
          commit('setUser', null);
          Vue.notify({
            title: 'Failed to login',
            text: error.message,
            type: 'error',
            duration: NOTIFICATION_DUR
          });
        } else {
          commit('setLoading', false);
        }
        return false;
      }
    },

    // create account with otp
    async signup({ commit }, { credentials, otp }: SignUpPayload) {
      commit('setLoading');
      try {
        const user = await client.service('users').create(credentials, {
          query: { otp }
        });
        // Make sure auth popup is dismissed before switching to logged in state
        setTimeout(() => commit('setUser', user), 100);
        return true;
      } catch (error) {
        console.error(error);
        commit('setUser', null);
        Vue.notify({
          title: 'Failed to sign up',
          text: error.message,
          type: 'error',
          duration: NOTIFICATION_DUR
        });
        return false;
      }
    },

    async logout({ commit }) {
      try {
        await client.logout();
        // Make sure auth popup is dismissed before switching to logged out state
        setTimeout(() => commit('setUser', null), 100);
        return true;
      } catch (error) {
        console.error(error);
        Vue.notify({
          title: 'Failed to logout',
          text: error.message,
          type: 'error',
          duration: NOTIFICATION_DUR
        });
        return false;
      }
    },

    async changePassword({ state, dispatch }, password: string) {
      try {
        const username = state.username ?? '';
        await client.service('users').update(state.id, { username, password });
        await dispatch('login', { username, password });
        Vue.notify('Sucesfully changed password');
        return true;
      } catch (e) {
        console.error(e);
        Vue.notify({
          title: 'Failed to change password',
          text: e.message,
          type: 'error',
          duration: NOTIFICATION_DUR
        });
        return false;
      }
    }
  }
});
