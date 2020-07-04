import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import readline from 'readline';

const URL_CONFIG_PATH = './config/url_components';
const PROCESSOR_PATH = './config/processors';
type ScraperMode = 'wikipedia' | 'minecraft' | 'etimologias';
const MODES: ReadonlyArray<ScraperMode> = [
  'wikipedia',
  'minecraft',
  'etimologias',
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
setMode();

async function getUrls(configFileName: string): Promise<string[]> {
  const urlConfig = await import(`${URL_CONFIG_PATH}/${configFileName}`);
  if (urlConfig.baseTemplate && urlConfig.components) {
    return multiUrlGenerator(urlConfig.baseTemplate, urlConfig.components);
  }
  console.error('Wrong url config format');
  process.exit(0);
}

async function getProcessor(
  processorFileName: string
): Promise<(arg0: Response) => void | Promise<any>> {
  const processor = await import(`${PROCESSOR_PATH}/${processorFileName}`);
  if (!processor.default) {
    console.warn('The imported module must have an export default statement');
    process.exit(1);
  }
  return processor.default;
}

async function main(mode: string) {
  const processor = await getProcessor(`${mode}.processor.ts`);
  const urls = await getUrls(`${mode}.urls.json`);
  for (const url of urls) {
    console.log(`Fetching: ${url} ...`);
    try {
      const response = await fetch(url);
      await processor(response);
    } catch (err) {
      console.warn(`>>> Error while trying to fetch ${url}`);
    }
  }

  process.exit(0);
}
