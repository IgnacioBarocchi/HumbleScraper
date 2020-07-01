import firebase from 'firebase';
import { firebaseConfig } from '../config/api/db.config';

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
export const push_Documents_To_DB = function (
  collection: string /*'testCollection'*/,
  documents: {}[] //any /*TODO: solve this */
) {
  documents.forEach((doc /*doc:anyTODO: solve this */) => {
    batch.set(etymondb.collection(collection).doc(), doc);
  });
  batch.commit();
};

/*snapshot.forEach((doc) => {console.log(doc.id, '=>', doc.data());});*/
