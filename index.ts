import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import firebase from 'firebase';
import { firebaseConfig } from './environment/db.config';
import readline from 'readline';
const URL_CONFIG_PATH = './config/url_components';
const PARSER_PATH = './config/parsers';
type ScraperMode = 'wikipedia' | 'minecraft';
const MODES: ReadonlyArray<ScraperMode> = ['wikipedia', 'minecraft'];
const client = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

firebase.initializeApp(firebaseConfig);
const etymon = firebase.firestore();
// const citiesRef = etymon.collection('cities');
const turingRef = etymon.collection('testCollection');
const batch = etymon.batch();
const testArr = [
  {
    first: 'Alan',
    middle: 'Mathison',
    last: 'Turing',
    born: 1912,
  },
  {
    first: 'Ignacio',
    middle: 'de la cruz',
    last: 'barocchi',
    born: 1996,
  },
];

function setMode() {
  client.question(
    `What mode should I use? (available modes: ${MODES.join(', ')}) `,
    (MODE) => {
      if (!MODES.includes(MODE as ScraperMode)) {
        console.error(
          `Specified scraper mode "${MODE}" not found in config files.`
        );
        return setMode();
      }
      main(MODE);
      client.close();
    }
  );
}
setMode();

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
  // testArr.forEach((doc) => {
  //   batch.set(etymon.collection('testCollection').doc(), doc);
  // });
  // batch.commit();

  const userQuery = 'Alan';
  const snapshot = await turingRef.where('first', '==', `${userQuery}`).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });

  // etymon
  //   .collection('testCollection')
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data().first}`);
  //     });
  //   });

  // process.exit(0);
}

// Create a query against the collection
