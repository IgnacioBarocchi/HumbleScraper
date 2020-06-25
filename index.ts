import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import console from 'console';
import readline from 'readline';
const URL_CONFIG_PATH = './config/url_components';
const PARSER_PATH = './config/parsers/';
type ScraperMode = 'wikipedia' | 'mojang';
const MODES: ReadonlyArray<ScraperMode> = ['wikipedia', 'mojang'];

const client = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.question('Choose the mode you want to run the program ', (MODE) => {
  //TODO: change the question method to setPrompt()/popPromt() or reformulate the question() string to ask an actual question.
  if (!MODES.includes(MODE as ScraperMode)) {
    console.error(
      `Specified scraper mode "${MODE}" not found in config files.`
    );
    process.exit(0);
  }
  main(MODE);
  client.close();
});

async function getUrls(configFileName: string): Promise<string[]> {
  const urlConfig = await import(`${URL_CONFIG_PATH}/${configFileName}`);
  return multiUrlGenerator(urlConfig.baseTemplate, urlConfig.components);
}

async function getParser(
  parserFileName: string
): Promise<(arg0: Response) => void> {
  const parser = await import(`${PARSER_PATH}/${parserFileName}`);
  return parser.default;
}

async function main(mode: string) {
  const parser = await getParser(`${mode}.parser.ts`);
  const urls = await getUrls(`${mode}.urls.json`); //wikipedia.urls.json
  for (const url of urls) {
    try {
      const response = await fetch(url);
      parser(response);
    } catch (err) {
      console.warn(err);
    }
  }
  process.exit(0);
}
