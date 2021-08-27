import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJBkegoOO41oEqHszRTVxe46-elCSJ2hc",
  authDomain: "clone-94271.firebaseapp.com",
  projectId: "clone-94271",
  storageBucket: "clone-94271.appspot.com",
  messagingSenderId: "510373183369",
  appId: "1:510373183369:web:ee8835f64cd152f4d9eb58",
  measurementId: "G-3TW092REXT",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
