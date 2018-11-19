import { initializeApp } from 'firebase';

const app = initializeApp({
	apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
});

export const db = app.database();
export const nameRef = db.ref('name');