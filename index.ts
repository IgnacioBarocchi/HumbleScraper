import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import firebase from 'firebase';
export const firebaseConfig = {
  apiKey: 'AIzaSyC3F48JASbrGz0Rkp-1u3dBuUhHgtpbFfI',
  authDomain: 'etymon-ecd27.firebaseapp.com',
  databaseURL: 'https://etymon-ecd27.firebaseio.com',
  projectId: 'etymon-ecd27',
  storageBucket: 'etymon-ecd27.appspot.com',
  messagingSenderId: '463531942651',
  appId: '1:463531942651:web:bc6c120b6122c957e4c65e',
  measurementId: 'G-JC4Z11489D',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// firebase.initializeApp({
//   apiKey: '### FIREBASE API KEY ###',
//   authDomain: '### FIREBASE AUTH DOMAIN ###',
//   projectId: '### CLOUD FIRESTORE PROJECT ID ###',
// });

const db = firebase.firestore();

// Add a second document with a generated ID.

import readline from 'readline';
const URL_CONFIG_PATH = './config/url_components';
const PARSER_PATH = './config/parsers';
type ScraperMode = 'wikipedia' | 'minecraft';
const MODES: ReadonlyArray<ScraperMode> = ['wikipedia', 'minecraft'];

const client = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.question(
  `What mode should I use? (available modes: ${MODES.join(', ')}) `,
  (MODE) => {
    if (!MODES.includes(MODE as ScraperMode)) {
      console.error(
        `Specified scraper mode "${MODE}" not found in config files.`
      );
      process.exit(0);
    }
    main(MODE);
    client.close();
  }
);

async function getUrls(configFileName: string): Promise<string[]> {
  const urlConfig = await import(`${URL_CONFIG_PATH}/${configFileName}`);
  if (urlConfig.baseTemplate && urlConfig.components) {
    return multiUrlGenerator(urlConfig.baseTemplate, urlConfig.components);
  }
  console.error('Wrong url config format');
  process.exit(0);
}

async function getParser(
  parserFileName: string
): Promise<(arg0: Response) => void> {
  const parser = await import(`${PARSER_PATH}/${parserFileName}`);
  if (!parser.default) {
    console.warn('The imported module must have an export default statement');
    process.exit(1);
  }
  return parser.default;
}

async function main(mode: string) {
  const parser = await getParser(`${mode}.parser.ts`);
  const urls = await getUrls(`${mode}.urls.json`);
  for (const url of urls) {
    try {
      const response = await fetch(url);
      parser(response);
    } catch (err) {
      console.warn(err);
    }
  }
  db.collection('testCollection')
    .add({
      first: 'Alan',
      middle: 'Mathison',
      last: 'Turing',
      born: 1912,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });

  db.collection('testCollection')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  process.exit(0);
}
//
