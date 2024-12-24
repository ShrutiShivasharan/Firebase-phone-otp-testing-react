import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const FirebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket:"",
    messagingSenderId: "",
    appId: "",
    measurementId: "" 
}

if(!firebase.apps.length){
    firebase.initializeApp(FirebaseConfig);
}

export default firebase;