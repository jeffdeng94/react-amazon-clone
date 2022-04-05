import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyDtkNV_2muOtcK7TClLVxrDRdPHI7qycKA',
  authDomain: 'clone-591e6.firebaseapp.com',
  projectId: 'clone-591e6',
  storageBucket: 'clone-591e6.appspot.com',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  messagingSenderId: '488021095805',
  appId: '1:488021095805:web:244e1daef080962373c814',
  measurementId: 'G-HMKX6WTFHN',
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth()

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export { auth, db, createUser, signInUser }
