const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Adds a message that welcomes new users into the chat.
exports.addWalletRecord = functions.auth.user().onCreate(async user => {
  console.log('A new user signed in for the first time.');

  await admin
    .database()
    .ref('/wallet/' + user.uid)
    .set({
      balance: 0
    });
  console.log('Wallet record created');
});
