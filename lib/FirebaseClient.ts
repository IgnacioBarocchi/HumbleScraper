import firebase from 'firebase';
import { firebaseConfig } from '../config/api/firebase.config';

class FirebaseClient {
  private static _instance: FirebaseClient;
  public db: firebase.firestore.Firestore;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
  }

  public static get Instance(): FirebaseClient {
    return this._instance || (this._instance = new this());
  }

  public saveDocument(
    collectionName: string,
    document: firebase.firestore.DocumentData,
    documentName: string
  ) {
    if (documentName) {
      const docRef = this.db.collection(collectionName).doc(documentName);
      return docRef.set(document);
    }
  }
}

export default FirebaseClient.Instance;
