import firebase from 'firebase';
import { firebaseConfig } from '../config/api/db.config';
import type { entry } from '../config/processors/etymologies.processor';
firebase.initializeApp(firebaseConfig);
const etymondb = firebase.firestore();
const turingRef = etymondb.collection('testCollection');
const batch = etymondb.batch();

export const find_Etymology_By_Word = async function (userQuery: string) {
  const snapshot = await turingRef.where('first', '==', `${userQuery}`).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }
};

export const consoleog_My_Documents_From = function (
  collection: string /*'testCollection'*/
) {
  etymondb
    .collection(collection)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
      });
    });
};

export const post_Document_To_DB = function (
  collection: string,
  document: entry
) {
  const docRef = etymondb.collection(collection).doc(document.word);
  return docRef.set(document);
};

export const post_Array_Of_Documents_To_DB = function (
  collection: string /*'testCollection'*/,
  documents: entry[]
) {
  documents.forEach((doc: entry /*doc:anyTODO: solve this */) => {
    batch.set(etymondb.collection(collection).doc(), doc);
  });
  batch.commit();
};
/*snapshot.forEach((doc) => {console.log(doc.id, '=>', doc.data());});*/
