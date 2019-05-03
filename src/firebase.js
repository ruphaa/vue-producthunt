import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: XXXXXX,
    authDomain: XXXXXX,
    databaseURL: XXXXXX,
    projectId: XXXXXX,
    storageBucket: XXXXXX,
    messagingSenderId: XXXXXX
});


export const db = app.firestore();
export const bookmarksCollection = db.collection('product-bookmarks');

