import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDqCnMH3ENwG6Vktv8KGW9OyInS_7f1n74",
    authDomain: "crownwear-db.firebaseapp.com",
    databaseURL: "https://crownwear-db.firebaseio.com",
    projectId: "crownwear-db",
    storageBucket: "crownwear-db.appspot.com",
    messagingSenderId: "1030834131570",
    appId: "1:1030834131570:web:3133ea3890e6f80f3328eb",
    measurementId: "G-FPXM5K2SFQ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      console.log(snapShot);

      if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          })
        }catch(error){
          console.log('error creating user', error.message);
        }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;



