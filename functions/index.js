const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const Config = require('./config');
const Cypher = require('./encdec');

let serviceAccount = require("./serviceKey.json");
let defaultAppConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://watersupply-48c7d.firebaseio.com"
};
// Initialize the app with a service account, granting admin privileges
admin.initializeApp(defaultAppConfig);
const app = express();

exports.orderConfirm = functions.database.ref('/MyOrder/{uid}/{key}/status').onCreate((data, context) => {
  const uid = data.params.uid;
  const key = data.params.key;
  const getDeviceTokensPromise = admin.database()
    .ref(`RegisteredUsers/${uid}/token`).once('value');
  let tokensSnapshot;
  const countOrder = admin.database().ref('MyOrder/orderCount').once('value');
  // The array containing all the user's tokens.
  let tokens;
  let count = 0;
  const getProfile = admin.auth().getUser(uid);
  return Promise.all([getDeviceTokensPromise, getProfile, countOrder]).then(results => {
    tokens = results[0].val();
    count = results[2].val();
    // Notification details.
    const payload = {
      notification: {
        title: 'WaterApp',
        body: 'Your order is confirmed'
      }
    };
    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload);
  }).then((response) => {
    // For each message check if there was an error.
    if (count > 0)
      count--;
    const decreaseOrder = admin.database().ref('MyOrder/orderCount').set(count);
    const tokensToRemove = [decreaseOrder];

    response.results.forEach((result, index) => {
      const error = result.error;
      if (error) {
        console.error('Failure sending notification to', tokens[index], error);
        // Cleanup the tokens who are not registered anymore.
      }
    });
    return Promise.all(tokensToRemove);
  });
});

exports.newOrder = functions.database.ref('/MyOrder/{uid}/{key}').onCreate((change, context) => {
  const countOrder = admin.database().ref('MyOrder/orderCount').once('value');
  return Promise.all([countOrder]).then(result => {
    let count = result[0].val();
    if (count === null) count = 0;
    count++;
    const increaseOrder = admin.database().ref('MyOrder/orderCount').set(count);
    const promises = [increaseOrder];
    return Promise.all(promises);
  });
});

app.get('/pin/:pinCode', (req, res) => {
  const db = admin.firestore();
  const pin = req.params.pinCode;
  db.collection('locations').get().then((snapShot) => {
    snapShot.forEach((doc) => {
      const location = doc.data();
      if (location.pinCode === pin) {
        return res.status(200).json({result: true});
      }
    });
    return res.status(200).json({result: false});
  }).catch((error) => {
    return res.sendStatus(500);
  });
});

/**
 *
 */
app.post('/enc', (req, res) => {
  const encDec = new Cypher();
  const config = new Config();
  const paramsList = encDec.handleParams(req.body);
  encDec.getChecksumFromArray(paramsList,config.getMerchantKey()).then((checkSum) => {
    return res.status(200).json({checkSum:checkSum,orderId:paramsList['orderId'],payTmStatus:1,length:checkSum.length});
  }).catch((error) => {
    return res.status(200).json({error:error});
  });

});

exports.api = functions.https.onRequest(app);
