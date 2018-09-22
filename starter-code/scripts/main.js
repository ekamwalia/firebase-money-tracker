/*
 *  Authentication Functions
 *  All the functions in this section help the user
 *  with different authentication requirements like
 *  SignIn
 *  SignOut
 *  GetUserNam
 *  GetUserUID
 *  
 */
function signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function signOut() {
    firebase.auth().signOut();
}

function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function getUserUID() {
    return firebase.auth().currentUser.uid;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}

/* Realtime Database Management
 * The following functions modify and create entries 
 * in the Firebase DB.
 * Load Transactions
 * RecordNewTransaction
 * Udpate Wallet Balance
 */

// Loads and updates the Balace and Transactions 
function loadTransactions() {
    
    // Call the Display Message utility function
    var dislayTransactionCallback = function(snap) {
         var data = snap.val();
        displayTransaction(data.type, data.amount);
    };

    // Call the Display Balance utility function
    var displayBalanceCallback = function(snap) {
        var data = snap.val();
        displayBalance(data);
    };

    // Watch the Transactions root for changes 
    var transactionsRef = firebase.database().ref("/transactions/").orderByChild("user").equalTo(getUserUID()).limitToLast(10);
    transactionsRef.on('child_added', dislayTransactionCallback);
    transactionsRef.on('child_changed', dislayTransactionCallback);

    // Watch the Walet root for changes
    var walletRef = firebase.database().ref("/wallet/" + getUserUID());
    walletRef.on('child_added', displayBalanceCallback);
    walletRef.on('child_changed', displayBalanceCallback);

}

// Inserts a new Transaction in Firebase DB
function recordNewTransaction(amount, type) {
    return firebase.database().ref('/transactions/').push({
      user: getUserUID(),
      amount: parseInt(amount),
      type: type,
    }).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
}

// Updates the users 
function updateWalletbalance(amount, type) {
    // get the current balance and parse it into an Integer
    var newBalance = parseInt(balanceDisplayElement.textContent);

    // Add or Subtract the amount from current balance 
    // depending on transaction type
    if (type == "credit") {
        newBalance = newBalance + parseInt(amount);
    } else {
        newBalance = newBalance - parseInt(amount);
    }
    
    // Update the value in Firebase DB
    return firebase.database().ref('/wallet/' + getUserUID()).set({
        balance : newBalance
    });
}

/* Utility Functions
 * All the functions below are utiliy functions 
 * which manipulate UI changes. Need not be modified
 */

function authStateObserver(user) {
    if (user) { // User is signed in!
      // Get the signed-in user's name.
      var userName = getUserName();
  
      // Set name.
      displayNameDivElement.textContent = userName;
  
      // Show user's profile and sign-out button.
      displayNameDivElement.removeAttribute('hidden');
      signOutButtonElement.removeAttribute('hidden');
  
      // Hide sign-in button.
      signInButtonElement.setAttribute('hidden', 'true');
      loadTransactions();

    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      displayNameDivElement.setAttribute('hidden', 'true');
      signOutButtonElement.setAttribute('hidden', 'true');
  
      // Show sign-in button.
      signInButtonElement.removeAttribute('hidden');
    }
}

// Displays a Message in the UI.
function displayTransaction(type, amount) {

    var container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    div = container.firstChild;
    messageListElement.appendChild(div);

    div.querySelector('.type').textContent = type;
    div.querySelector('.amount').textContent = amount;    
}

function displayBalance(amount) {
    balanceDisplayElement.textContent = amount;
}

// Triggered when the send new message form is submitted.
function onFormSubmit(e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (isUserSignedIn) {
        recordNewTransaction(recordAmountElement.value, recordTypeElement.value).then(function() {
            updateWalletbalance(recordAmountElement.value, recordTypeElement.value).then(function(){
                alert("New transaction recorded")
            })
      });
    }
}

// Template for messages.
var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="amount"></div>' +
      '<div class="type"></div>' +
    '</div>';

var messageListElement = document.getElementById('records');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var displayNameDivElement = document.getElementById('user-name');
var recordAmountElement = document.getElementById('amount');
var recordTypeElement = document.getElementById("type");
var addRecordFormElement = document.getElementById("add-record-form");
var balanceDisplayElement = document.getElementById('wallet-balance');

signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);
addRecordFormElement.addEventListener('submit', onFormSubmit);

// initialize Firebase
initFirebaseAuth();
