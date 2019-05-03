import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: null,
        authenticated: false
    },
    actions: {
        login({commit}, {email, password}) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user)
                    commit('setUser', user);
                    commit('setAuthentication', true)
                })
                .catch(err => {
                    commit('setUser', null);
                    commit('setAuthentication', false)
                })
        },
        signout({commit}) {
            firebase.auth().signOut()
                .then(function() {
                    commit('setUser', null);
                    commit('setAuthentication', false);
                })
                .catch(function(error) {
                    console.log(error)
                    commit('setAuthentication', true);
                })
        },
        signup({commit}, {email, password}) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    commit('setUser', user);
                    commit('setAuthentication', true);
                })
                .catch(function(error) {
                    commit('setUser', null);
                    commit('setAuthentication', false)
                    alert(error.message)
                })
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuthentication(state, isAuthenticated) {
            state.authenticated = isAuthenticated;
        }
    },
    getters: {
        user: (state) => state.user,
        authenticated: (state) => state.authenticated
    }
});