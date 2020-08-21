/* eslint-disable no-alert */
import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import client from './client';

Vue.use(Vuex);

interface User {
  _id: string;
  username: string;
}

interface AuthState {
  id: string | null;
  username: string | null;
  error: any | null; // TODO proper error handling
  isLoading: boolean;
  client: typeof client;
}

export default new Store<AuthState>({
  state: {
    id: null,
    isLoading: true,
    username: null,
    error: null,
    client
  },
  mutations: {
    setLoading(state, isLoading = true) {
      state.isLoading = isLoading;
    },
    setError(state, error: any) {
      state.isLoading = false;
      state.username = null;
      state.id = null;
      state.error = error;
    },
    setUser(state, user: User | null) {
      state.isLoading = false;
      state.username = user?.username ?? null;
      state.id = user?._id ?? null;
      state.error = null;
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
          commit('setUser', user);
        }
      } catch (error) {
        if (credentials) {
          console.error(error);
          commit('setError', error);
          alert('Failed to login');
        } else {
          commit('setLoading', false);
        }
      }
    },

    // create account with otp
    async signup({ commit }, { credentials, otp }: SignUpPayload) {
      commit('setLoading');
      try {
        const user = await client.service('users').create(credentials, {
          query: { otp }
        });
        commit('setUser', user);
      } catch (error) {
        console.error(error);
        commit('setError', error);
        alert('Failed to Sign Up');
      }
    },

    async logout({ commit }) {
      try {
        await client.logout();
        commit('setUser', null);
      } catch (error) {
        console.error(error);
        commit('setEror', error);
        alert('Failed to Logout');
      }
    },

    async changePassword({ state, dispatch }, password: string) {
      try {
        const username = state.username ?? '';
        await client.service('users').update(state.id, { username, password });
        await dispatch('login', { username, password });
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
  }
});
