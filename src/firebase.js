import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDkeYTvzGiYiPDRZBEwBBIuLF4VCfyJ3UY',
  authDomain: 'blog-537a5.firebaseapp.com',
  projectId: 'blog-537a5',
  storageBucket: 'blog-537a5.appspot.com',
  messagingSenderId: '94007594980',
  appId: '1:94007594980:web:1ce2e6f91c7db417c0c1f1',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
