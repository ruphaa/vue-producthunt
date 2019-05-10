import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { bookmarksCollection } from './firebase.js';

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        user: null,
        authenticated: false,
        postsCollection: []
    },
    actions: {
        login({commit}, {email, password}) {
            return new Promise((resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    bookmarksCollection.get().then((querySnapshot) => {
                        let posts = [];
                        querySnapshot.forEach((doc) => {
                            let data = doc.data();
                            data["doc_id"] = doc.id;
                            if(data.user_id == user.user.uid) {
                                posts.push(data)
                            }
                        });
                        commit('setUser', user);
                        commit('setAuthentication', true)
                        commit('setPostsCollection', posts)
                        resolve(true)
                    })
                    .catch(err => {
                        console.log("Error getting document", err)
                    });
                })
                .catch(err => {
                    commit('setUser', null);
                    commit('setAuthentication', false)
                })
            })
        },
        fetchUserCollection({commit}, {user}) {
            return new Promise((resolve, reject) => {
                bookmarksCollection.get().then((querySnapshot) => {
                    let posts = [];
                    querySnapshot.forEach((doc) => {
                        let data = doc.data();
                        data["doc_id"] = doc.id;
                        if(data.user_id == user.user.uid) {
                            posts.push(data)
                        }
                    });
                    commit('setPostsCollection', posts)
                    resolve(true)
                })
                .catch(err => {
                    console.log("Error getting document", err)
                });
            });
                
        },
        signout({commit}) {
            firebase.auth().signOut()
                .then(function() {
                    commit('setUser', null);
                    commit('setAuthentication', false);
                    commit('setPostsCollection', [])
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
                    bookmarksCollection.get().then((querySnapshot) => {
                        let posts = [];
                        querySnapshot.forEach((doc) => {
                            let data = doc.data();
                            data["doc_id"] = doc.id;
                            if(data.user_id == user.user.uid) {
                                posts.push(data)
                            }
                        });
                        commit('setPostsCollection', posts)
                    })
                    .catch(err => {
                        console.log("Error getting document", err)
                    });
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
        },
        setPostsCollection(state, postsCollection) {
            state.postsCollection = postsCollection;
        }
    },
    getters: {
        user: (state) => state.user,
        authenticated: (state) => state.authenticated,
        postsCollection: (state) => state.postsCollection
    }
});