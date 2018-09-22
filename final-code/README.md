### Deployment Instructions

- Create a new project on Firebase.
- Enable sign in with Google under the `Authentication` tab.
- Enable Realtime Database under the Database tab and select the `test rules`.
- Open command prompt/terminal and install firebase-tools globall using the command

  `npm install -g firebase-tools`

- Login to firebase using `firebase login`
- Navigate to the final-code directory. 
- Execute `firebase use --add` and select the Firebase project id. Then enter an alias when prompted.
- Execute `firebase deploy --only hosting` to host the files on Firebase Hosting.
- Execute `firebase deploy --only functions` to deploy the Cloud Functions

- Visit the project link to use the project
