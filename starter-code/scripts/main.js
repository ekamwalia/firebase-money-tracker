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
}

function signOut() {
}

function getUserName() {
}

function getUserUID() {
}

function isUserSignedIn() {
}

function initFirebaseAuth() {
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
}

// Inserts a new Transaction in Firebase DB
function recordNewTransaction(amount, type) {
}

// Updates the users
function updateWalletbalance(amount, type) {
}

/* Utility Functions
 * All the functions below are utiliy functions 
 * which manipulate UI changes. Need not be modified
 */

function authStateObserver(user) {
  if (user) {
    // User is signed in!
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
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    displayNameDivElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');
    messageListElement.innerHTML = '';
    balanceDisplayElement.innerHTML = '0.00';

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
    recordNewTransaction(
      recordAmountElement.value,
      recordTypeElement.value
    ).then(function() {
      updateWalletbalance(
        recordAmountElement.value,
        recordTypeElement.value
      ).then(function() {
        alert('New transaction recorded');
      });
    });
  }
}

// Template for messages.
var MESSAGE_TEMPLATE =
  '<div class="record-container">' +
  '<div>₹<span class="amount"></span></div>' +
  '<div class="type"></div>' +
  '</div>';

var messageListElement = document.getElementById('records');
var signInButtonElement = document.getElementById('sign-in');
var signOutButtonElement = document.getElementById('sign-out');
var displayNameDivElement = document.getElementById('user-name');
var recordAmountElement = document.getElementById('amount');
var recordTypeElement = document.getElementById('type');
var addRecordFormElement = document.getElementById('add-record-form');
var balanceDisplayElement = document.getElementById('wallet-balance');

signOutButtonElement.addEventListener('click', signOut);
signInButtonElement.addEventListener('click', signIn);
addRecordFormElement.addEventListener('submit', onFormSubmit);

// initialize Firebase
initFirebaseAuth();
