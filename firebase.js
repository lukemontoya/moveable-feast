import firebase from 'firebase';

export const config = {
  apiKey: "ADD FIREBASE API",
  databaseURL: 'https://moveablefeast-a4fdc.firebaseio.com/'
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
