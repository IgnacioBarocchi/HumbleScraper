import { multiUrlGenerator } from './lib/multiUrlGenerator';
import fetch, { Response } from 'node-fetch';
import readline from 'readline';

const URL_CONFIG_PATH = './config/url_components';
const PROCESSOR_PATH = './config/processors';
type ScraperMode =
  | 'etimologias'
  | 'diccionario'
  | 'sinonimos'
  | 'verbos'
  | 'rimas';
const MODES: ReadonlyArray<ScraperMode> = [
  'etimologias',
  'diccionario',
  'sinonimos',
  'verbos',
  'rimas',
];
const client = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

init();

function init() {
  client.question(
    `What mode should I use? (available modes: ${MODES.join(', ')}) `,
    (MODE) => {
      if (!MODES.includes(MODE as ScraperMode)) {
        console.error(
          `Specified scraper mode "${MODE}" not found in config files.`
        );
        process.exit(1);
      }

      client.question(
        'What should be the max numer of requests?',
        (MAX_REQUESTS) => {
          if (isNaN(Number(MAX_REQUESTS))) {
            console.error('Wrong max requests number');
            process.exit(1);
          }

          main(MODE, Number(MAX_REQUESTS));
        }
      );
    }
  );
}

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
): Promise<(arg0: Response) => void | Promise<void>> {
  const processor = await import(`${PROCESSOR_PATH}/${processorFileName}`);
  if (!processor.default) {
    console.warn('The imported module must have an export default statement');
    process.exit(1);
  }
  return processor.default;
}

async function main(mode: string, maxRequests: number) {
  const processor = await getProcessor(`${mode}.processor.ts`);
  const urls = await getUrls(`${mode}.urls.json`);
  let count = 0;

  for (const url of urls) {
    if (count >= maxRequests) {
      console.log('Reached maximum number of requests');
      console.log('Last url (not processed):', url);
      process.exit();
    }
    console.log(`Fetching: ${url} ...`);
    try {
      const response = await fetch(url);
      await processor(response);

      console.log(`✅ Saved #${count++}.`);
    } catch (err) {
      console.log(`❌ERROR`, err.message);
    }
  }

  process.exit(0);
}
