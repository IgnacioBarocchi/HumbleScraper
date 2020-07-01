import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import readline from 'readline';
// import {
//   push_Documents_To_DB,
//   consoleog_My_Documents_From,
// } from './lib/dbClient';
/**/
const URL_CONFIG_PATH = './config/url_components';
const PARSER_PATH = './config/parsers';
type ScraperMode = 'wikipedia' | 'minecraft' | 'etymologies';
const MODES: ReadonlyArray<ScraperMode> = [
  'wikipedia',
  'minecraft',
  'etymologies',
];
const client = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
// setMode();
main('etymologies');

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
): Promise<(arg0: Response) => void | Promise<any>> {
  const parser = await import(`${PARSER_PATH}/${parserFileName}`);
  if (!parser.default) {
    console.warn('The imported module must have an export default statement');
    process.exit(1);
  }
  return parser.default;
}

async function main(mode: string) {
  // let doc: [] = [];
  const parser = await getParser(`${mode}.parser.ts`);
  const urls = await getUrls(`${mode}.urls.json`);
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const obj = await parser(response);
      console.log(obj); // here you can replace this with array.push(obj).
      /*^^^^^^^^^^^^^^
       *  I'd like to save the result of the 'promise object' from the parser function
       *  to handle the batch.commit() method that only can be called once. Here we are inside a for loop and the data can't be
       *  pushed into an array because of its type and also I already know that I couldn't use .then().
       *  -- batch.commit() --
       *  You mentioned to take it as a singleton (fn)(), right? We need to execute it only when we are sure that
       *  all the data is ready to be committed. Did I get the idea?
       *  I guess the commit method can be called whenever and any place I need it as long as I have an instance of batch. Perhaps the async flow
       *  can be stoped and use my methods that relate to the DB synchronously.
       */
    } catch (err) {
      console.warn(err);
    }
  }
  // push_Documents_To_DB('testCollection', doc);
  // consoleog_My_Documents_From('testCollection');
  process.exit(0);
}
