import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/analytics"

import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const auth = firebase.auth()
export const database = firebase.firestore()
