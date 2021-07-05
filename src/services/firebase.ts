import firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDpZvCSq_CbePLDiRRsDoXIT7arAd7a3Vo",
  authDomain: "mobile02-67933.firebaseapp.com",
  projectId: "mobile02-67933",
  storageBucket: "mobile02-67933.appspot.com",
  messagingSenderId: "765139076383",
  appId: "1:765139076383:web:d1093eab9d5061a1a05c2a"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const userDataBase = firebaseApp.database().ref().child("users") 
