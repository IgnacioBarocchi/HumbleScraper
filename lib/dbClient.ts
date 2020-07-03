import firebase from 'firebase';
import { firebaseConfig } from '../config/api/db.config';
firebase.initializeApp(firebaseConfig);
const Db = firebase.firestore();

export const consoleLogMyDocumentsFrom = function (collectionName: string) {
  Db.collection(collectionName)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
      });
    });
};

export const postDocumentToDb = function (
  collectionName: string,
  document: {},
  documentName: string
) {
  const docRef = Db.collection(collectionName).doc(documentName);
  return docRef.set(document);
};
