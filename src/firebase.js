import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyDmDGt96uofdJzMacAFDC82ngYhGbsy0gI",
    authDomain: "vue-producthunt-clone.firebaseapp.com",
    databaseURL: "https://vue-producthunt-clone.firebaseio.com",
    projectId: "vue-producthunt-clone",
    storageBucket: "vue-producthunt-clone.appspot.com",
    messagingSenderId: "754246709494"
});


export const db = app.firestore();
export const bookmarksCollection = db.collection('product-bookmarks');

