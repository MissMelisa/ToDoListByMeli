import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBqjpS-dUjkpZmn-2ApbAHs7vQVSTiq7os",
  authDomain: "to-do-app-f7952.firebaseapp.com",
  databaseURL: "https://to-do-app-f7952-default-rtdb.firebaseio.com/",
  projectId: "to-do-app-f7952",
  storageBucket: "to-do-app-f7952.appspot.com",
  messagingSenderId: "718005485193",
  appId: "1:718005485193:web:e3bedf898ba55977235058",
  measurementId: "G-7QGNKQD3BM",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
