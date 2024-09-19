import { createStore } from 'vuex';

export default createStore({
    state: {
      token: localStorage.getItem('token') || '',
      user: {},
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
      },
      setUser(state, user) {
        state.user = user;
      },
      logout(state) {
        state.token = '';
        state.user = {};
      },
    },
    actions: {
      login({ commit }, { token, user }) {
        commit('setToken', token);
        commit('setUser', user);
        localStorage.setItem('token', token);
      },
      logout({ commit }) {
        commit('logout');
        localStorage.removeItem('token');
      },
    },
    getters: {
      isLoggedIn: (state) => !!state.token,
      getUser: (state) => state.user,
    },
  });
