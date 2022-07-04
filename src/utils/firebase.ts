import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app'

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDzF3T8evUhiLy6awDBHoJVgyTtBuvfdZo',
  authDomain: 'gymlabo.firebaseapp.com',
  databaseURL: 'https://gymlabo-default-rtdb.firebaseio.com',
  projectId: 'gymlabo',
  storageBucket: 'gymlabo.appspot.com',
  messagingSenderId: '770214888689',
  appId: '1:770214888689:web:5041d3abcf0d97ed5c9550',
  measurementId: 'G-TCX7RJ86ML'
}

export const app: FirebaseApp = initializeApp(firebaseConfig)