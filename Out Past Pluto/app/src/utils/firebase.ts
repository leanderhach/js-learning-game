// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: 'AIzaSyAC3xat6aKJym-frevLKczRM1qOfyXBSOs',
	authDomain: 'out-past-pluto.firebaseapp.com',
	projectId: 'out-past-pluto',
	storageBucket: 'out-past-pluto.appspot.com',
	messagingSenderId: '1029093023967',
	appId: '1:1029093023967:web:5db11b768cb5044206096a',
	measurementId: 'G-B7TK25577S'
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
