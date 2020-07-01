import firebase from 'firebase';
import { firebaseConfig } from '../config/api/db.config';
//To not hardcode the type this could be a dynamic import like.
import type { entry } from '../config/processors/etymologies.processor';
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const batch = db.batch();

export const consoleLogMyDocumentsFrom = function (collection: string) {
  db.collection(collection)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
      });
    });
};

export const postDocumentToDB = function (collection: string, document: entry) {
  const docRef = db.collection(collection).doc(document.word);
  return docRef.set(document);
};

export const postArrayOfDocumentsToDB = function (
  collection: string,
  documents: entry[]
) {
  documents.forEach((doc: entry) => {
    batch.set(db.collection(collection).doc(), doc);
  });
  batch.commit();
};
