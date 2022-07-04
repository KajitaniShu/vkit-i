const admin = require('firebase-admin')
const { argv } = require('process')
const serviceAccount = require('../configs/account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gymlabo-default-rtdb.firebaseio.com'
})

const uid = argv[2] 

admin.auth().setCustomUserClaims(uid, { admin: true })